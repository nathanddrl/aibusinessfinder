import React from "react";

const CommunicationMediaComponent = ({ content }) => {
  if (!content) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Veillez générer le contenu
      </div>
    );
  }

  const renderChannels = (channelData, title) => {
    if (!channelData) return <p>N/A</p>;
    return (
      <div className="py-2">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
        <h4 className="text-base font-semibold text-gray-800 mb-1">
          {channelData.name}
        </h4>
        <p>{channelData.explanation}</p>
      </div>
    );
  };

  const renderActionExamples = (examples) => {
    if (!examples || examples.length === 0)
      return <p>No Call to Action Examples</p>;
    return (
      <ul className="list-disc list-inside">
        {examples.map((item, index) => (
          <li key={index} className="py-1">
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col text-left">
      <div className="w-full">
        {renderChannels(
          content.communication_channels.main,
          "Moyen de communication principal"
        )}
        {renderChannels(
          content.communication_channels.secondary,
          "Mode de communication secondaire"
        )}
        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
          Message Marketing
        </h2>
        <p className="py-2">{content.marketing_message || "N/A"}</p>

        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">
          Examples de Call to Action
        </h2>
        {renderActionExamples(content.call_to_action_examples)}
      </div>
    </div>
  );
};

export default CommunicationMediaComponent;
