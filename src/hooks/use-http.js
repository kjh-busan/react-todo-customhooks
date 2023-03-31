import { useState } from "react";

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    // "https://react-http-3d9ed-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json"
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: JSON.stringify(requestConfig.body),
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      // setTasks(loadedTasks);
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return {
    isLoading, // === isLoading: isLoading,
    error, // === error: error,
    sendRequest, // === sendRequest: sendRequest,
  };
};

export default useHttp;
