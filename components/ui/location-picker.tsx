import React from "react";
import { StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

interface LocationPickerProps {
  setLocation: (location: { description: string }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ setLocation }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Escribe tu ubicación"
      onPress={(data) => {
        setLocation(data);
      }}
      query={{
        key: process.env.GOOGLE_API_KEY, 
        language: "es",
        types: "(cities)",
        components: "country:ve",
      }}
      enablePoweredByContainer={false}
      fetchDetails={true}
      minLength={2}
      debounce={300}
      styles={styles}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: "100%",
    zIndex: 1,
  },
  textInput: {
    height: 44,
    backgroundColor: "#1C1C1C",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#FFFFFF",
    marginBottom: 20,
    fontSize: 16,
    width: "100%",
  },
  predefinedPlacesDescription: {
    color: "#FFFFFF",
  },
  description: {
    color: "#FFFFFF",
  },
  row: {
    backgroundColor: "#2C2C2C",
    padding: 13,
    height: 44,
    flexDirection: "row",
  },
  separator: {
    height: 1,
    backgroundColor: "#333",
  },
  listView: {
    backgroundColor: "#2C2C2C",
    borderRadius: 5,
    position: "absolute",
    top: 44,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});

export default LocationPicker;