import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch(url);
        if (!res.ok) {
          throw new Error("could not fetch the data for that resource");
        }
        res = await res.json();
        setData(res);
        setError(null);
      } catch (err) {
        setError("ASDSADASD", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    console.log(data);
  }, []);
  return { data, loading, error };
};
export default useFetch;
