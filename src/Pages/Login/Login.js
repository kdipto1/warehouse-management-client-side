import React, { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (error) {
      toast(error?.message);
    }
    if (loading) {
      return;
    }
    if (user) {
      console.log(user);
      navigate(from, { replace: true });
    }
  }, [error,from, loading,navigate,user]);
  
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event?.target?.email?.value;
    const password = event?.target?.password?.value;
    signInWithEmailAndPassword(email, password);
    event.target.reset();
    
  };
  return (
    <div>
      <h2>Login to your Account</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" required placeholder="Your Email" />
        <input
          type="password"
          name="password"
          required
          placeholder="Your Password"
        />
        <input type="submit" value="Login" />
      </form>
      <p>Don't have an account, Please <Link to="/register">Register</Link> </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
