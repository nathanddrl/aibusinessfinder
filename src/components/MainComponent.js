import React from "react";
import { useOpenAiApi } from "../hooks/useOpenAiApi";
import ResultDisplay from "./ResultDisplay";
import { useState, useEffect } from "react";
import MarketingDetails from "./MarketingDetails";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import useUserCredits from "../hooks/useUserCredits";
import { doc, onSnapshot } from "firebase/firestore";

const MainComponent = () => {
  const openAiApi = useOpenAiApi();
  const [prompt, setPrompt] = useState("Test");
  const [gptResponse, setGptResponse] = useState({ combinations: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [responseReceived, setResponseReceived] = useState(false);
  const [combinaisonSelected, setCombinaisonSelected] = useState(0);
  const [isCombinationChosen, setIsCombinationChosen] = useState(false);
  const [systemContent, setSystemContent] = useState(
    'En tant qu\'expert en marketing et en copywriting avec plus de 20 ans d\'expérience, tu es là pour m\'aider. L\'utilisateur souhaite vendre un produit ou un service qui te sera donné. J\'aimerais que tu me proposes 3 combinaisons VRAIMENT DISTINCTES pour attirer les clients, comprenant une proposition de valeur, la cible la plus susceptible d\'être intéressée et le canal d\'acquisition pour toucher au mieux cette cible. Donne moi aussi le ton à utiliser et s\'il est mieux que j\'utilise le tutoiement ou le vouvoiement pour m\'adresser à ma cible. Je veux un retour sous forme d\'objet JSON. Je veux seulement le JSON en réponse et absolument rien d\'autre que du format JSON, aucun texte.format : {"combinations": [{"proposition": "","target": "","acquisition_channel": "","tone": "","addressing": ""},'
  );
  const [placeholder, setPlaceholder] = useState(
    "Entrez la description de votre produit ou service ici..."
  );
  // define user
  const user = auth.currentUser;
  // get user credits
  const [credits, updateUserCredits] = useUserCredits(user.uid);
  const [price, setPrice] = useState(20); // default price is 20 credits

  const sendPrompt = (systemPrompt, userPrompt) => {
    if (credits >= price) {
      setIsLoading(true);
      if (openAiApi) {
        openAiApi
          .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              { role: "user", content: userPrompt },
            ],
            max_tokens: 500,
          })
          .then((response) => {
            setIsLoading(false); // Indique la fin du chargement
            response = JSON.parse(response.data.choices[0].message.content);
            // add to the json the user prompt
            response.user_prompt = userPrompt;
            if (response.combinations) {
              setGptResponse(response); // Met à jour l'état ici
              setResponseReceived(true);
              updateUserCredits(credits - price);
            }
          })
          .catch((error) => {
            setIsLoading(false); // En cas d'erreur, on arrête le chargement aussi
            console.error(error);
          });
      }
    } else {
      alert("You don't have enough credits to perform this action.");
    }
  };

  //  add on snapshot to update credits
  useEffect(() => {
    const docRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        updateUserCredits(doc.data().credits);
      }
    });

    // Nettoyage à la désinscription
    return () => unsubscribe();
  }, [user.uid]);

  const chooseCombination = (index) => {
    setCombinaisonSelected(index);
    setIsCombinationChosen(true);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col bg-dark min-h-screen">
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-dark dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-4 pl-10 w-full text-sm text-dark bg-gray-50 rounded-lg border-2 border-dark dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder={placeholder}
          onChange={(e) => setPrompt(e.target.value)}
          required
        ></input>
        <button
          onClick={() => sendPrompt(systemContent, prompt)}
          className="text-white absolute right-2.5 bottom-2.5 bg-dark hover:bg-light focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-light"
        >
          Envoyer
        </button>
      </div>
      {isLoading ? (
        <p className="mt-4 text-center bg-gray-50 rounded-lg border-2 border-dark dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white w-32 mx-auto py-2">
          Loading...
        </p>
      ) : isCombinationChosen ? (
        <MarketingDetails
          gptResponse={gptResponse}
          selectedCombination={combinaisonSelected}
        />
      ) : (
        <div className="mt-4 flex flex-col">
          <ResultDisplay gptResponse={gptResponse} />
          {responseReceived && (
            <div className="flex flex-row justify-center mt-4">
              <button
                onClick={() => chooseCombination(0)}
                className="text-dark bg-light focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  mr-2 hover:bg-dark hover:outline-light hover:border-light hover:text-light hover:border-2"
              >
                Choix 1
              </button>
              <button
                onClick={() => chooseCombination(1)}
                className="text-dark bg-light focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  mr-2 hover:bg-dark hover:outline-light hover:border-light hover:text-light hover:border-2"
              >
                Choix 2
              </button>
              <button
                onClick={() => chooseCombination(2)}
                className="bg-light text-dark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 hover:bg-dark hover:outline-light hover:border-light hover:text-light hover:border-2"
              >
                Choix 3
              </button>
            </div>
          )}
        </div>
      )}

      {/* add logout button */}
      <button
        onClick={handleLogout}
        className="text-white bg-light w-32 self-end focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-4 hover:bg-light hover:outline-dark hover:border-dark hover:text-dark hover:border-2"
      >
        Se déconnecter
      </button>
      {/* add user credits amount */}
      <p className="text-white text-right mt-4">Crédits restants : {credits}</p>
    </div>
  );
};

export default MainComponent;
