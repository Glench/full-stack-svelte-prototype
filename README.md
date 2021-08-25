# Full Stack Svelte Prototype

A prototype framework (?) for making full-stack Svelte apps that is improving my life a lot. Features: code-splitting per page, server-side rendering, automatic client-side component mounting, automatic AJAXy POST requests, primitive cache-busting. You just need one file to make a route, server-side-rendered page, client-side-rendered page, and all the APIs hooked up nicely.

Look at `routes/` for simple examples. Run with `npm run start`. Routes are compiled on server-start (this should obviously be fixed).

As I've used this in production it's developed a little more than in the examples shown (mostly around handling form submission), but it's basically the same. It's pretty nice to have a tight coupling between the server and client with all the routing/file generation/optimization taken care of without needing a huge amount of configuration or files.
