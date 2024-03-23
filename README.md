<p align="center">
  <img src="https://github.com/adreaskar/covid19-tracker/blob/master/covid19.png" width=170>
</p>

<h1 align="center"> Covid-19 Tracker </h1>

This was my first app that i deployed in public in 2020, thus it holds a special place in my heart. I decided to re-write it in 2024, to see how much i have improved since then and to utilize modern technologies.

It is a simple app that tracks Covid-19 data for a given country or a comparison of two different countries. Using a clean graphical interface, it provides all the necessary statistics.

## :hammer_and_wrench: What i used:

### In 2020:

Back in 2020 the way i learned to code was by following tutorials and reading documentation. I was not aware of the best practices and the most efficient way to write code. I was using vanilla js and i was not aware of the existence of frameworks or libraries.

So the "stack" i used was:

[Node.js](https://github.com/nodejs/node) in combination with [express](https://github.com/expressjs/express) for the backend and [ejs](https://ejs.co/) templates for the frontend.

But i managed to get familiar with some basic concepts like:

-   Using ES6's arrow functions
-   Using promises to handle asynchronous operations
-   Exporting a custom module and importing it to main app file
-   Using and installing node modules
-   Using environment variables

### In 2024:

In 2024 i decided to re-write the app using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/). Using Next.js i was able to create a more efficient and optimized app. Also containerized the app using [Docker](https://www.docker.com/).

Some of the new concepts i used are:

-   Using Next.js's server actions to fetch data on the server.
-   Using Next.js's dynamic routes to create a dynamic page for each interface.
-   Using Tailwind CSS to style mobile first.

## :rocket: How to use:

You can use the app by visiting the [live version](#) or by running it locally using the following command:

```bash
docker run -p 3000:3000 adreaskar/covid19-tracker
```

Then visit `http://localhost:3000` in your browser.

## :mag_right: Preview:

<p align="center">
  <img src="https://github.com/adreaskar/covid19-tracker/blob/master/covid.jpg" width=1000>
</p>

<p align="center">
  <img src="https://github.com/adreaskar/covid19-tracker/blob/master//covidwide.jpg" width=1000>
</p>

<p align="center">
  <a href="https://github.com/adreaskar/covid19-tracker/issues/new">Report Bug</a>
</p>
