import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event?.target?.email?.value;
    const password = event?.target?.password?.value;
    signInWithEmailAndPassword(email, password);
    event.target.reset();
    if (error) {
      return (
        <div>
          <p>Error: {error.message}</p>
        </div>
      );
    }
    if (loading) {
      return <p>Loading...</p>;
    }
    if (user) {
      console.log(user);
      return (
        <div>
          <p>Signed In User: {user.email}</p>
        </div>
      );
    }
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
