import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Images } from "../Constants/Images";
import { BLACK, WHITE } from "../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig"; // Import from the firebase.js file
import { signInWithEmailAndPassword } from "firebase/auth";
import { set } from "firebase/database";
import Loader from "./Loader";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

const handleLogin = async () => {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        const user = userCredential.user;
        if (!user.emailVerified) {
          Alert.alert(
            "Email not verified",
            "Please verify your email address before logging in."
          );
          return;
        }
        // console.log("User logged in:", user);
        navigation.navigate("Home");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error logging in:", errorCode, errorMessage);
        Alert.alert("Login Error", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    // Rest of the code...
  
  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
    <Loader loading={loading} />
      <Image source={Images.header} style={{ width: "100%", height: 285 }} />
      <Text style={styles.text1}>Login</Text>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.text2}>Email</Text>
        <TextInput
          placeholder="Enter Your Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={[styles.text2, { marginTop: 30 }]}>Password</Text>
        <TextInput
          placeholder="********"
          style={[styles.input, { paddingVertical: 5 }]}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
          <Text
            style={{
              textAlign: "right",
              marginTop: 15,
              fontFamily: "QuickSand 600",
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} style={styles.login}>
          <Text
            style={{
              fontFamily: "QuickSand 600",
              fontSize: 18,
              color: WHITE,
              paddingBottom: 5,
            }}
          >
            Login
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
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                color: "#FFAD33",
                marginLeft: 5,
                fontFamily: "QuickSand 600",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
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

export default Login;
