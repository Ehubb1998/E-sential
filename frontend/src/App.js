import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { currentUser } from "./store/actions/auth";
import { bankData } from "./store/actions/bankInfo";

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

  
  useEffect(() => {
    const userData = async () => {
      try {
        const userdata = await fetch(`/api/user/${userId}/${token}`);
        const bankdata = await fetch(`/api/bank_info/info/${userId}/${token}`);
  
        if (!userdata.ok) {
          throw userdata;
        }
        if (!bankdata.ok) {
          throw bankdata;
        }
  
        const { userData } = await userdata.json();
        const { BankInfo } = await bankdata.json();
        dispatch(currentUser(userData));
        dispatch(bankData(BankInfo));
      } catch (err) {
        console.error(err);
      }
    }
    userData();
  }, [])

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
        <ProtectedRoute path="/homepage" exact={true} isLoggedIn={token}>
          <NavBar isLoggedIn={token} />
          <Homepage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;