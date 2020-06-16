import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { withNavigation } from "react-navigation";
import ResultsDetail from "./ResultsDetails";

const ResultsList = ({ title, results, navigation }) => {
  /**
   * [INFO] Accepting props "title", "results", "navigation" from "SearchScreen.js"
   */
  // Checking if "results" got data to proceed with, o.w. rest is not executed.
  if (!results.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={{ marginLeft: 15 }}>Results: {results.length}</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false} // [INFO] remove the scroll bar
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          //return <Text> / {item.name}</Text> // [INFO] Display will be formatted at "ResultsDetail.js" and return
          // [INFO] "item" represents each object in "results" props. Refer "objDesc_ResultItem.info.info" for the content(example) of the "item"
          return (
            // [INFO] "TouchableOpacity" is added to navigate to "ResultsShowScreen.js" on touch.
            // [INFO] prop "navigation" is from "SearchScreen.js"
            <TouchableOpacity
              onPress={() =>
                //[INFO] In calling this navigation "navigation" prop is implicitly passed to "ResultsShowScreen.js"
                navigation.navigate("ResultsShow", { id: item.id })
              }
            >
              {/* [INFO] Display will be formatted at "ResultsDetail.js" and return here*/}
              <ResultsDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 2,
  },
  container: {
    marginBottom: 10,
  },
});

/**
 * [INFO] use of "withNavigation"
 * Instead of routing via "SearchScreen.js", "navigation" prop is routed to here "ResultsList.js" directly.
 * Hence the use of "withNavigation"
 * Use of "navigation" prop inside the argument list is still valid
 */
export default withNavigation(ResultsList);
