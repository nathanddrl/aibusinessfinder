import React from "react";

const PostIdeasComponent = ({ content }) => {
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

  const renderIdeas = (ideas) => {
    if (!ideas || ideas.length === 0)
      return <p className="text-gray-500">No ideas available</p>;

    return ideas.map((idea, index) => (
      <div
        key={index}
        className="my-8 bg-white p-4 rounded shadow border border-gray-200"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Titre : {idea.title || "N/A"}
        </h3>
        <p>Contenu : {idea.content || "N/A"}</p>
        <p className="mt-2 font-semibold text-gray-700">Hashtags:</p>
        {renderList(idea.hashtags)}
        <p className="mt-2">Call to Action: {idea.call_to_action || "N/A"}</p>
        <p className="mt-2">
          Idée d'image : {idea.image_idea_description || "N/A"}
        </p>
        <p className="mt-2">Tone: {idea.tone || "N/A"}</p>
      </div>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 bg-gray-50 rounded-lg shadow-md text-left">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Idées de post pour : {content.user_prompt || "N/A"}
      </h2>
      {renderIdeas(content.post_ideas)}
    </div>
  );
};

export default PostIdeasComponent;
