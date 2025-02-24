import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateUser = (update_url) => {
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const { user, dispatch } = useAuthContext();

  const updateUser = async (updateData) => {
    setIsPending(true);
    setError(null);

    console.log("this is the user token in useUpdateUser hook", user.token);

    console.log("this is the updateData in useUpdateUser hook", updateData);  

    const response = await fetch(update_url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updateData }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      dispatch({
        type: "UPDATE_USER",
        payload: { ...json, token: user.token },
      });
      return json;
    }
  };

  return { updateUser, isPending, error };
};
