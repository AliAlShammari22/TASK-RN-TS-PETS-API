import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getPetsId } from "@/api/pets";

interface PetList {
  name: string;
}

export default function PetDetails() {
  const { petId } = useLocalSearchParams<{ petId: string }>();

  const [pet, setPet] = useState<PetList[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  if (!hasLoaded && petId) {
    getPetsId(petId)
      .then((data) => setPet(data))
      .catch((err) => console.error("Failed to load pet:", err));
    setHasLoaded(true);
  }

  if (!pet) {
    return <Text style={styles.name}>Loading…</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>
      <Image source={{ uri: pet.image }} style={styles.image} />
      <Text style={styles.description}>{pet.description}</Text>
      <Text style={styles.type}>Type: {pet.type}</Text>

      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
