import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const useUserCredits = (uid) => {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    if (uid) {
      const getUserCredits = async () => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCredits(docSnap.data().credits);
        }
      };

      getUserCredits();
    }
  }, [uid]);

  const updateUserCredits = async (newCredits) => {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      credits: newCredits,
    });
    setCredits(newCredits);
  };

  return [credits, updateUserCredits];
};

export default useUserCredits;
