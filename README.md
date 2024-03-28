# React + TypeScript + Vite playground
This project provides a playground environment for testing out ideas or completing react programming challenges. I created this mostly as a place to practice for react-based software engineering interviews. I wanted an easy way to keep track of and reference everything I had practiced.

The app is essentially a simple storybook-like app.  A collapsible and searchable sidebar shows all the pages / projects you have created.  When you select one, it's content will render.

<img width="820" alt="Screenshot 2024-03-28 at 11 56 16 AM" src="https://github.com/elliottoberg/react-coding-exercises/assets/32965602/bb637eeb-d426-4a83-97e9-43be270cb525">

# Usage
- Clone the repo and then do a `yarn install`
- Start the vite server with `yarn start`
- Add a new page with `yarn addPage "my page"`
  - This will create a folder under `pages/myPage` with 3 new files: `myPage.tsx, myPage.css, myPage.test.tsx`
  - The new page will automatically get added to the `db.json` file which controls what is displayed and searchable in the sidebar

You can also remove a page with `yarn removePage "my page"` HOWEVER this will delete the files for that page folder.  Be careful.

Recommended workflow:
1. select 'use this template` in github in order to clone the repo to your own github account with any name you like
2. clone your new repo locally and install + start
3. add a page using `yarn addPage "my page"` -> only commit these changes when you are sure you want to 'save' what you did
