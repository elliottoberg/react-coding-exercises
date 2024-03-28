# React + TypeScript + Vite playground
This project provides a playground environment for testing out ideas or completing react programming challenges. I created this mostly as a place to practice for react-based software engineering interviews. I wanted an easy way to keep track of and reference everything I had practiced.

The app is essentially a simple storybook-like app.  A collapsible and searchable sidebar shows all the pages / projects you have created.  When you select one, it's content will render.

# Usage
Clone the repo and then do a `yarn install`.
Start the vite server with `yarn start`.
Add a new page with `yarn addPage "my page"`.

You can also remove a page with `yarn removePage "my page"` HOWEVER this will delete the files for that page folder.  Be careful.

Recommended workflow:
1. select 'use this template` in github in order to clone the repo to your own github account with any name you like
2. clone your new repo locally and install + start
3. add a page using `yarn addPage "my page"` -> only commit these changes when you are sure you want to 'save' what you did