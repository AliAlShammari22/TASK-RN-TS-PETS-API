import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { postPet } from "@/api/pets";

const AddPet = () => {
  const [name, setName] = useState("");
  const [adopted, setAdopt] = useState(false);
  // const [id, setId] = useState("1");
  // const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const handlecreatepet = async () => {
    // console.log("New pet", { name, adopted, type, image });
    const data = await postPet(name, type, image, adopted);
    console.log(data);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Pet! </Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput placeholder="Description" style={styles.input} />
      <TextInput
        placeholder="Type"
        style={styles.input}
        value={type}
        onChangeText={setType}
      />
      <TextInput
        placeholder="Image"
        style={styles.input}
        value={image}
        onChangeText={setImage}
      />
      <TextInput placeholder="Adopted" style={styles.input} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handlecreatepet();
        }}
      >
        <Text style={styles.buttonText}>Add Pet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 10,
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
