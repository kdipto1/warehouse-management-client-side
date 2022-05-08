import React, { useEffect } from 'react';
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import Skeleton from 'react-loading-skeleton';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import "./SocialLogin.css";
import { ImGoogle3 } from "react-icons/im";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
    if (loading) {
      <Skeleton count={6} />
      return;
    }
    if (error) {
      toast(error?.message);
    }
  }, [from, user, navigate,error, loading]);
  
  return (
    <div>
      <button
        onClick={() => signInWithGoogle()}
        className="button-40 d-block mx-auto my-2"
      > <ImGoogle3  className="me-2 h3"/>
        Google SignIn
      </button>
      
    </div>
  );
};

export default SocialLogin;