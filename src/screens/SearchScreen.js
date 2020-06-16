import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

/**
 * Props example; default
 const SearchScreen = props => {
   console.log(props);
   // shows all the props available from calling function (here it is "App.js")
 }
 * 
 */

// const SearchScreen = ({ navigation }) => { // [INFO] "navigation" prop is not used inside "SearchScreen.js", hence bypassing it to "ResultsList.js"
const SearchScreen = () => {  
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = (price) => {
    // price == '$' / '$$' / '$$$'
    // [INFO] here result set is queries on price and resultent set is sent as whole
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    // [INFO] Instead of a "View" element, an empty element is defined without the complications of a "View" */ <View style={{ flex: 1 }}>
    <>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => {
          setTerm(newTerm);
          console.log("onTermChange: term=", term, " newTerm= ", newTerm);
        }}
        //onTermSubmit={() => console.log("Search Term Submitted: ", { term })}
        onTermSubmit={() => searchApi(term)} // [INFO]  "onTermSubmit={searchApi} equals onTermSubmit={() => searchApi()}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {/*
      // [INFO] Time to hide it.
      <Text style={{ marginLeft: 15 }}>
        Results Count for "{term}" is {results.length}
      </Text>
      */}
      <ScrollView>
        <ResultsList
          results={filterResultsByPrice("$")}
          title="Cost Effective"
          //navigation={navigation} // [INFO] passing "navigation" to the "ResultsList.js". Commented as this "js" does not use it.
        />
        <ResultsList
          results={filterResultsByPrice("$$")}
          title="Bit Pricier"
          //navigation={navigation} // [INFO] passing "navigation" to the "ResultsList.js". Commented as this "js" does not use it.
        />
        <ResultsList
          results={filterResultsByPrice("$$$")}
          title="Big Spender"
          //navigation={navigation} // [INFO] passing "navigation" to the "ResultsList.js". Commented as this "js" does not use it.
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
