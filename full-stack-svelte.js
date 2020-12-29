const rollup_svelte =  require('rollup-plugin-svelte');
const rollup_commonjs = require('@rollup/plugin-commonjs');
const rollup_resolve = require('@rollup/plugin-node-resolve').nodeResolve
const rollup_css = require('rollup-plugin-css-only')
const rollup_terser = require('rollup-plugin-terser').terser;

const fs = require('fs')
const svelte = require('svelte/compiler');
const rollup = require('rollup');
require('svelte/register');

class Abort {
    constructor(code, message) {
        this.code = code;
        this.message = message || `${code}`;
    }
}
class Redirect {
    constructor(url) {
        this.url = url;
    }
}

const cache_id = require('uuid').v4();
function create_route(app, Page, filePath) {
    return async function(req, res, next) {
        var data;
        function abort(code, message) {
            throw new Abort(code, message)
        }
        function redirect(url) {
            throw new Redirect(url);
        }
        if (req.method === 'GET') {
            if (Page.get) {
                try {
                    data = await Page.get(req, abort, redirect)
                } catch(e) {
                    if (e instanceof Abort) {
                        res.status(e.code).send(e.message)
                        return
                    } else if (e instanceof Redirect) {
                        res.redirect(e.url)
                        return
                    } else {
                        throw e;
                    }

                }
            } 
        }
        else if (req.method === 'POST') {
            if (Page.post) {
                try {
                    data = await Page.post(req, abort, redirect)
                } catch(e) {
                    if (e instanceof Abort) {
                        res.status(e.code).send(e.message)
                        return
                    } else if (e instanceof Redirect) {
                        res.redirect(e.url)
                        return
                    } else {
                        throw e;
                    }

                }
            }
        } else {
            throw 'Unhandled request method type:' + req.method
        }

        if (req.headers.accept == 'application/json') { 
            res.json(data)
        } else {
            const {head, css, html} = Page.default.render(data)
            js_path = filePath.replace('.svelte', '.js').replace('./', '/')
            res.send(`<html>
                <head>
                    <link rel="stylesheet" href="https://unpkg.com/mvp.css">
                    ${head}
                    <style>
                        ${css.code}
                    </style>
                    <script>
                        const server_data = ${JSON.stringify(data)}
                    </script>
                </head>
                <body>
                    <div id="full_stack_page">
                        ${html}
                    </div>
                    <script src="/static/js${js_path}?cache=${cache_id}"></script>
                    <script src="/static/js/all.js?cache=${cache_id}"></script>
                </body>
            </html>`)
        }
    }
}

var dev = eval(process.env.DEVELOPMENT)
async function write_svelte_to_js(file_path) {
    try {
        const output = 'public/js/'+file_path;
        const bundle = await rollup.rollup({
            input: file_path,
            plugins: [
                remove_server_code(),
                rollup_svelte({
                    compilerOptions: {
                        // enable run-time checks when not in production
                        dev: dev,
                        hydratable: true
                    }
                }),
                rollup_css({output: 'public/css/'+file_path.replace('.svelte', '.css')}),
                rollup_resolve({
                    browser: true,
                    dedupe: ['svelte']
                }),
                rollup_commonjs(),
                !dev && rollup_terser()
            ]
        })
        await bundle.write({
            file: 'public/js/'+file_path.replace('.svelte', '.js'),
            format: 'iife',
            name: 'Page',
            sourcemap: true
        })
    } catch(e) {
        console.log('COMPILE ERROR:', e)
    }
}

function remove_server_code() {
    return {
        name: 'remove-svelte-server-code',
        transform(code) {
            return {
                code: code.replace(/<script context="module">.*?<\/script>/sm, ''),
                map: null
            }
        }
    }
}

async function create_routes(app, filePath, routePath) {
    // filePath e.g. './routes/users/[id]/index.svelte
    // routePath e.g. '/users/:id/'
    let files = fs.readdirSync(filePath, {withFileTypes: true});
    files.forEach(async file_or_dir => {
        if (file_or_dir.name.startsWith('.')) return;
        if (file_or_dir.name === 'index.svelte') return;

        const route = file_or_dir.name.split('.')[0].replaceAll('[', ':').replaceAll(']','')
        if (file_or_dir.isDirectory()) {
            // fs.mkdirSync('public/js'+filePath.replace('.','')+'/'+file_or_dir.name)
            // fs.mkdirSync('public/css'+filePath.replace('.','')+'/'+file_or_dir.name)
            create_routes(app, filePath+'/'+file_or_dir.name, routePath+'/'+route)
        } else {
            const Page = require(filePath+'/'+file_or_dir.name)
            console.log('creating', routePath+'/'+route, 'from', filePath+'/'+file_or_dir.name)
            app.all(routePath+'/'+route, create_route(app, Page, filePath+'/'+file_or_dir.name))
            await write_svelte_to_js(filePath+'/'+file_or_dir.name)
        }
    })
    try {
        const Page = require(filePath+'/index.svelte');
        // save index for last so it doesn't overwrite other routes
        console.log('creating', routePath+'/', 'from', filePath+'/index.svelte')
        app.all(routePath+'/', create_route(app, Page, filePath+'/index.svelte'))
        await write_svelte_to_js(filePath+'/index.svelte')
    } catch(e) {
        // if can't find index file
        if (e.code && e.code === 'MODULE_NOT_FOUND') return
        console.log('error making', routePath+'/:', e)
        // moving on...
    }

}

module.exports = {create_routes}
