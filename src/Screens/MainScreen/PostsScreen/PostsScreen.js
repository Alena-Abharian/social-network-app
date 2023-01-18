import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { styles } from "./PostsScreen.styled";
import { Feather, EvilIcons } from "@expo/vector-icons";

export const PostsScreen = ({ navigation }) => {
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
  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={{ marginRight: 8, borderRadius: 16 }}
          source={require("../../../assets/images/User.jpg")}
        />
        <View>
          <Text style={{ fontFamily: "Roboto-Medium", fontSize: 13 }}>
            Natali Romanova
          </Text>
          <Text style={{ fontFamily: "Roboto-Regular", fontSize: 11 }}>
            email@example.com
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 32 }}>
        <Image
          source={require("../../../assets/images/rectangle.jpg")}
          style={{ ...styles.photo, width: windowWidth - 16 * 2 }}
        />
        <Text style={styles.photoText}>Лес</Text>
        <View style={styles.linksContainer}>
          <TouchableOpacity
            style={styles.link}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("CommentsScreen");
            }}
          >
            <Feather name="message-circle" size={24} color="#BDBDBD" />
            <Text style={{ ...styles.count, marginLeft: 6 }}>8</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("MapScreen");
            }}
          >
            <Feather name="map-pin" size={24} color="#BDBDBD" />
            <Text style={styles.locationText}>Ukraine</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
