import React, { useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/Auth";
import Comp from "./pages/Comp";
import MyProjects from "./pages/MyProjects";
import AllProjects from "./pages/AllProjects";
import myProfile from "./pages/MyProfile";
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navigation";
import AuthContex from "./context/auth-contex";

function App() {
  const [context, setContext] = useState({
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  });
  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContex.Provider value={[context, setContext]}>
          <NavBar />
          <main>
            <Switch>
              {!context.token && <Redirect from="/" to="/auth" exact />}
              {context.token && (
                <Redirect from="/auth" to="/components" exact />
              )}
              {context.token && <Route path="/components" component={Comp} />}
              {context.token && (
                <Route path="/projects" component={MyProjects} />
              )}
              {context.token && (
                <Route path="/allprojects" component={AllProjects} />
              )}

              {context.token && (
                <Route path="/myprofile" component={myProfile} />
              )}
              {!context.token && <Route path="/auth" component={AuthPage} />}
              <Route path="/" component={HomePage} />
            </Switch>
          </main>
        </AuthContex.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
