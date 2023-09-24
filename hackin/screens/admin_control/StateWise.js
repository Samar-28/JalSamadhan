import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Context from "../../ContextAPI";

function StateWise({ navigation }) {
  const { stateAndUTData } = useContext(Context);
  return (
    <View style={styles.container}>
      <FlatList
        data={stateAndUTData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.stateItem}
            onPress={() =>
              navigation.navigate("ComplaintPosts", { name: item.name })
            }
          >
            <Text style={styles.stateName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  stateItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  stateName: {
    fontSize: 16,
  },
});

export default StateWise;
