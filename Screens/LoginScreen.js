import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

import { Input } from "../Components/Input";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPass, onShowPass] = useState(true);
  const [dimensions, setDimension] = useState(
    Dimensions.get("window").width - 16 * 2
  );

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

  const onShow = () => onShowPass((prevShow) => !prevShow);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    setState(initialState);
    console.log(state);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/photo.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View style={styles.box}>
              <Text style={styles.boxTitle}>Войти</Text>

              <View
                style={{
                  ...styles.form,
                  paddingBottom: isShowKeyboard ? 25 : 45,
                  width: dimensions,
                }}
              >
                <Input
                  name="email"
                  view={{ style: { marginTop: 16 } }}
                  placeholder="Адрес электронной почты"
                  state={state.email}
                  setState={setState}
                  setIsShowKeyboard={setIsShowKeyboard}
                />

                <Input
                  name="password"
                  view={{ style: { marginTop: 16 } }}
                  placeholder="Пароль"
                  state={state.password}
                  setState={setState}
                  setIsShowKeyboard={setIsShowKeyboard}
                  secureTextEntry={showPass}
                />

                <TouchableOpacity
                  style={{ position: "absolute", right: 16, top: 99 }}
                  onPress={onShow}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonShow}>Показать</Text>
                </TouchableOpacity>
                {!isShowKeyboard ? (
                  <TouchableOpacity style={styles.btn} onPress={keyboardHide}>
                    <Text activeOpacity={0.8} style={styles.btnTitle}>
                      Войти
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {!isShowKeyboard ? (
                  <TouchableOpacity style={styles.btnSecond}>
                    <Text style={styles.btnSecondTitle}>
                      Нет аккаунта? Зарегистрироваться
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {},
  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 43,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  btnSecond: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondTitle: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  box: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    alignItems: "center",
  },
  boxTitle: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    marginBottom: 32,
  },
  buttonShow: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
