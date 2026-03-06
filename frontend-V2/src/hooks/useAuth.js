import { useState } from "react";

export default function useAuth() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = async (url, creds) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setIsLoading(false);
        return null;
      }

      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return null;
    }
  };
  
  const login = async (creds) => {
    return await authenticate("/api/users/login", creds);
  };

  const signup = async (creds) => {
    return await authenticate("/api/users/signup", creds);
  };

  return { login, signup, isLoading, error };
}
