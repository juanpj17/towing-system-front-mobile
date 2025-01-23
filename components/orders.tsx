import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";
import Footer from "../components/ui/footer";
import OrderInfoCard from "./ui/info-card";
import { useOrder } from "../context/order-context";
import { orderService } from "../services/order-services";
import OrderMap from "./ui/map"; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geocoding'; 
import Geocoder from 'react-native-geocoding';
import configs from "../configs";
import { config } from "dotenv";


Geocoder.init(configs.GOOGLE_API_KEY);  

const Order = () => {
  const { orderData } = useOrder();
  const [orderStatus, setOrderStatus] = useState("Aceptada");
  const { updateOrder } = orderService;

  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  const handleUpdateStatus = () => {
    const statusMapping = {
      "Aceptada": { newStatus: "Localizada", apiStatus: "Located" },
      "Localizada": { newStatus: "En Progreso", apiStatus: "InProgress" },
      "En Progreso": { newStatus: "Completada", apiStatus: "Completada" },
      "Completada": { newStatus: null, apiStatus: "Completed" },
    };

    const currentStatus = statusMapping[orderStatus];

    if (currentStatus) {
      if (orderStatus === "Completada") {
        useOrder().OrderCompleted();
        updateOrder(orderData.Id, currentStatus.apiStatus);
        Alert.alert("La orden ha sido completada");
      } else {
        setOrderStatus(currentStatus.newStatus);
        updateOrder(orderData.Id, currentStatus.apiStatus);
      }
    }
  };

  useEffect(() => {
    if (orderData) {
      const fetchCoordinates = async () => {
        try {
          // Geocodificar la dirección de origen
          const originResponse = await Geocoder.from(orderData.IssueLocation);
          const originLocation = originResponse.results[0]?.geometry.location;
          if (originLocation) {
            setOriginCoords({
              latitude: originLocation.lat,
              longitude: originLocation.lng,
            });
          }

          // Geocodificar la dirección de destino
          const destinationResponse = await Geocoder.from(orderData.Destination);
          const destinationLocation = destinationResponse.results[0]?.geometry.location;
          if (destinationLocation) {
            setDestinationCoords({
              latitude: destinationLocation.lat,
              longitude: destinationLocation.lng,
            });
          }
        } catch (error) {
          console.error("Error geocodificando direcciones:", error);
        }
      };

      fetchCoordinates();
    }
  }, [orderData]);

  if (!orderData) {
    return (
      <View style={styles.noOrderContainer}>
        <Text style={styles.noOrderTitle}>No hay órdenes asignadas</Text>
        <Text style={styles.noOrderSubtitle}>
          Consulta a un operador de cabina o espera a que se te asigne una.
        </Text>
  
        <View style={styles.iconWrapper}>
          <Icon name="playlist-remove" size={100} color="#F66021" />
        </View>
  
        <TouchableOpacity 
          style={styles.noOrderButton}
          onPress={() => Alert.alert('Recargar', 'Aquí podrías enlazar a otra pantalla.')}
        >
          <Text style={styles.noOrderButtonText}>Recargar</Text>
        </TouchableOpacity>
  
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Orden Asignada</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <OrderInfoCard
          clientName={orderData.ClientName}
          clientPhone={orderData.PhoneNumber}
          originAddress={orderData.IssueLocation}
          destinationAddress={orderData.Destination}
          orderStatus={orderStatus}
          handleUpdateStatus={handleUpdateStatus}
        />

        {/* Mostrar mapa solo si tenemos coordenadas de origen y destino */}
        {originCoords && destinationCoords && (
          <OrderMap
            origin={originCoords}
            destination={destinationCoords}
          />
        )}
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
    paddingBottom: 80,
  },

  noOrderContainer: {
    flex: 1,
    backgroundColor: "#171718",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noOrderTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F66021",
    textAlign: "center",
    marginBottom: 10,
  },
  noOrderSubtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  iconWrapper: {
    marginBottom: 30,
    alignItems: "center",
  },
  noOrderImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  noOrderButton: {
    backgroundColor: "#F66021",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  noOrderButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Order;
