import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Card from "./ui/card";
import PushNotification from "../context/PushNotification";
import messaging from "@react-native-firebase/messaging";

export async function sendPushNotification() {
    const token = await messaging().getToken();
    if (token) {
        console.log("FCM Token:", token);

        Alert.alert("Notificación enviada", "Esta es tu notificación push");
    }
}


const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dynamicText, setDynamicText] = useState("");
    const message = "Bienvenido Gruero/a";
  
    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < message.length) {
          setDynamicText((prev) => prev + message[index++]);
        } else {
          clearInterval(interval);
        }
      }, 100);
  
      return () => clearInterval(interval);
    }, []);
  
    const handleLogin = () => {
      if (email && password) {
        router.replace("/home");
        sendPushNotification();
      } else {
        Alert.alert("Error", "Por favor, completa todos los campos");
      }
    };
  
    return (
      <View style={styles.container}>
        <Card>
        <Text style={styles.title}>Grúas UCAB</Text>
       
          <Text style={styles.dynamicText}>{dynamicText}</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#B0B0B0"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#B0B0B0"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#171718",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F66021",
    marginBottom: 10,
    textAlign: "center",
  },
  dynamicText: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#FFFFFF",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "90%",
    backgroundColor: "#EAF2F8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#003566",
    borderWidth: 1,
    borderColor: "#003566",
  },
  button: {
    width: "90%",
    backgroundColor: "#F66021",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default Login;
