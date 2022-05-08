import React, { useEffect, useRef } from "react";
import {
  useAuthState,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import SocialLogin from "./SocialLogin";
import "./Login.css";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useSendEmailVerification } from "react-firebase-hooks/auth";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);
  const [sendEmailVerification, verifySending, verifyError] =
    useSendEmailVerification(auth);
  const [user1, loading1] = useAuthState(auth);
  const emailRef = useRef("")
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (error || resetError) {
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
  }, [error, from, loading, navigate, user, user1,resetError]);

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event?.target?.email?.value;
    const password = event?.target?.password?.value;
    signInWithEmailAndPassword(email, password);
    event.target.reset();
  };
  const resetPassword = async () => {
    const email = emailRef.current.value
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Sent email");
    } else {
      toast("please enter your email address");
    }
  };
  return (
    <div className="text-center vh-100 login-div mt-4">
      <h2>Login to your Account</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          ref={emailRef}
          name="email"
          required
          placeholder="Your Email"
        />
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
      <p className="text-center">
        Forget password?{" "}
        <span
          className="text-primary resetpassword pe-auto text-decoration-none"
          onClick={resetPassword}
        >
          Reset Password
        </span>
      </p>
      <button className="btn btn-warning"
        onClick={async () => {
          if (!emailRef?.current?.value) {
            toast("Enter your email address")
          }
          else {
            await sendEmailVerification(
              emailRef?.current?.value
            );
            toast("Sent email");
          }
        }}
      >
        Verify email
      </button>
      <hr className="w-50 mx-auto" />
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
