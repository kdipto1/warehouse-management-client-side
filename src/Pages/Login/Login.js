import React, { useEffect } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import SocialLogin from "./SocialLogin";
import "./Login.css";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [user1, loading1] = useAuthState(auth);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (error) {
      toast(error?.message);
    }
    if (loading) {
      <Skeleton count={6}/>
      return;
    }
    if (user || user1) {
      toast("Login Successful");
      console.log(user1);
      const url = "https://server-11-11.herokuapp.com/login";
      axios
        .post(url, { email: user1?.email })
        .then((response) => {
          const { data } = response;
          localStorage.setItem("accessToken", data.token);
          console.log(data);
          navigate(from, { replace: true });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [error, from, loading, navigate, user, user1]);

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event?.target?.email?.value;
    const password = event?.target?.password?.value;
    signInWithEmailAndPassword(email, password);
    event.target.reset();
  };
  return (
    <div className="text-center login-div mt-4">
      <h2>Login to your Account</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" required placeholder="Your Email" />
        <br />
        <input
          className="mt-2"
          type="password"
          name="password"
          required
          placeholder="Your Password"
        />
        <br />
        <input type="submit" value="Login" className="btn btn-primary mt-2" />
      </form>
      <p>
        Don't have an account, Please <Link to="/register">Register</Link>{" "}
      </p>
      <hr className="w-50 mx-auto" />
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
