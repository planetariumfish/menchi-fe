import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  HStack,
  Spacer,
  Checkbox,
  FormHelperText,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import FilePicker from "chakra-ui-file-picker";
import axios from "../../utils/axiosClient";
import React from "react";
import { AnimalType } from "../../types/enums";
import { ModalProps, NewPet } from "../../types/types";
import TagList from "../misc/TagList";
import AnimalButtons from "../pets/AnimalButtons";
import { NewPet as NewPetSchema } from "../../schemas/pet.zod";

const AddPet = ({ isOpen, onClose }: ModalProps) => {
  const [petPic, setPetPic] = React.useState<File | null>();
  const [petInfo, setPetInfo] = React.useState<NewPet>({
    name: "",
    type: AnimalType.DOG,
    breed: "",
    height: 0,
    weight: 0,
    color: "",
    hypoallergenic: false,
    dietary: [],
    tags: [],
    bio: "",
  });
  const [invalid, setInvalid] = React.useState({
    name: false,
    breed: false,
    height: false,
    weight: false,
    color: false,
    picture: false,
  });
  const [addingPic, setAddingPic] = React.useState(false);
  const [petId, setPetId] = React.useState<string>();

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const toast = useToast();

  const addNewPet = useMutation(
    (data: NewPet) => {
      return axios.post("/pets/add", data);
    },
    {
      onSuccess: (response) => {
        setAddingPic(true);
        setPetId(response.data.id);
        toast({
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  const handleAddPet = async () => {
    const result = NewPetSchema.safeParse(petInfo);
    if (!result.success) {
      // do something to handle the error
      console.log(result.error);
    } else {
      addNewPet.mutate(result.data);
    }
  };

  const uploadPic = useMutation(
    (data: FormData) => {
      return axios.post("/pets/upload", data);
    },
    {
      onSuccess: (response) => {
        toast({
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        // reset state before closing modal
        setPetPic(null);
        setAddingPic(false);
        setPetInfo({
          name: "",
          type: AnimalType.DOG,
          breed: "",
          height: 0,
          weight: 0,
          color: "",
          hypoallergenic: false,
          dietary: [],
          tags: [],
          bio: "",
        });
        onClose();
      },
    }
  );

  const handleAddPic = () => {
    if (!petPic) {
      setInvalid({ ...invalid, picture: true });
      return;
    }
    const image = new FormData();
    if (petId) image.append("id", petId);
    image.append("petphoto", petPic);
    uploadPic.mutate(image);
  };

  // TODO: combine those two

  const handleDietaryDelete = (key: number) => {
    const fullTags = [...petInfo.dietary];
    fullTags.splice(key, 1);
    setPetInfo({ ...petInfo, dietary: fullTags });
  };

  const handleTagDelete = (key: number) => {
    const fullTags = [...petInfo.tags];
    fullTags.splice(key, 1);
    setPetInfo({ ...petInfo, tags: fullTags });
  };

  const checkInputs = () => {
    if (!petInfo.name) setInvalid({ ...invalid, name: true });
    if (!petInfo.breed) setInvalid({ ...invalid, breed: true });
    if (!petInfo.color) setInvalid({ ...invalid, color: true });
    if (!petInfo.height) setInvalid({ ...invalid, height: true });
    if (!petInfo.weight) setInvalid({ ...invalid, weight: true });
    for (const key in invalid) {
      if (invalid[key as keyof typeof invalid] === true) return false;
    }
    return true;
  };

  const MIN_TEXTAREA_HEIGHT = 24;

  React.useLayoutEffect(() => {
    if (textareaRef === null || textareaRef.current === null) return;
    textareaRef.current.style.height = "inherit";
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [petInfo.bio]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" color="brand.Bittersweet">
            Add a pet: {petInfo.type}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {addingPic ? (
            <FormControl isRequired>
              <FormLabel htmlFor="picture">Photo</FormLabel>
              <FilePicker
                onFileChange={(fileList) => {
                  // setInvalid(false);
                  setPetPic(fileList[0]);
                }}
                placeholder="choose a .jpg or a .png file"
                multipleFiles={false}
                accept="image/*"
                hideClearButton={true}
              />
            </FormControl>
          ) : (
            <VStack gap={3}>
              <Center width="100%">
                <AnimalButtons
                  onClick={(type) => setPetInfo({ ...petInfo, type })}
                  selected={petInfo.type}
                />
              </Center>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={petInfo.name}
                  onChange={(e) =>
                    setPetInfo({ ...petInfo, name: e.target.value })
                  }
                />
              </FormControl>
              <HStack width="100%">
                {/* TODO someday: change to a dropdown depending on the AnimalType? */}
                <FormControl isRequired>
                  <FormLabel htmlFor="breed">Breed</FormLabel>
                  <Input
                    id="breed"
                    name="breed"
                    type="text"
                    onChange={(e) =>
                      setPetInfo({ ...petInfo, breed: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="color">Color</FormLabel>
                  <Input
                    id="color"
                    name="color"
                    type="text"
                    onChange={(e) =>
                      setPetInfo({ ...petInfo, color: e.target.value })
                    }
                  />
                </FormControl>
              </HStack>
              <HStack width="100%">
                <FormControl isRequired>
                  <HStack>
                    <FormLabel htmlFor="height" mb={0}>
                      Height in cm
                    </FormLabel>
                    <Input
                      type="number"
                      width="7ch"
                      id="height"
                      name="height"
                      placeholder="0"
                      onChange={(e) =>
                        setPetInfo({ ...petInfo, height: +e.target.value })
                      }
                    />
                  </HStack>
                </FormControl>
                <FormControl isRequired>
                  <HStack>
                    <Spacer />
                    <FormLabel htmlFor="weight" mb={0}>
                      Weight in kg
                    </FormLabel>
                    <Input
                      type="number"
                      width="7ch"
                      id="weight"
                      name="weight"
                      placeholder="0"
                      onChange={(e) =>
                        setPetInfo({ ...petInfo, weight: +e.target.value })
                      }
                    />
                  </HStack>
                </FormControl>
              </HStack>
              <HStack align="baseline" width="100%">
                <FormLabel htmlFor="hypoallergenic">Hypoallergenic?</FormLabel>
                <Checkbox
                  colorScheme="yellow"
                  name="hypoallergenic"
                  isChecked={petInfo.hypoallergenic}
                  onChange={(e) =>
                    setPetInfo({
                      ...petInfo,
                      hypoallergenic: e.target.checked,
                    })
                  }
                />
                <Spacer />
              </HStack>
              <FormControl>
                <HStack align="baseline">
                  <FormLabel htmlFor="dietary">
                    Dietary needs or preferences
                  </FormLabel>
                  <Spacer />
                  <FormHelperText>
                    Enter requirements separated by commas
                  </FormHelperText>
                </HStack>
                <HStack>
                  <Input
                    type="text"
                    name="dietary"
                    onKeyDown={(e) => {
                      if (e.currentTarget.value === "" && e.key === " ")
                        e.preventDefault();
                      if (e.key === "," || e.key === "Enter") {
                        e.preventDefault();
                        const tag = e.currentTarget.value;
                        setPetInfo({
                          ...petInfo,
                          dietary: [...petInfo.dietary, tag],
                        });
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <TagList
                    tags={petInfo.dietary}
                    onRemove={handleDietaryDelete}
                  />
                </HStack>
              </FormControl>
              <FormControl>
                <HStack align="baseline">
                  <FormLabel htmlFor="dietary">Tags</FormLabel>
                  <Spacer />
                  <FormHelperText>
                    Enter search tags separated by commas
                  </FormHelperText>
                </HStack>
                <HStack>
                  <Input
                    type="text"
                    name="tags"
                    onKeyDown={(e) => {
                      if (e.currentTarget.value === "" && e.key === " ")
                        e.preventDefault();
                      if (e.key === "," || e.key === "Enter") {
                        e.preventDefault();
                        const tag = e.currentTarget.value;
                        setPetInfo({
                          ...petInfo,
                          tags: [...petInfo.tags, tag],
                        });
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <TagList tags={petInfo.tags} onRemove={handleTagDelete} />
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="bio">Bio</FormLabel>
                <Textarea
                  name="bio"
                  ref={textareaRef}
                  value={petInfo.bio}
                  placeholder="A bit about the pet's life"
                  onChange={(e) =>
                    setPetInfo({ ...petInfo, bio: e.target.value })
                  }
                  resize="none"
                  sx={{ minHeight: MIN_TEXTAREA_HEIGHT }}
                />
              </FormControl>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          {addingPic ? (
            <Button
              isLoading={uploadPic.isLoading}
              onClick={() => {
                handleAddPic();
              }}
            >
              Upload Photo
            </Button>
          ) : (
            <Button
              isLoading={addNewPet.isLoading}
              onClick={() => {
                // if (!checkInputs()) return;
                handleAddPet();
              }}
            >
              Add Pet
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPet;
