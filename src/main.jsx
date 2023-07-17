import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login/Login.jsx';
import Homepage from './Home/Homepage.jsx';
import AuthProvider from './AuthProviders/AuthProvider.jsx';
import SignUp from './SignUp/SignUp.jsx';
import PrivateRouter from './Private/PrivateRouter.jsx';
import DashboardHome from './Dashboard/DashboardHome.jsx';
import MyTasks from './Dashboard/Tasks/MyTasks.jsx';
import CompletedTasks from './Dashboard/Tasks/CompletedTasks.jsx';
import AllUsers from './Dashboard/Admin/AllUsers.jsx';
import DueTask from './Dashboard/Tasks/DueTask.jsx';
import Messages from './Dashboard/Admin/Messages.jsx';
import AddUser from "./Dashboard/Admin/AddUsers.jsx";
import About from './About/About.jsx';
import AddTask from './Dashboard/Admin/AddTask.jsx';


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
       {
        path: "/about",
        element:<About></About>,
       },
        {
          path: "/dashboard",
          element: <PrivateRouter><DashboardHome></DashboardHome></PrivateRouter>,
          children: [
            {
              path: "mytasks",
              element: <MyTasks />,
            },
            {
              path: "completed",
              element: <CompletedTasks />,
            },
            {
                path:"adduser",
                element: <AddUser></AddUser>,
            },
            {
                path: "alluser",
                element: <AllUsers></AllUsers>,
            },
            {
              path:"due",
              element:<DueTask></DueTask>,
            },
            {
              path: "message",
              element: <Messages></Messages>,
            },
            
            {
              path: "addtask",
              element:  <AddTask></AddTask>,
            }
          ],
        },
      ],
    },
  ]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);