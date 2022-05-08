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
    
    if (loading) {
      return;
    }
    if (error) {
      toast(error?.message);
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
    <div className="text-center vh-100 login-div text-center mt-4 ">
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
          className='my-2'
          type="password"
          name="password"
          id=""
          placeholder="Your Password"
          required
        />
        <br />
        <input
          type="submit"
          value="Register"
          className="btn btn-primary"
        />
      </form>
      <hr  className="w-50 mx-auto"/>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;