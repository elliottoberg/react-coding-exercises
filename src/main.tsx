import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './pages/root/root';
import ErrorPage from './pages/errorPage/errorPage';
import { pages } from 'src/db.json'

// Dynamically import all page elements in the pages directory.
// Setting eager to true since, for now, we want all page modules loaded (not lazy loaded).
const pageModules = import.meta.glob(['/src/pages/*/*.tsx', '!**/*.test.tsx'], { import: 'default', eager: true});
const getAbsolutePath = (path: string) => `/${path}.tsx`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: pages.map(page => {
      const absolutePath = getAbsolutePath(page.path);
      const PageElement = pageModules[absolutePath] as () => JSX.Element;
      return { path: `/${page.id}`, element: PageElement ? <PageElement /> : null }
    }),
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
