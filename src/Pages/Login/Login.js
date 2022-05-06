import React from 'react';

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  return (
    <div>
      <form action="">
        <input type="email" name="email" id="" placeholder="Your Email"/>
        <input type="password" name="password" id="" placeholder="Your Password"/>
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
};

export default Login;