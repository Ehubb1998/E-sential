import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SplashPage from "./components/SplashPage";


const App = () => {
  const token = useSelector(state => state.token);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <NavBar isLoggedIn={token} />
          <SplashPage isLoggedIn={token} />
        </Route>
        <Route path="/login" exact={true} render={() => <LoginPage isLoggedIn={token} />} />
        <Route path="/signup" exact={true} render={() => <SignUpPage isLoggedIn={token} />} />
        <ProtectedRoute path={"/homepage"} exact={true} isLoggedIn={token}>
          <NavBar isLoggedIn={token} />
          <Homepage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;