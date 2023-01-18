import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

export const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput>
        <Text>CommentsScreen</Text>
      </TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
