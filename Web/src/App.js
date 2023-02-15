
import './App.css';
import React,{
  useContext
} from 'react';
import Router from './Routes/routes';
import { RouterProvider } from 'react-router-dom';
import { AuthPhovider, Context } from './Contexts/authContext';

export default function App() {
  return (
    <AuthPhovider>
      <RouterProvider router={Router}>
        <Context>
          <Router/>
        </Context>
      </RouterProvider>
    </AuthPhovider>
  );
}
