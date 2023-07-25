import React, { useState, useEffect } from "react";
import { useOpenAiApi } from "../hooks/useOpenAiApi";
import PersonaComponent from "./PersonaComponent";
import CommunicationMediaComponent from "./CommunicationMediaComponent";
import JobToBeDoneComponent from "./JobToBeDoneComponent";
import PostIdeasComponent from "./PostIdeasComponent";
import LandingPageComponent from "./LandingPageComponent";
import useUserCredits from "../hooks/useUserCredits";
import { auth } from "../firebase";

// Nous définissons les invites système pour chaque zone
const systemPrompts = {
  persona:
    'En tant qu\'expert en marketing et en copywriting avec plus de 20 ans d\'expérience, tu es là pour m\'aider. Je souhaite vendre un produit ou un service. Tu recevras un fichier JSON contenant des détails sur le marketing ainsi que le business de l\'utilisateur. Tu vas générer un nouveau JSON complet pour créer le persona correspondant le mieux au business. Donne-lui un nom, son âge, son genre et sa localisation géographique. Décris ses caractéristiques démographiques telles que sa situation familiale, son niveau d\'éducation et sa profession. Pense également à ses revenus et à son statut socio-économique. Continue ainsi pour remplir entièrement le json. Tout les champs doivent être obligatoirement remplis et en français. Je vais utiliser ce persona comme référence pour créer des campagnes ciblées et personnalisées.  format du json du persona à compléter, rempli tous les champs avec le persona imagné :  {"user_prompt": "", "name": "" "age": null,"gender": "","location": "","marital_status": "","education_level": "","profession": "","income": "","socioeconomic_status": "","interests": [],"hobbies": [],"favorite_activities": [],"information_sources": [],"communication_channels": [],"challenges": [],"motivations": [],"needs": [],"fears": [],"product_service_solution": "","values": [],"beliefs": [],"personality_traits": []}',
  communication_media:
    'En tant qu\'expert en marketing et en copywriting avec plus de 20 ans d\'expérience, tu es là pour m\'aider. Je souhaite vendre un produit ou un service et je cherche des informations sur les médias de communication à utiliser pour atteindre mon audience cible. Tu recevras un fichier JSON contenant des détails sur le marketing ainsi que le business de l\'utilisateur. Tu vas générer un nouveau JSON complet pour fournir des informations sur les médias de communication les plus appropriés pour le business. Remplis les champs suivants avec les médias de communication appropriés pour atteindre efficacement l\'audience cible : format json :{"user_prompt": "","communication_channels": {"main":{"name": "","explaination": ""},"secondary": {"name": "","explaination": ""},},"marketing_message": "","call_to_action_examples": [],}',
  job_to_be_done:
    'En tant qu\'expert en marketing et en copywriting avec plus de 20 ans d\'expérience, tu es là pour m\'aider. Je souhaite vendre un produit ou un service et je cherche des informations sur job to be done pour le business en question. Tu recevras un fichier JSON contenant des détails sur le marketing ainsi que le business de l\'utilisateur. Tu vas générer un nouveau JSON complet pour fournir des informations sur le job to be done le plus approprié pour le business. Remplis les champs suivants avec les infos appropriés au produit ou service vendu pour atteindre efficacement l\'audience cible :format json : {"jobTitle": "Le titre du job à accomplir","jobDescription": "La description détaillée du job à accomplir","functionalNeeds": ["Les besoins fonctionnels associés au job à accomplir"],"emotionalNeeds": ["Les besoins émotionnels associés au job à accomplir"],"socialNeeds": ["Les besoins sociaux associés au job à accomplir"],"desiredOutcomes": ["Les résultats souhaités par les clients lorsqu\'ils accomplissent le job","Cela peut inclure des avantages tangibles et intangibles"],"customerSegment": "Le segment de clientèle concerné par ce job","targetMarket": "Le marché cible pour ce job","competition": "La concurrence existante pour ce job","uniqueValueProposition": "La proposition de valeur unique pour ce job","marketingChannels": ["Les canaux de marketing utilisés pour promouvoir le job","Par exemple : publicité en ligne, médias sociaux, marketing par e-mail, etc."]}',
  post_ideas:
    ' En tant qu\'expert en marketing et en copywriting avec plus de 20 ans d\'expérience, tu es là pour m\'aider. Je souhaite vendre un produit ou un service et je cherche des idées de posts pour les réseaux sociaux. Tu recevras un fichier JSON contenant des détails sur le marketing ainsi que le business de l\'utilisateur. Tu vas générer un nouveau JSON complet pour fournir des idées de posts pour les réseaux sociaux. Remplis les champs suivants avec les idées de posts pour les réseaux sociaux : format json : {"user_prompt": "","post_ideas": [{"title": "", "content": "", "hashtags": [], "call_to_action": "", "image_idea_description": "", tone": ""},]}',
  landing_page:
    'En tant qu\'expert en marketing et en copywriting avec plus de 20 ans d\'expérience, tu es là pour m\'aider. Je souhaite vendre un produit ou un service et je cherche des idées de landing page. Tu recevras un fichier JSON contenant des détails sur le marketing ainsi que le business de l\'utilisateur. Tu vas générer un nouveau JSON complet pour fournir des idées de landing page. Remplis les champs suivants avec les idées de landing page : format json : {"user_prompt": "","landing_page": {"header": "","sections":[{"title": "","content": "","call_to_action": ""},],"footer": {"content": "","call_to_action": ""},}}',
};

const pageTitles = {
  persona: "Persona",
  communication_media: "Médias de communication",
  job_to_be_done: "Job to be done",
  post_ideas: "Idées de posts",
  landing_page: "Landing page",
};

// Nous définissons les composants correspondant à chaque zone
const components = {
  persona: PersonaComponent,
  communication_media: CommunicationMediaComponent,
  job_to_be_done: JobToBeDoneComponent,
  post_ideas: PostIdeasComponent,
  landing_page: LandingPageComponent,
};

const MarketingDetails = ({ gptResponse, selectedCombination }) => {
  const openAiApi = useOpenAiApi();
  const userPrompt = gptResponse.user_prompt;
  const combination = gptResponse.combinations[selectedCombination];
  const [data, setData] = useState({
    userPrompt: userPrompt,
    combination: combination,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Nous initialisons l'état pour chaque zone avec un booléen indiquant si elle est en chargement et le contenu initial
  const [state, setState] = useState({
    persona: { isLoading: false, content: "" },
    communication_media: { isLoading: false, content: "" },
    job_to_be_done: { isLoading: false, content: "" },
    post_ideas: { isLoading: false, content: "" },
    landing_page: { isLoading: false, content: "" },
  });

  const [credits, updateUserCredits] = useUserCredits(user?.uid);
  const [price, setPrice] = useState(20);

  // Lorsque l'utilisateur clique sur le bouton de la zone, nous lançons la requête API avec l'invite système correspondante
  const handleButtonClick = (zone) => {
    const systemPrompt = systemPrompts[zone];
    setState((prev) => ({ ...prev, [zone]: { isLoading: true, content: "" } }));

    if (credits >= price) {
      // Convertir l'objet JSON en une chaîne de caractères
      const dataString = JSON.stringify(data);

      openAiApi
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            { role: "user", content: dataString },
          ],
          max_tokens: 600,
        })
        .then((response) => {
          // Une fois la réponse reçue, nous mettons à jour l'état pour arrêter le chargement et stocker le contenu
          const content = JSON.parse(response.data.choices[0].message.content);
          setState((prev) => ({
            ...prev,
            [zone]: { isLoading: false, content: content },
          }));
          updateUserCredits(credits - price);
        })
        .catch((error) => {
          // En cas d'erreur, nous arrêtons aussi le chargement et affichons l'erreur
          console.error(error);
          setState((prev) => ({
            ...prev,
            [zone]: { isLoading: false, content: "" },
          }));
        });
    } else {
      alert("You don't have enough credits to perform this action.");
    }
  };

  return (
    <div className="flex justify-around w-full">
      {/* Nous générons un composant pour chaque zone en utilisant le contenu actuel et le statut de chargement */}
      {Object.keys(state).map((zone) => {
        const Component = components[zone]; // Obtenir le composant spécifique à cette zone
        const zoneState = state[zone];
        return (
          <div
            key={zone}
            className="mt-8 max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white max-h-[32rem] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4 h-10">
              {pageTitles[zone]}{" "}
            </h2>
            <button
              onClick={() => handleButtonClick(zone)}
              className="mb-4 bg-dark text-white font-bold py-2 px-4 rounded mt-5 hover:bg-light hover:outline-dark hover:border-dark hover:text-dark hover:border-2"
            >
              Générer contenu
            </button>
            {zoneState.isLoading ? (
              <p>Loading...</p>
            ) : (
              <Component content={zoneState.content} /> // Si pas en chargement, on affiche le composant spécifique à cette zone avec le contenu correspondant
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MarketingDetails;
