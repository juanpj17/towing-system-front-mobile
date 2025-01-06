import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

interface StatusSelectorProps {
  status: string;
  setStatus: (status: string) => void;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({ status, setStatus }) => {
  const WIDTH = 300;
  const translateX = new Animated.Value(0);

  const changeStatus = (newStatus: string, index: number) => {
    Animated.spring(translateX, {
      toValue: index * (WIDTH / 3),
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
    setStatus(newStatus);
  };

  return (
    <View style={[styles.statusContainer, { width: WIDTH }]}>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ translateX }],
            width: WIDTH / 3,
          },
        ]}
      />
      {["Activo", "Inactivo", "Ocupado"].map((state, index) => (
        <TouchableOpacity
          key={state}
          style={styles.statusButton}
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
  },
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "#F66021",
    borderRadius: 10,
  },
  statusButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  statusText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.7,
  },
  selectedStatus: {
    color: "#FFFFFF",
    opacity: 1,
    fontWeight: "bold",
  },
});

export default StatusSelector;