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
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

import { styles } from "./LoginScreen.styled";

import { Input } from "../../Components/Input";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
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

  const handlerSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    dispatch(authSignInUser(state));
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
              <Text style={styles.boxTitle}>??????????</Text>

              <View
                style={{
                  ...styles.form,
                  paddingBottom: isShowKeyboard ? 15 : 45,
                  width: dimensions,
                }}
              >
                <Input
                  name="email"
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
                  style={{ position: "absolute", right: 16, top: 82 }}
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
                    <Text style={styles.btnTitle}>??????????</Text>
                  </TouchableOpacity>
                ) : null}
                {!isShowKeyboard ? (
                  <TouchableOpacity
                    style={styles.btnSecond}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Registration")}
                  >
                    <Text style={styles.btnSecondTitle}>
                      ?????? ????????????????? ????????????????????????????????????
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
