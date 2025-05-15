import instance from ".";

const getAllpets = async () => {
  const response = await instance.get("/pets");
  return response.data;
};

const getPetsId = async (id: string) => {
  const response = await instance.get(`/pets/${id}`);
  return response.data;
};

const postPet = async (
  petName: string,
  petType: string,
  petImage: string,
  petAdopt: boolean
) => {
  const response = await instance.post("/pets", {
    name: petName,
    type: petType,
    image: petImage,
    adopted: petAdopt,
  });
  return response.data;
};

export { getAllpets, getPetsId, postPet };
