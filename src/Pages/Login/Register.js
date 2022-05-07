import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import SocialLogin from './SocialLogin';
const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (error) {
      toast("error?.message");
    }
    if (loading) {
      return;
    }
    if (user) {
      toast("Successfully Registered");
      navigate(from, { replace: true });
    }
  },[error, from, loading, navigate,user])
  const handRegister = event => {
    event.preventDefault();
    const email = event?.target?.email?.value;
    const password = event?.target?.password?.value;
    createUserWithEmailAndPassword(email, password);
    
  }
  return (
    <div className="text-center login-div mt-2">
      <h2>Register your account!</h2>
      <form onSubmit={handRegister}>
        <input
          type="email"
          name="email"
          id=""
          placeholder="Your Email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Your Password"
          required
        />
        <br />
        <input type="submit" value="Register" className="button-40"/>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;