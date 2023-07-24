import React from "react";

const ResultDisplay = ({ gptResponse }) => {
  const data = gptResponse;
  console.log(data);
  const combinations = data.combinations;

  if (!gptResponse || !gptResponse.combinations) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-dark dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
      {combinations.length === 0 && (
        <p>
          Veuillez saisir un produit ou un service pour obtenir un résultat.
        </p>
      )}

      {combinations.map((combination, index) => (
        <div key={index} className="mb-4 text-left">
          <h2 className="text-2xl font-bold mb-4 h-10 text-dark">
            Proposition {index + 1}
          </h2>
          <p>
            <strong>Proposition:</strong> {combination.proposition}
          </p>
          <p>
            <strong>Cible:</strong> {combination.target}
          </p>
          <p>
            <strong>Cannaux d'acquisition:</strong>{" "}
            {combination.acquisition_channel}
          </p>
          <p>
            <strong>Ton:</strong> {combination.tone}
          </p>
          <p>
            <strong>Tutoiement / Vouvoiement:</strong> {combination.addressing}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ResultDisplay;
