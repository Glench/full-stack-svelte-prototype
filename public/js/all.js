const page = new Page({
    target: document.querySelector('#full_stack_page'),
    props: server_data,
    hydrate: true,
});

const submit_handler = function(evt) {
    evt.preventDefault();
    const form = evt.target;
    if (form.waiting) return; // don't double-send data

    const form_url = (form.getAttribute('action') || window.location.pathname+window.location.search);
    var json_form_data = {}
    for (const [key, value] of (new FormData(form)).entries()) {
        json_form_data[key] = value;
    }
    form.waiting = true;
    Array.from(form.querySelectorAll('.server-error')).forEach(node => node.remove())
    fetch(form_url, {
        method: form.getAttribute('method') || 'GET',
        credentials: 'same-origin', // send cookies
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(json_form_data),
    }).then(resp => {
        form.dispatchEvent(new CustomEvent('serverresponse', {detail: resp}))
        if (resp.redirected) {
            window.location.href = resp.url;
            return
        }
        return resp.json()
    }).then(json => {
        if (json) {
            page.$set(json)
        }
    }).catch(err => {
        console.log(err)
        form.dispatchEvent(new CustomEvent('serverresponseerror', {detail: err}))
        var error_msg = document.createElement('div')
        error_msg.setAttribute('class', 'server-error')
        error_msg.style.color = 'red';
        error_msg.style.fontWeight = 'bold';
        error_msg.textContent = 'Server error. Please try again.'
        form.prepend(error_msg)
    }).finally(() => {
        form.waiting = false;
    })
}

Array.from(document.querySelectorAll('form')).forEach(form => {
    form.addEventListener('submit', submit_handler, true)
})


