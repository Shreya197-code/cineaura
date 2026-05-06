import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { BACKGROUND_IMAGE } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async (e) => {
    e.preventDefault();

    const message = checkValidData(
      isSignInForm ? null : name.current?.value,
      email.current.value,
      password.current.value
    );

    setErrorMessage(message);
    if (message) return;

    // SIGN UP
    if (!isSignInForm) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name.current.value,
          photoURL: "https://example.com/profile.jpg",
        });

        navigate("/browse");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    // SIGN IN
    else {
      try {
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        navigate("/browse");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <Header />

      <div className="absolute inset-0">
        <img
          src={BACKGROUND_IMAGE}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

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
            type="email"
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