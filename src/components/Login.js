import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword,
  updateProfile,} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const name = useRef(null);

  const email = useRef(null);

  const password = useRef(null);

  const handleButtonClick = async (e) => {

    e.preventDefault();

    const message = checkValidData(
      name.current?.value,
      email.current.value,
      password.current.value
    );

    setErrorMessage(message);

    if (message) return;

    // SIGN UP
    if (!isSignInForm) {

      try {

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name.current.value,
          photoURL:
            "https://example.com/profile.jpg",
        });

        dispatch(
          addUser({
            name: name.current.value,
            email: user.email,
          })
        );

        navigate("/browse");

      } catch (error) {

        setErrorMessage(
          error.code + " - " + error.message
        );
      }

    }

    // SIGN IN
    else {

      try {

        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );

        const user = userCredential.user;

        dispatch(
          addUser({
            name: user.displayName,
            email: user.email,
          })
        );

        navigate("/browse");

      } catch (error) {

        setErrorMessage(
          error.code + " - " + error.message
        );
      }
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      <Header />

      {/* Background */}
      <div className="absolute inset-0">

        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/5efeb1fd-55d2-4799-8d38-e59e15858b9c/web/IN-en-20260427-TRIFECTA-perspective_0933b420-0cb6-4e67-8e9d-3224dc64b517_large.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

      </div>

      {/* Form */}
      <div className="relative z-10 flex justify-center items-center h-screen">

        <form className="bg-black/75 p-10 rounded-2xl w-full max-w-md text-white">

          <h1 className="text-3xl font-bold mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mb-4 rounded bg-zinc-800"
            />
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded bg-zinc-800"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 rounded bg-zinc-800"
          />

          <p className="text-red-500 font-bold text-sm mb-4">
            {errorMessage}
          </p>

          <button
            onClick={handleButtonClick}
            className="w-full bg-red-600 py-3 rounded hover:bg-red-700 transition"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            onClick={toggleSignInForm}
            className="mt-6 cursor-pointer text-gray-300 hover:text-white"
          >
            {isSignInForm
              ? "New to CineAura? Sign Up Now"
              : "Already Registered? Sign In"}
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;