import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import StatusSelector from "./ui/status-bar";
import LocationPicker from "./ui/location-picker";
import Card from "./ui/card";
import Footer from "./ui/footer";
import { useDriver } from "../context/driver-context";
import { driverServices } from "../services/driver-services";

const HomeScreen = () => {
  const { driver, setDriverData } = useDriver();
  const { UpdateDriverStatus, UpdateDriverLocation } = driverServices()
  const [status, setStatus] = useState(driver?.Status || "Activo");
  const [location, setLocation] = useState<{ description: string } | null>(null);


  useEffect(() => {
    if (driver?.Status) {
      setStatus(driver.Status);
    }
  }, [driver]);


  const handleUpdateData = async () => {
    try {
      const updates = [];
      

      if (location?.description && location.description.trim()) {
        updates.push(
          UpdateDriverLocation(location.description, setDriverData).then(() => {
            setDriverData({ ...driver, Location: location.description });
          })
        );
      }
  
      if (status && status !== driver?.Status) {
        updates.push(
          UpdateDriverStatus(status, setDriverData).then(() => {
            setDriverData({ ...driver, Status: status });
          })
        );
      }
  
      if (updates.length === 0) {
        Alert.alert("Sin cambios", "No hay datos nuevos para actualizar");
        return;
      }
  
      await Promise.all(updates);
      Alert.alert("Actualización", "Datos actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      Alert.alert("Error", "No se pudo actualizar los datos.");
    }
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

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdateData}>
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
