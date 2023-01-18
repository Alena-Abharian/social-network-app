import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

import { MaterialIcons, Feather } from "@expo/vector-icons";
import { styles } from "./CreatePostsScreen.styled";

const initialState = {
  photoUri: "",
  photoName: "",
  photoLocation: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  const onFormSubmit = () => {
    setState(initialState);
    console.log(state);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        <ScrollView>
          {state.photoUri ? (
            <View>
              <View
                style={{ ...styles.imgHolder, width: windowWidth - 16 * 2 }}
              >
                <Image
                  source={{ uri: state.photoUri }}
                  style={{
                    width: windowWidth - 16 * 2,
                    height: 240,
                    borderRadius: 8,
                  }}
                />
                <TouchableOpacity style={styles.photoBtn} activeOpacity={0.7}>
                  <MaterialIcons name="camera-alt" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>Редактировать фото</Text>
            </View>
          ) : (
            <View>
              <View
                style={{ ...styles.imgHolder, width: windowWidth - 16 * 2 }}
              >
                <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.7}>
                  <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>Загрузите фото</Text>
            </View>
          )}

          <View style={{ marginBottom: 16 }}>
            <TextInput
              style={styles.input}
              placeholder="Название..."
              value={state.photoName}
              onChangeText={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  photoName: value,
                }))
              }
            />

            <View style={styles.locationIcon}>
              <Feather name="map-pin" size={24} color="#BDBDBD" />
            </View>
            <TextInput
              style={{ ...styles.input, paddingLeft: 32 }}
              placeholder="Местность..."
              value={state.photoLocation}
              onChangeText={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  photoLocation: value,
                }))
              }
            />
          </View>
          <View style={styles.screenContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={
                state
                  ? styles.appButtonContainer
                  : {
                      ...styles.appButtonContainer,
                      backgroundColor: "#F6F6F6",
                      color: "#BDBDBD",
                    }
              }
              onPress={onFormSubmit}
            >
              <Text
                style={
                  state
                    ? styles.appButtonText
                    : {
                        ...styles.appButtonText,
                        color: "#BDBDBD",
                      }
                }
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.delContainer}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginTop: 120,
              }}
              activeOpacity={0.7}
            >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
