import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './pages/root/root';
import ErrorPage from './pages/errorPage/errorPage';
import { ConctactUsPage } from './pages/contactUs/contactUs';
import { ChatbotPage } from './pages/chatbot/chatbot';
import MortgageCalculator from './pages/mortgageCalculator/mortgageCalculator';
import Tabs from './pages/tabs/tabsInterface';
import TodoList from './pages/todoList/todoList';
import TrafficLight from './pages/trafficLight/trafficLight';

export const projects = [
  { name: "Contact Us Page", path: "contact_us", component: ConctactUsPage },
  { name: "Chatbot", path: "chatbot", component: ChatbotPage },
  { name: "Mortgate Calculator", path: "mortgage_calculator", component: MortgageCalculator },
  { name: "Tab Interface", path: "tab_interface", component: Tabs },
  { name: "Todo List", path: "todo_list", component: TodoList },
  { name: "Traffic Light", path: "traffic_light", component: TrafficLight },
]

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: projects.map(project => ({ path: project.path, element: <project.component /> })),
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
