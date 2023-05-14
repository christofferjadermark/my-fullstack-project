import { useState, useEffect } from "react";
import axios from "axios";



const useFetchUser = (email: any) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
    .get(`http://localhost:8080/users/${email}`)
    .then((response) => {
        setUser(response.data);
      })
  }, []);

  return { user };
};

export default useFetchUser;
