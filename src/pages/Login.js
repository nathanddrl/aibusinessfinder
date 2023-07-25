import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <main className="bg-dark min-h-screen flex items-center justify-center">
      <section className="bg-light p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">AiBusinessFinder</h2>
        <p className="mb-4 text-gray-600">
          Veuillez vous connecter pour accéder à l'application.
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="email-address" className="block font-semibold">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-dark bg-gray-50 text-dark"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-dark bg-gray-50 text-dark"
            />
          </div>

          <div className="mb-4">
            <button
              onClick={onLogin}
              className="w-full bg-dark text-white font-semibold px-4 py-2 rounded-lg hover:bg-light hover:border-dark hover:border-2 hover:text-dark focus:outline-none focus:ring focus:ring-blue-300"
            >
              Se connecter
            </button>
            <p className="mt-2 text-gray-600">
              Pas encore de compte ?{" "}
              <NavLink
                to="/signup"
                className="text-blue-500 font-semibold hover:text-blue-600"
              >
                S'inscrire
              </NavLink>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
