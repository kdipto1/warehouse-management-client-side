import React from 'react';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from '../../firebase.init';
const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const handRegister = event => {
    event.preventDefault();
    const email = event?.target?.email?.value;
    const password = event?.target?.password?.value;
    createUserWithEmailAndPassword(email, password);
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
      return (
        <div>
          <p>Registered User: {user.email}</p>
        </div>
      );
    }
  }
  return (
    <div>
      <h2>Register your account!</h2>
      <form onSubmit={handRegister}>
        <input type="email" name="email" id="" placeholder="Your Email" required />
        <br />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Your Password"
          required
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;