import { createBrowserRouter } from "react-router-dom";
import Main from "./Components/Main";
import Home from "./Components/Home/Home";
import ContactUs from "./Components/ContactUs";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import DASHBOARD from "./Components/DASHBOARD";
import PrivateRoute from "./Components/PrivateRoute";
import WorkSheet from "./Components/WorkSheet";
import Payment from "./Components/Shared/Payment";
import Detail from "./Components/Detail"


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/CONTACT_US",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/LogIn",
        element: <LogIn></LogIn>,
      },
      {
        path: "/SignUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/SignUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/DASHBOARD",
        element: (
          <PrivateRoute>
            <DASHBOARD></DASHBOARD>
          </PrivateRoute>
        ),
      },
      {
        path: "/WorkSheet",
        element: (
          <PrivateRoute>
            <WorkSheet></WorkSheet>
          </PrivateRoute>
        ),
      },
      {
        path: "/Payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: '/Detail/:email',
        element: (
          <PrivateRoute>
            <Detail></Detail>
          </PrivateRoute>
        ),
      },
    ],
  }
]);
