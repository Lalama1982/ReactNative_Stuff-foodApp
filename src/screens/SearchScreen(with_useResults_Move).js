import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
//import yelp from "../api/yelp"; (i) not required after moving code to "useResults.js"
import useResults from '../hooks/useResults';

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();

  /*#1 -- Moving to "useResults.js" file
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
    console.log('Running "useEffect": with seach term "pasta as the initial search');
    searchApi('pasta');
  }, []);
  #1 -- Moving to "useResults.js" file */

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => {
          setTerm(newTerm);
          console.log("onTermChange: term=", term, " newTerm= ", newTerm);
        }}
        //onTermSubmit={() => console.log("Search Term Submitted: ", { term })}
        onTermSubmit={() => searchApi(term)} // info: "onTermSubmit={searchApi} equals onTermSubmit={() => searchApi()}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>Results Count: {results.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
