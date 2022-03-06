import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Login from "./AppLogin";
import Instagram from "./Instagram";
import Post from "./Post";

const InstagramComponent = () => {
  return(
    <Outlet />
  )
}


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/insta" element={<InstagramComponent />}>
            <Route index element={<Instagram />} />
            <Route path=":link" element={<Post />} />
          </Route>
          <Route path="/user" element={<InstagramComponent />}>
            <Route index element={<Instagram />} />
            <Route path=":link" element={<Post />} />
          </Route>
        </Routes>
      </Router>
      <Outlet />
    </>
  );
};

export default App;
