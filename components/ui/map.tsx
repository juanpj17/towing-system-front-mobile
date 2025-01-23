import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps"; // Asegúrate de tener esta librería instalada

const OrderMap = ({ origin, destination }) => {
  const { latitude: originLat, longitude: originLng } = origin;
  const { latitude: destLat, longitude: destLng } = destination;
 
  return (
    <View style={styles.mapContainer}>
      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude: originLat,
            longitude: originLng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          <Marker coordinate={{ latitude: originLat, longitude: originLng }} />
          <Marker coordinate={{ latitude: destLat, longitude: destLng }} />
        </MapView>
      </View>
    </View>
  );
 };
 
 const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
    marginVertical: 20,
  },
  mapWrapper: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden'
  },
  map: {
    width: '100%',
    height: '100%'
  }
 });

export default OrderMap;