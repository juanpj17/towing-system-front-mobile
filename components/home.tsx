import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import StatusSelector from "./ui/status-bar";
import LocationPicker from "./ui/location-picker";
import Card from "./ui/card";
import Footer from "./ui/footer";



const HomeScreen = () => {
  const [status, setStatus] = useState("Activo");
  const [location, setLocation] = useState<{ description: string } | null>(null);

  const handleUpdateData = async() => {
    Alert.alert('Actualización', 'Datos actualizados correctamente');
  };


  return (
    <View style={styles.container}>

      <Text style={styles.headerTitle}>Home</Text>

      <View>
        <Card>
        <Text style={styles.title}>Opciones</Text>

        {/* Selector de estado */}
        <Text style={styles.label}>Estado:</Text>
        <StatusSelector status={status} setStatus={setStatus} />

        {/* Selector de ubicación */}
        <Text style={styles.label}>Ubicación:</Text>
        <LocationPicker setLocation={setLocation} />

        <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdateData}
            >
              <Text style={styles.updateButtonText}>Actualizar datos</Text>
        </TouchableOpacity>
        </Card>
      </View>
      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171718",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#F66021",
    textAlign: "center",
    marginTop: 100,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#F66021",
    marginBottom: 10,
    fontWeight: "600",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F66021",
    marginBottom: 20,
    textAlign: "center",
  },
  updateButton: {
    backgroundColor: "#F66021",
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;