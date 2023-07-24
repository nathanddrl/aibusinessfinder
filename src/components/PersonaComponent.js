import React from "react";

const PersonaComponent = ({ content }) => {
  if (!content) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Veillez générer le contenu
      </div>
    );
  }

  const renderArrayItems = (array) => {
    if (!array) return "N/A";
    return (
      <ul className="list-disc list-inside">
        {array.map((item, index) => (
          <li key={index} className="py-1">
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md text-left">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Persona: {content.name || "N/A"}
      </h2>
      <p className="py-2">
        <span className="font-semibold">Age:</span> {content.age || "N/A"}
      </p>
      <p className="py-2">
        <span className="font-semibold">Niveau d'éducation:</span>{" "}
        {content.education_level || "N/A"}
      </p>
      <p className="py-2">
        <span className="font-semibold">Profession:</span>{" "}
        {content.profession || "N/A"}
      </p>
      <p className="py-2">
        <span className="font-semibold">Revenus:</span>{" "}
        {content.income || "N/A"}
      </p>
      <p className="py-2">
        <span className="font-semibold">Localisation:</span>{" "}
        {content.location || "N/A"}
      </p>
      <p className="py-2">
        <span className="font-semibold">Sexe:</span> {content.gender || "N/A"}
      </p>
      <p className="py-2">
        <span className="font-semibold">Statut marital:</span>{" "}
        {content.marital_status || "N/A"}
      </p>
      <p className="py-2">
        <span className="font-semibold">Statut socio-économique:</span>{" "}
        {content.socioeconomic_status || "N/A"}
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Intérêts</h2>
      {renderArrayItems(content.interests)}

      <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Besoins</h2>
      {renderArrayItems(content.needs)}

      <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Croyances</h2>
      {renderArrayItems(content.beliefs)}

      <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Challenges</h2>
      {renderArrayItems(content.challenges)}

      <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
        Activités favorites
      </h2>
      {renderArrayItems(content.favorite_activities)}

      <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Peurs</h2>
      {renderArrayItems(content.fears)}

      <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Hobbies</h2>
      {renderArrayItems(content.hobbies)}

      <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
        Sources d'information
      </h2>
      {renderArrayItems(content.information_sources)}

      <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Motivations</h2>
      {renderArrayItems(content.motivations)}

      <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
        Traits de personnalité
      </h2>
      {renderArrayItems(content.personality_traits)}

      <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Valeurs</h2>
      {renderArrayItems(content.values)}
    </div>
  );
};

export default PersonaComponent;
