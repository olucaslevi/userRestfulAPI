import React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";

import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
import Admin from "../Pages/Admin";
import Register from "./../Pages/Components/Register";
import RequestPassword from "./../Pages/Components/Requestpassword";
import CheckPassToken from "../Pages/Components/checkPassToken";
//create routes

const Router = createBrowserRouter([
  {
    path: "/",
    element: (<Home/>),
  },
  {
    path: "/dashboard",
    element: (<Dashboard/>),
  },
  {
    path: "/register",
    element: (<Register/>),
  },{
    path: "/requestpassword",
    element: (<RequestPassword/>),
  },
  {
    path: "/admin",
    element: (<Admin/>),
    errorElement: (<h1>Not Authorized</h1>),
  },
  {
    path: "/token",
    element: (<CheckPassToken/>),
  }
  ,
  {
    path: "*",
    element: (<h1>404</h1>),
  },
]);

export default Router;