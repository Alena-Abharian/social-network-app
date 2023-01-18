import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

export const MapScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput>
        <Text>MapScreen</Text>
      </TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
