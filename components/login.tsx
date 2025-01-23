import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Card from "./ui/card";
import { useAuth } from "../services/auth-services"; 
import { driverServices } from '../services/driver-services';
import { useDriver } from "../context/driver-context";



const Login = () => {
    const router = useRouter();
    const { login } = useAuth(); 
    const { driver, setDriverData } = useDriver();
    const { FindDriverById } = driverServices();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [dynamicText, setDynamicText] = useState("");
    const message = "Bienvenido Gruero/a";

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

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

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Por favor, completa todos los campos");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert("Error", "Por favor, ingresa un correo electrónico válido");
            return;
        }

        setLoading(true); 
        try {
            const result = await login(email, password); 
            if (result.success) {
                await FindDriverById(setDriverData)
                router.replace("/home"); 
            } else {
                Alert.alert("Error", result.error || "Credenciales inválidas");
            }
        } catch (error) {
            Alert.alert("Error", error.message || "No se pudo conectar al servidor. Inténtalo de nuevo.");
        } finally {
            setLoading(false); 
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
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#B0B0B0"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    )}
                </TouchableOpacity>
            </Card>
        </View>
    );
};

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
  buttonDisabled: {
    backgroundColor: '#cccccc',
  }
});

export default Login;
