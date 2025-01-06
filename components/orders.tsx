import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert, Text } from "react-native";
import Footer from "../components/ui/footer";
import OrderInfoCard from "./ui/info-card";


const Order = () => {
  const orderData = {
    clientName: "Juan Pérez",
    clientPhone: "123-456-7890",
    accidentOrigin: {
      address: "Avenida Principal, Caracas",
    },
    accidentDestination: {
      address: "Taller Los Andes, Maracay",
    },
  };

  const [orderStatus, setOrderStatus] = useState("Localizado");

  const handleUpdateStatus = () => {
    if (orderStatus === "Localizado") {
      setOrderStatus("En progreso");
      Alert.alert("Estado actualizado", 'El estado de la orden ahora es "En progreso".');
    } else if (orderStatus === "En progreso") {
      setOrderStatus("Completado");
      Alert.alert("Estado actualizado", 'El estado de la orden ahora es "Completado".');
    } else {
      Alert.alert("Estado finalizado", 'La orden ya está "Completada".');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Orden Asignada</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <OrderInfoCard
          clientName={orderData.clientName}
          clientPhone={orderData.clientPhone}
          originAddress={orderData.accidentOrigin.address}
          destinationAddress={orderData.accidentDestination.address}
          orderStatus={orderStatus}
          handleUpdateStatus={handleUpdateStatus} 
        />
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#F66021",
    textAlign: "center",
    marginTop: 100,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#171718",
  },
  content: {
    padding: 20,
  },
});

export default Order;

