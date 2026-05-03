import React, { useState } from "react";
import Header from "./Header";

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      <Header />

      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/5efeb1fd-55d2-4799-8d38-e59e15858b9c/web/IN-en-20260427-TRIFECTA-perspective_0933b420-0cb6-4e67-8e9d-3224dc64b517_large.jpg"
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
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mb-4 rounded bg-zinc-800"
            />
          )}

          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded bg-zinc-800"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 rounded bg-zinc-800"
          />

          <button className="w-full bg-red-600 py-3 rounded hover:bg-red-700">
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