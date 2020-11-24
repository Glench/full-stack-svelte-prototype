const fs = require('fs')
const express = require('express')
var bodyParser = require('body-parser');
require('svelte/register');

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
const port = 3000

function create_route(Page) {
    return function(req, res, next) {
        var json = res.json;
        res.json = function(data) {
            res.json = json;
            // if (req.method === 'POST' || req.xhr) { 
            //     res.json(data); // TODO: front-end code to intercept form submissions
            // } else {
            res.send(Page.default.render(data).html) 
        }


        switch(req.method) {
            case 'GET':
                if (Page.get) {
                    Page.get(req, res)
                } else {
                    res.send(Page.default.render().html) 
                }
                break;
            case 'POST':
                if (Page.post) {
                    Page.post(req, res)
                } else {
                    res.status(404).end()
                }
                break;
        }
    }
}
let files = fs.readdirSync('./routes/');
files.forEach(file => {
    if (file === 'index.svelte') return;
    const route = '/'+file.split('.')[0]
    const Page = require('./routes/'+file)
    app.use(route, create_route(Page))
})
// save index for last so it doesn't overwrite other files
app.use('/', create_route(require('./routes/index.svelte')))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
