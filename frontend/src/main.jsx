import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import UploadProfilePic from './components/UploadProfilePic.jsx';
import VerifyEmail from './components/VerifyEmail.jsx';
import OptionSelection from './components/OptionSelection.jsx';
import { UserContextProvider } from './context/UserContext.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="upload-profile-pic" element={<UploadProfilePic />} />
      <Route path="option-select" element={<OptionSelection />} />
      <Route path="verify-email" element={<VerifyEmail />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
