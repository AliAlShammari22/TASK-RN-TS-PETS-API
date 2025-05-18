import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import PetItem from "./PetItem";
import { getAllpets } from "@/api/pets";
import { useQuery } from "@tanstack/react-query";

const PetList = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  // const [displayPets, setDisplayPets] = useState<any[]>([]);

  // const handleLoadedPets = async () => {
  //   const data = await getAllpets();
  //   setDisplayPets(data);
  // };

  // if (displayPets.length === 0) {
  //   handleLoadedPets();
  // }

  const { data, isLoading } = useQuery({
    queryKey: ["getallpets"],
    queryFn: () => getAllpets(),
  });
  if (isLoading)
    return (
      <Text
        style={{
          textAlign: "center",
        }}
      >
        Loading...
      </Text>
    );

  const petList = data
    .filter((pet: any) => pet.name.toLowerCase().includes(search.toLowerCase()))
    .filter((pet: any) => pet.type.toLowerCase().includes(type.toLowerCase()))
    .map((pet: any) => (
      <PetItem
        key={pet.id}
        pet={pet}
        setDisplayPets={data}
        displayPets={data}
      />
    ));
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <TextInput
        placeholder="Search for a pet"
        style={styles.searchInput}
        onChangeText={(value) => setSearch(value)}
      />

      {/* Filter by type */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("")}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Cat")}
        >
          <Text>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Dog")}
        >
          <Text>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Rabbit")}
        >
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Pet List */}
      {petList}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
