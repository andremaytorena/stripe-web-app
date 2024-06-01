import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import API_BASE_URL from "../../Config";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    // Check if the user is authenticated
    const token = Cookies.get("token");
    console.log(token);

    // If the token exists, render the component
    if (token) {
      return <Component {...props} />;
    }

    // If the token doesn't exist, redirect to the login page
    return <Navigate to="/login" />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
