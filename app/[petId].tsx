import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextComponent,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { deletePet, getPetsId } from "@/api/pets";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function PetDetails() {
  const { petId } = useLocalSearchParams<{ petId: string }>();

  const { mutate } = useMutation({
    mutationKey: ["deletePet"],
    mutationFn: () => deletePet(petId),
    onSuccess: () => {
      alert("Pet Deleted!");
    },
  });

  const handleDeletePet = () => {
    mutate();
  };

  // const [pet, setPet] = useState<any>(null);
  // const [hasLoaded, setHasLoaded] = useState(false);

  // if (!hasLoaded && petId) {
  //   getPetsId(petId)
  //     .then((data) => setPet(data))
  //     .catch((err) => console.error("Failed to load pet:", err));
  //   setHasLoaded(true);
  // }

  // if (!pet) {
  //   return <Text style={styles.name}>Loading…</Text>;
  // }
  const { data, isLoading } = useQuery({
    queryKey: ["getPetsId"],
    queryFn: () => getPetsId(petId),
  });
  if (isLoading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Image source={{ uri: data.image }} style={styles.image} />
      <Text style={styles.description}>{data.description}</Text>
      <Text style={styles.type}>Type: {data.type}</Text>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleDeletePet}>
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
