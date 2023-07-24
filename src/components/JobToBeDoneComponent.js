import React from "react";

const JobToBeDoneComponent = ({ content }) => {
  if (!content) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Veillez générer le contenu
      </div>
    );
  }

  const renderList = (items) => {
    if (!items || items.length === 0) return <p>N/A</p>;
    return (
      <ul className="list-disc list-inside">
        {items.map((item, index) => (
          <li key={index} className="py-1">
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md flex text-left">
      <div className="w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Titre du Job : {content.jobTitle || "N/A"}
        </h2>

        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
          Description
        </h2>
        <p className="py-2">{content.jobDescription || "N/A"}</p>

        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
          Besoins Fonctionnels
        </h2>
        {renderList(content.functionalNeeds)}

        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
          Besoins Emotionnels
        </h2>
        {renderList(content.emotionalNeeds)}

        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
          Besoins Sociaux
        </h2>
        {renderList(content.socialNeeds)}
        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
          Résultats souhaités
        </h2>
        {renderList(content.desiredOutcomes)}

        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
          Segment de clientèle
        </h2>
        <p className="py-2">{content.customerSegment || "N/A"}</p>

        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
          Marché cible
        </h2>
        <p className="py-2">{content.targetMarket || "N/A"}</p>

        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
          Concurrence
        </h2>
        <p className="py-2">{content.competition || "N/A"}</p>

        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
          Proposition de valeur unique
        </h2>
        <p className="py-2">{content.uniqueValueProposition || "N/A"}</p>

        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
          Canaux de communication
        </h2>
        {renderList(content.marketingChannels)}
      </div>
    </div>
  );
};

export default JobToBeDoneComponent;
