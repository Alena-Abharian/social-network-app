import { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";

import * as ImagePicker from "expo-image-picker";

import { styles } from "./RegistrationScreen.styled";

import AddAvatar from "../../assets/icons/add.svg";

import { Input } from "../../Components/Input";

const initialState = {
  login: "",
  email: "",
  password: "",
  photoUri: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPass, onShowPass] = useState(true);
  const [dimensions, setDimension] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimension(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener?.("change", onChange);
    };
  }, []);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
    });
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  const onShow = () => onShowPass((prevShow) => !prevShow);

  const photoHandel = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setState((prevstate) => ({
        ...prevstate,
        photoUri: result.assets[0].uri,
      }));
    }
  };

  const handlerSubmit = async () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    dispatch(authSignUpUser(state));

    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/photo.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View style={styles.box}>
              <Text style={styles.boxTitle}>??????????????????????</Text>
              <View style={styles.avatar}>
                {state.photoUri && (
                  <Image
                    source={{ uri: state.photoUri }}
                    style={{ width: 120, height: 120, borderRadius: 16 }}
                  />
                )}
                <TouchableOpacity
                  style={styles.avatarBtn}
                  activeOpacity={0.7}
                  accessibilityLabel="add avatar"
                  onPress={photoHandel}
                >
                  <AddAvatar fill={"#FF6C00"} stroke={"#FF6C00"} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  ...styles.form,
                  paddingBottom: isShowKeyboard ? 15 : 45,
                  width: dimensions,
                }}
              >
                <Input
                  name="login"
                  placeholder="??????????"
                  state={state.login}
                  setState={setState}
                  setIsShowKeyboard={setIsShowKeyboard}
                />

                <Input
                  name="email"
                  view={{ style: { marginTop: 16 } }}
                  placeholder="?????????? ?????????????????????? ??????????"
                  state={state.email}
                  setState={setState}
                  setIsShowKeyboard={setIsShowKeyboard}
                />

                <Input
                  name="password"
                  view={{ style: { marginTop: 16 } }}
                  placeholder="????????????"
                  state={state.password}
                  setState={setState}
                  setIsShowKeyboard={setIsShowKeyboard}
                  secureTextEntry={showPass}
                />

                <TouchableOpacity
                  style={{ position: "absolute", right: 16, top: 148 }}
                  onPress={onShow}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonShow}>????????????????</Text>
                </TouchableOpacity>
                {!isShowKeyboard ? (
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.8}
                    onPress={handlerSubmit}
                  >
                    <Text style={styles.btnTitle}>????????????????????????????????????</Text>
                  </TouchableOpacity>
                ) : null}
                {!isShowKeyboard ? (
                  <TouchableOpacity
                    style={styles.btnSecond}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.btnSecondTitle}>
                      ?????? ???????? ??????????????? ??????????
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
