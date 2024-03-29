# React + TypeScript + Vite playground
This project provides a playground environment for testing out ideas or completing react programming challenges. I created this mostly as a place to practice for react-based software engineering interviews. I wanted an easy way to keep track of and reference everything I had practiced.

The app is essentially a simple storybook-like app.  A collapsible and searchable sidebar shows all the pages / projects you have created.  When you select one, it's content will render.

<kbd><img width="1149" alt="Screenshot 2024-03-28 at 4 47 57 PM" src="https://github.com/elliottoberg/react-coding-exercises/assets/32965602/26a24a8b-8abc-4c7e-8fd3-28c9b4e28d45"></kbd>

# Usage
- Select `use this template` in github in order to clone the repo to your own github account with any name you like
- Clone the repo to your local dev environment and then do a `yarn install`
- Start the vite server with `yarn start`
- Add a new page with `yarn addPage "my page"`
  - This will create a folder under `pages/myPage` with 3 new files: `myPage.tsx, myPage.css, myPage.test.tsx`
  - The new page will automatically get added to the `db.json` file which controls what is displayed and searchable in the sidebar
  - Only commit these changes when you are sure you want to 'save' what you did

You can also remove a page with `yarn removePage "my page"` HOWEVER this will delete the files for that page folder.  Be careful.

# Stack
- Typescript
- React
- Libraries
  - `react-query` is installed and ready for use in one of your pages / projects
  - `react-router-dom` is also installed and being used for the sidebar
  - `jest` & `react-testing-library` are installed and ready to be used in tests
 
# Testing
A custom render function is being imported in scaffolded test files by default.  The custom render function `renderWithProviders` ensures the test component is rendered with a `MemoryRouter` and the react-query `QueryProvider`.  It also initializes a user for user events and exposes the current location for the memory router.

The regular react-testing-library render function is re-exported from the same testUtils file for testing components that don't need the providers.
