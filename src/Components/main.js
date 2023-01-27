import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { useRoute } from "../router";

import { authStateCahngeUser } from "../redux/auth/authOperations";

export const Main = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateCahngeUser());
  }, []);

  const routing = useRoute(user);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
