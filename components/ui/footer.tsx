import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";

const Footer = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Botón de Home */}
      <TouchableOpacity style={styles.tab} onPress={() => router.push("/home")}>
        <Icon name="home" style={[styles.icon]} />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      {/* Botón de Orders */}
      <TouchableOpacity style={styles.tab} onPress={() => router.push("/orders")}>
        <Icon name="map-marker-alt" style={styles.icon} />
        <Text style={styles.label}>Ordenes</Text>
      </TouchableOpacity>

      {/* Botón de Perfil */}
      <TouchableOpacity style={styles.tab} onPress={() => router.push("/profile")}>
        <Icon name="user" style={styles.icon} />
        <Text style={styles.label}>Perfil</Text>
      </TouchableOpacity>

      {/* Botón para cerrar sesion */}
      <TouchableOpacity style={styles.tab} onPress={() => router.push("/login")}>
        <Icon name="sign-out-alt" style={styles.icon} />
        <Text style={styles.label}>Cerrar Sesion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#171718",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  tab: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    fontSize: 24,
    color: "#FFF5E1",
  },
  label: {
    fontSize: 12,
    color: "#FFF5E1",
    marginTop: 5,
  },
});

export default Footer;
