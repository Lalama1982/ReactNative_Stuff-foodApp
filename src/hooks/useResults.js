import { useEffect, useState } from "react";
import yelp from "../api/yelp";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = async (searchTerm) => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "san jose",
        },
      }); // This call equals to "https://api.yelp.com/v3/businesses/search?limit=50"
      setErrorMessage();
      setResults(response.data.businesses); // "businesses" is a branch of json receive from yelp
    } catch (err) {
      console.log("searchApi: ", err);
      setErrorMessage("Error at searchApi");
    }
  };

  // use of "useEffect", makes this call, only once
  useEffect(() => {
    console.log(
      'Running "useEffect": with seach term "pasta as the initial search'
    );
    searchApi("pasta");
  }, []);

  return [searchApi, results, errorMessage];
};
