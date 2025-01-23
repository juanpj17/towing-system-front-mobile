import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import configs from "../../configs";

interface LocationPickerProps {
  setLocation: (location: { description: string }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ setLocation }) => {
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualLocation, setManualLocation] = useState("");

  // Manejar cambios en la entrada manual
  const handleManualChange = (text: string) => {
    setManualLocation(text);
    setLocation({ description: text });
  };

  return (
    <View style={autoCompleteStyles.container}>
      {showManualInput ? (
        <TextInput
        style={[autoCompleteStyles.textInput, { height: 60 }]} // Ajusta la altura
        placeholder="Escribe tu ubicación"
        placeholderTextColor="#666"
        value={manualLocation}
        onChangeText={handleManualChange}
        onFocus={() => setShowManualInput(true)}
        multiline={true} // Permite que sea multilinea
        numberOfLines={2} // Muestra 2 líneas visibles
        color="#FFFFFF"
      />
      ) : (
        <GooglePlacesAutocomplete
          placeholder="Buscar ubicación"
          onPress={(data) => {
            setLocation(data);
            setShowManualInput(false);
          }}
          textInputProps={{
            onFocus: () => setShowManualInput(false),
          }}
          query={{
            key: configs.GOOGLE_API_KEY,
            language: "es",
            types: "geocode",
            components: "country:ve",
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          minLength={2}
          debounce={300}
          styles={autoCompleteStyles}
          onFail={(error) => {
            console.error("Error fetching locations:", error);
          }}
          onNotFound={() => {
            console.log("No locations found.");
          }}
        />
      )}
    </View>
  );
};

const autoCompleteStyles = StyleSheet.create({
  container: {
    flex: 0,
    width: "100%",
  },
  textInput: {
    height: 60, // Mayor altura para manejar texto largo
    backgroundColor: "#1C1C1C",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#FFFFFF",
    fontSize: 16,
    width: "100%",
    marginBottom: 20,
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
    maxHeight: 200, // Limita la altura de la lista
  },
  scrollView: {
    flexGrow: 1, // Permite el desplazamiento vertical
  },
});

export default LocationPicker;