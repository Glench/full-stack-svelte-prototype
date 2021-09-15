# Full Stack Svelte Prototype

A prototype framework (?) for making full-stack Svelte apps. It unites the front and backends in a way that simplifies my life a lot and lets me write apps as I understand them. Features:

* Code-splitting per page
* Automatically-generated and optimized JS/CSS/HTML (thanks Svelte!)
* Server-side rendering (for fast page loads and SEO)
* Automatic client-side component mounting
* Automatic AJAXy POST requests
* Primitive cache-busting
 
You just need one file to make a route, server-side-rendered page, client-side-rendered page, and all the APIs hook up nicely with almost no boilerplate. Basically one file creates a backend API that is used to feed into the front-end Svelte component, causing the component to efficiently re-render.

Look at `routes/` for simple examples. Run with `npm run start`. Routes are compiled on server-start (this should obviously be fixed).

As I've used this in production it's developed a little more than in the examples shown (mostly around handling form submission), but it's basically the same. It's pretty nice to have a tight coupling between the server and client with all the routing/file generation/optimization taken care of without needing a huge amount of configuration or files.
