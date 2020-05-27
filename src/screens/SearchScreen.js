import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import yelp from "../api/yelp";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
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
