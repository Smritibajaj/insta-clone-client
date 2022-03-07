import "./App.css";
import InstagramLogin from "react-instagram-login";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  let navigate = useNavigate();
  const [token, setToken] = useState();
  const appDataPresent = localStorage.getItem('username');
  const uri = window.location.origin+ '/';
  console.log(uri);
  const responseInstagram = (response) => {
    console.log(response);
    setToken(response);
    if (response && !appDataPresent) {
      axios.defaults.withCredentials = true;
      //axios.defaults.origin = window.location.pathname

      axios
        .post("https://instagram-clone1-app.herokuapp.com/instagram/me", {
          code: response,
          redirectUrl: uri,
        })
        .then(({ data }) => {
          console.log("success", data);
          localStorage.setItem('username', data.response.username);
          navigate("/insta");
        })
        .catch(() => {
          localStorage.removeItem('username')
        });
    }
  };
  const errorInstagram = (response) => {
    console.log("not found");
  };

  return (
    <div className="h-screen w-screen">
      <div className="flex justify-center items-center h-screen">
      {!token && !appDataPresent && (
        <InstagramLogin
          clientId="7204929049549462"
          scope={"user_profile,user_media"}
          redirectUrl={uri}
          buttonText="Login with instagram"
          onSuccess={responseInstagram}
          onFailure={errorInstagram}
        />
      )}
      </div>
    </div>
  );
};

export default Login;
