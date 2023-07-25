import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(db);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, {
        email: user.email,
        uid: user.uid,
        credits: 500,
      })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      navigate("/");
    } catch (error) {
      console.error("Error: ", error.code, error.message);
    }
  };

  return (
    <main className="bg-dark min-h-screen flex items-center justify-center">
      <section className="bg-light p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">AiBusinessFinder</h2>
        <p className="mb-4 text-gray-600">
          Veuillez vous inscrire pour accéder à l'application.
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="email-address" className="block font-semibold">
              Email address
            </label>
            <input
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-dark bg-gray-50 text-dark"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold">
              Password
            </label>
            <input
              type="password"
              label="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-dark bg-gray-50 text-dark"
            />
          </div>

          <button
            type="submit"
            onClick={onSubmit}
            className="w-full bg-dark text-white font-semibold px-4 py-2 rounded-lg hover:bg-light hover:border-dark hover:border-2 hover:text-dark focus:outline-none focus:ring focus:ring-blue-300"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          Vous avez déjà un comtpe ?
          <NavLink
            to="/login"
            className="text-blue-500 font-semibold hover:text-blue-600 ml-2"
          >
            Se connecter
          </NavLink>
        </p>
      </section>
    </main>
  );
};

export default Signup;
