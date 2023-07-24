import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

function useOpenAiApi() {
  const [openAiApi, setOpenAiApi] = useState(null);

  useEffect(() => {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    setOpenAiApi(openai);
  }, []);

  return openAiApi;
}

export { useOpenAiApi };
