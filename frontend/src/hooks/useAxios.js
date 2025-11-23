import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useFetch = (url, deps = []) => {
  const axios = useAxios();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    axios.get(url).then((res) => {
      if (mounted) setData(res.data);
    }).finally(() => setLoading(false));

    return () => (mounted = false);
  }, deps);

  return { data, loading };
};

export default useFetch;
