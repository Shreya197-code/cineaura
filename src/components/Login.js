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
    setErrorMessage(null);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col justify-between">
      <Header />

      {/* Background Poster Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={BACKGROUND_IMAGE}
          alt="CineAura Background"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex flex-1 justify-center items-center px-4 py-20">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-surface-elevated/90 backdrop-blur-xl p-8 sm:p-10 rounded-lg w-full max-w-md border border-border shadow-elevated text-text"
        >
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-6 text-text tracking-tight">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <div className="mb-4">
              <label htmlFor="nameInput" className="sr-only">Full Name</label>
              <input
                id="nameInput"
                ref={name}
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3.5 rounded-md bg-surface text-text placeholder-text-muted border border-border outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all text-sm sm:text-base"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="emailInput" className="sr-only">Email Address</label>
            <input
              id="emailInput"
              ref={email}
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3.5 rounded-md bg-surface text-text placeholder-text-muted border border-border outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all text-sm sm:text-base"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="passwordInput" className="sr-only">Password</label>
            <input
              id="passwordInput"
              ref={password}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3.5 rounded-md bg-surface text-text placeholder-text-muted border border-border outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all text-sm sm:text-base"
            />
          </div>

          {errorMessage && (
            <p className="text-error font-medium text-sm mb-4 bg-error/10 border border-error/20 p-3 rounded-md flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </p>
          )}

          <button
            onClick={handleButtonClick}
            type="submit"
            className="w-full bg-accent text-background font-semibold py-3.5 rounded-md hover:bg-accent-muted transition-all duration-200 shadow-card focus:outline-none focus:ring-2 focus:ring-accent active:scale-95 text-sm sm:text-base mt-2"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            onClick={toggleSignInForm}
            className="mt-6 text-sm text-text-muted hover:text-accent cursor-pointer transition-colors text-center focus:outline-none focus:underline"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleSignInForm();
            }}
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