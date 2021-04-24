# OctoGist - A GitHub Gist API Client to search users and their public gists
This is a single page app using [ReactJS](https://reactjs.org) CRA and and using the [GitHub](http://github.com) [Gist](http://gist.github.com) API. This app is simple and lets you search the GitHub users and do the following:

- list all available gists for the searched user
- each gist item listed should have a badge (languages used)
- how many times this gist has been forked, if any

The main layout of the app will have a form in the center of the page, something extremely simple like an input and a button. When you search for a valid user, cards of different gists will display underneath the user or it will return that no gists were found in case the user exists but has not written any gists. Here is a quick mockup:

![mockup.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1d4342c0-3e5c-41cb-8a41-cb3e335af78b/Untitled.png)

When I started thinking about how to tackle the project, I first visualized the UI (user interface) and what that was going to look like. then I started thinking about the way I will hit the [GitHub API](https://docs.github.com/en/rest/reference/gists) endpoints and from which React components and at what stage. What React hooks am I going to use and what are the dependencies that I need to correctly hit the endpoints and get the data that I needed? I ended up using a library called [react-query](https://react-query.tanstack.com/) which gives us a nice UX/DX experience enhancing the browser cache to deal with the API fetch functions.

## The UI
The UI is simple. It consists of two to four components in total to make up this app.
1. the form
2. the gist data
3. the gist
4. the gist tags (what programming languages it includes)
5. the forks (how many times was this gist forked, if any)

### The Component Hierarchy Structure
![componentsHierarchy.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/37173529-38be-475d-8ef6-bb59c1eba9de/Untitled.png)

Let me briefly describe what each component is doing.

### The Form
The form included a label which was styled to look like a main title, an example list of users to select from. I've included some of the famous celebrities of the web industry including myself of course 😙. A text input where you can search for the desired GitHub user and finally a button to submit the form.

![form.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0d8dd7de-83b4-41d2-a642-5a10ce98c6cb/Untitled.png)

### The Gist Data Component
decides what data should be rendered to the page based on what state we have at hand at the current moment

### The Gist Component
Renders the actual gist card with its information. We have a title which consists of the name of the first file of the gist combined with the name of the user we are searching for
### The Tags
what languages were used in the file list of the gist at hand
### The Forks
if any, who forked this gist with a link to the actual forks

## In conclusion
I've added some simple tests using jest and react-testing-library to make sure we have confidence of things running in the right way and not braking. Validation with prop types and error handling using the error boundary library. This project has been fun to work on and I am looking forward to meeting you to answer any further questions you might have.
