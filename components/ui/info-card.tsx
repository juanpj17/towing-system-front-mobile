import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Card from "./card"

interface OrderInfoCardProps {
  clientName: string;
  clientPhone: string;
  originAddress: string;
  destinationAddress: string;
  orderStatus: string;
  handleUpdateStatus: () => void;
}

const OrderInfoCard: React.FC<OrderInfoCardProps> = ({
  clientName,
  clientPhone,
  originAddress,
  destinationAddress,
  orderStatus,
  handleUpdateStatus,
}) => {
  return (
    <View>
      <Card>
      <Text style={styles.label}>Nombre del Cliente:</Text>
      <Text style={styles.value}>{clientName}</Text>

      <Text style={styles.label}>Teléfono:</Text>
      <Text style={styles.value}>{clientPhone}</Text>

      <Text style={styles.label}>Origen del Accidente:</Text>
      <Text style={styles.value}>{originAddress}</Text>

      <Text style={styles.label}>Destino:</Text>
      <Text style={styles.value}>{destinationAddress}</Text>

      <Text style={styles.label}>Estado de la Orden:</Text>
      <Text style={styles.value}>{orderStatus}</Text>
      {/* Botón dentro de la tarjeta */}
      <TouchableOpacity style={styles.button} onPress={handleUpdateStatus}>
        <Text style={styles.buttonText}>Actualizar estado</Text>
      </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F66021",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#F66021",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default OrderInfoCard;