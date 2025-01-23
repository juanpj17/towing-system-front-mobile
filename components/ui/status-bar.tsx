import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useDriver } from "../../context/driver-context";
interface StatusSelectorProps {
  status: string;
  setStatus: (status: string) => void;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({ status, setStatus }) => {
  const WIDTH = 300;
  const translateX = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
    const { driver } = useDriver();
  
  // Estados disponibles
  const states = ["Active", "Inactive", "Occupied"];
  
  // Inicializar la posición basada en el estado actual
  useEffect(() => {
    const currentIndex = states.indexOf(driver.Status);
    if (currentIndex !== -1) {
      translateX.setValue(currentIndex * (WIDTH / 3));
    }
  }, []);

  const getStatusColor = (state: string) => {
    switch (state) {
      case "Activo":
        return "#4CAF50";
      case "Inactivo":
        return "#F44336";
      case "Ocupado":
        return "#FFC107";
      default:
        return "#F66021";
    }
  };

  const animateToStatus = (currentIndex: number, targetIndex: number) => {
    const distance = targetIndex - currentIndex;
    const duration = Math.abs(distance) * 200; // Duración basada en la distancia

    Animated.spring(translateX, {
      toValue: targetIndex * (WIDTH / 3),
      useNativeDriver: true,
      friction: 8,
      tension: 40,
      velocity: distance * 2, // Velocidad basada en la dirección
    }).start();
  };

  const changeStatus = (newStatus: string, newIndex: number) => {
    const currentIndex = states.indexOf(status);
    animateToStatus(currentIndex, newIndex);
    setStatus(newStatus);
  };

  const backgroundColor = useRef(getStatusColor(status)).current;

  return (
    <View style={[styles.statusContainer, { width: WIDTH }]}>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ translateX }],
            width: WIDTH / 3,
            backgroundColor: getStatusColor(status),
          },
        ]}
      />
      {states.map((state, index) => (
        <TouchableOpacity
          key={state}
          style={[
            styles.statusButton,
            status === state && styles.activeStatusButton,
          ]}
          onPress={() => changeStatus(state, index)}
        >
          <Text
            style={[
              styles.statusText,
              status === state && styles.selectedStatus,
            ]}
          >
            {state}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    borderRadius: 10,
    position: "relative",
    marginBottom: 20,
    height: 50,
    alignSelf: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  indicator: {
    position: "absolute",
    top: 2,
    bottom: 2,
    margin: 2,
    borderRadius: 8,
    opacity: 0.9,
  },
  statusButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    height: "100%",
  },
  activeStatusButton: {
    transform: [{ scale: 1.05 }],
  },
  statusText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.7,
    fontWeight: "500",
  },
  selectedStatus: {
    color: "#FFFFFF",
    opacity: 1,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default StatusSelector;