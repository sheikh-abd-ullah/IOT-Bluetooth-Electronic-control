import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
  TextInput,
  ScrollView,
} from "react-native";
import { BLACK, WHITE } from "../Constants/Colors";
import { Images } from "../Constants/Images";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import Loader from "./Loader";

export default function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);


  const navigation = useNavigation();



const handleSignUp = async () => {
  if (password !== confirmPassword) {
    Alert.alert("Passwords do not match");
    return;
  }
  setLoading(true);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    // Sign-up successful
    const user = userCredential.user;
    // console.log("User signed up:", user);
    Alert.alert(
      "Sign-up Successful",
      "Verify email through email we sent you!"
    );
    sendEmailVerification(userCredential.user);
    navigation.navigate("Login");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error signing up:", errorCode, errorMessage);
    Alert.alert("Sign-up Error", errorMessage);
  } finally {
    setLoading(false);
  }
};

  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: WHITE }}>
    <Loader loading={loading} />
      <Image source={Images.header} style={{ width: "100%", height: 285 }} />
      <Text style={styles.text1}>Sign up</Text>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.text2}>Email</Text>
        <TextInput
          placeholder="Enter Your Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={[styles.text2, { marginTop: 30 }]}>Create Password</Text>
        <TextInput
          placeholder="********"
          style={[styles.input, { paddingVertical: 5 }]}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={[styles.text2, { marginTop: 30 }]}>Confirm Password</Text>
        <TextInput
          placeholder="********"
          style={[styles.input, { paddingVertical: 5 }]}
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity onPress={handleSignUp} style={styles.login}>
          <Text
            style={{
              fontFamily: "QuickSand 600",
              fontSize: 18,
              color: WHITE,
              paddingBottom: 5,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontFamily: "QuickSand 600" }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                color: "#FFAD33",
                marginLeft: 5,
                fontFamily: "QuickSand 600",
              }}
            >
              login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

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
  login: {
    backgroundColor: "#FFAD33",
    height: 50,
    alignItems: "center",
    marginTop: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
