import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import HeroesList from "./components/HeroesList.tsx";
import HeroDetail from "./components/HeroDetail.tsx";
import {MessageProvider} from "./context/MessageContext.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Navigate replace to={'/dashboard'} /> },
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/heroes', element: <HeroesList /> },
            { path: '/heroes/:id', element: <HeroDetail /> },
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <MessageProvider>
          <RouterProvider router={router} />
      </MessageProvider>
    {/*<App />*/}
  </React.StrictMode>,
)
