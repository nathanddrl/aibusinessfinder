import React from "react";

const LandingPageComponent = ({ content }) => {
  if (!content) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Veuillez générer le contenu
      </div>
    );
  }

  const renderSection = (section, index) => {
    if (!section) return null;

    return (
      <div key={index} className="my-8">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Titre de section : {section.title || "N/A"}
        </h3>
        <p className="mb-2">Contenu: {section.content || "N/A"}</p>
        <p className="mb-2">
          Call to Action: {section.call_to_action || "N/A"}
        </p>
      </div>
    );
  };

  const renderSections = (sections) => {
    if (!sections || sections.length === 0)
      return <p className="text-gray-500">Section non disponible</p>;

    return sections.map(renderSection);
  };

  const renderFooter = (footer) => {
    if (!footer) return null;

    return (
      <div className="my-8">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Footer Content: {footer.content || "N/A"}
        </h3>
        <p className="mb-2">Call to Action: {footer.call_to_action || "N/A"}</p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 bg-gray-50 rounded-lg shadow-md text-left">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Détails de la landing page
      </h2>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Header: {content.landing_page.header || "N/A"}
      </h3>
      {renderSections(content.landing_page.sections)}
      {renderFooter(content.landing_page.footer)}
    </div>
  );
};

export default LandingPageComponent;
