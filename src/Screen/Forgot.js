import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";

import { BLACK, WHITE } from "../Constants/Colors";
import { Images } from "../Constants/Images";
// import Sidebar from "../Components/Sidebar";
import { useNavigation } from "@react-navigation/native";
import Loader from "./Loader";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";


export default function Forgot() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
    
const auth = FIREBASE_AUTH;

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth,email);
      Alert.alert(
        "Check your email",
        "If you entered a correct email \n A link to reset your password has been sent to your email address."
      );
        navigation.navigate("Login");
    } catch (error) {
      alert(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <Loader loading={loading} />
      <Image source={Images.header} style={{ width: "100%", height: 285 }} />
      <Text style={styles.text1}>Forgot Password</Text>
      <View style={styles.Container}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.text2}>Email</Text>
          <TextInput
            placeholder="Enter Your Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity onPress={handlePasswordReset} style={styles.login}>
            <Text
              style={{
                fontFamily: "Quicksand Bold",
                fontSize: 18,
                color: WHITE,
                paddingBottom: 5,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          ></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text1: {
    fontFamily: "QuickSand 600",
    fontSize: 48,
    color: WHITE,
    position: "absolute",
    top: 112,
    left: 26,
  },
  text2: {
    fontFamily: "QuickSand 600",
    fontSize: 18,
    marginTop: 43,
  },
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: BLACK,
    paddingTop: 15,
    paddingVertical: 10,
    fontSize: 18,
    fontFamily: "QuickSand 400",
  },

  Container: {
    margin: 20,
  },
  login: {
    backgroundColor: "#FFAD33",
    height: 50,
    alignItems: "center",
    marginTop: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});


