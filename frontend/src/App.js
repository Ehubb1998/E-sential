import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { currentUser } from "./store/actions/auth";

import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SplashPage from "./components/SplashPage";
import ContentCredits from "./components/ContentCredits";


const App = () => {
  const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");
  const userId = window.localStorage.getItem("ESENTIAL_USER_ID");
  const dispatch = useDispatch();

  const userData = async () => {
    try {
      const request = await fetch(`http://localhost:5000/api/user/${userId}/${token}`);

      if (!request.ok) {
        throw request;
      }

      const { userData } = await request.json();
      dispatch(currentUser(userData));
    } catch (err) {
      console.error(err);
    }
  }
  userData();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <NavBar isLoggedIn={token} />
          <SplashPage isLoggedIn={token} />
        </Route>
        <Route path="/login" exact={true} render={() => <LoginPage isLoggedIn={token} />} />
        <Route path="/signup" exact={true} render={() => <SignUpPage isLoggedIn={token} />} />
        <Route path="/credits" exact={true}>
          <NavBar isLoggedIn={token} />
          <ContentCredits />
        </Route>
        <ProtectedRoute path={"/homepage"} exact={true} isLoggedIn={token}>
          <NavBar isLoggedIn={token} />
          <Homepage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;