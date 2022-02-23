import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import InstagramLogin from 'react-instagram-login';
 
const responseInstagram = (response) => {
  console.log(response);
}
 
ReactDOM.render(
  <InstagramLogin
    clientId="1628915767495227"
    scopes={['user_profile,user_media']}
    redirectUrl={window.location.origin + "/insta"}
    buttonText="Login"
    onSuccess={responseInstagram}
    onFailure={responseInstagram}
  />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
