import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "../../utils/axiosClient";
import React from "react";
import { ModalProps, Pet, UpdatedPet } from "../../types/types";
import {
  Pet as PetSchema,
  UpdatedPet as UpdatedPetSchema,
} from "../../schemas/pet.zod";
import FilePicker from "chakra-ui-file-picker";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import TagList from "../misc/TagList";

type EditProps = ModalProps & {
  pet: Pet | undefined;
  refetch: () => void;
};

const EditPet = ({ onClose, isOpen, pet, refetch }: EditProps) => {
  const [updatedPetInfo, setUpdatedPetInfo] = React.useState(pet);
  const [photo, setPhoto] = React.useState<File>();
  const [uploadingPhoto, setUploadingPhoto] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const toast = useToast();
  // autoanimate not working for some reason
  const [parent] = useAutoAnimate<HTMLDivElement>();

  const updatePet = useMutation(
    (data: UpdatedPet) => {
      return axios.put(`/pets/${pet!.id}`, data);
    },
    {
      onSuccess: (response) => {
        toast({
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        refetch();
        onClose();
      },
    }
  );

  const updatePhoto = useMutation(
    (data: FormData) => {
      return axios.post(`/pets/upload`, data);
    },
    {
      onSuccess: (response) => {
        toast({
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  // TODO: combine those two

  const handleDietaryDelete = (key: number) => {
    if (!updatedPetInfo) return;
    const fullTags = [...updatedPetInfo.dietary];
    fullTags.splice(key, 1);
    setUpdatedPetInfo({ ...updatedPetInfo, dietary: fullTags });
  };

  const handleTagDelete = (key: number) => {
    if (!updatedPetInfo) return;
    const fullTags = [...updatedPetInfo.tags];
    fullTags.splice(key, 1);
    setUpdatedPetInfo({ ...updatedPetInfo, tags: fullTags });
  };

  const MIN_TEXTAREA_HEIGHT = 24;

  React.useLayoutEffect(() => {
    if (textareaRef === null || textareaRef.current === null) return;
    textareaRef.current.style.height = "inherit";
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [updatedPetInfo?.bio]);

  const handleEditPet = async () => {
    const result = UpdatedPetSchema.safeParse(updatedPetInfo);
    if (!result.success) {
      // do something to handle the error
      console.log(result.error);
    } else {
      if (uploadingPhoto && photo) {
        const newPhoto = new FormData();
        newPhoto.append("id", pet!.id);
        newPhoto.append("petphoto", photo);
        updatePhoto.mutate(newPhoto);
      }
      updatePet.mutate(result.data);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      {pet && updatedPetInfo && (
        <ModalContent>
          <ModalHeader>
            <Heading size="md" color="brand.Bittersweet">
              Edit a pet: {pet.name}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack align="start" gap={3}>
              <Avatar
                size="2xl"
                bg="brand.RocketMetallic"
                src={pet.picture || ""}
                onClick={() => {
                  setUploadingPhoto(!uploadingPhoto);
                }}
                className="clickable"
              />
              <VStack width="100%">
                <FormControl>
                  <HStack align="baseline">
                    <FormLabel htmlFor="name">Name: </FormLabel>
                    <Input
                      type="text"
                      value={updatedPetInfo.name}
                      name="name"
                      id="name"
                      onChange={(e) =>
                        setUpdatedPetInfo({
                          ...updatedPetInfo,
                          name: e.target.value,
                        })
                      }
                    />
                  </HStack>
                </FormControl>
                <Box ref={parent} width="100%">
                  {uploadingPhoto && (
                    <FormControl isRequired={!pet.picture}>
                      <HStack>
                        <FormLabel htmlFor="picture">New Photo:</FormLabel>
                        <FilePicker
                          onFileChange={(fileList) => {
                            // setInvalid(false);
                            setPhoto(fileList[0]);
                          }}
                          placeholder="choose a .jpg or a .png file"
                          multipleFiles={false}
                          accept="image/*"
                          hideClearButton={true}
                        />
                      </HStack>
                    </FormControl>
                  )}
                </Box>
                <FormControl>
                  <HStack align="baseline">
                    <FormLabel htmlFor="breed">Breed: </FormLabel>
                    <Input
                      type="text"
                      value={updatedPetInfo.breed}
                      name="breed"
                      id="breed"
                      onChange={(e) =>
                        setUpdatedPetInfo({
                          ...updatedPetInfo,
                          breed: e.target.value,
                        })
                      }
                    />
                  </HStack>
                </FormControl>
                <FormControl>
                  <HStack align="baseline">
                    <FormLabel htmlFor="color">Color: </FormLabel>
                    <Input
                      type="text"
                      value={updatedPetInfo.color}
                      name="color"
                      id="color"
                      onChange={(e) =>
                        setUpdatedPetInfo({
                          ...updatedPetInfo,
                          color: e.target.value,
                        })
                      }
                    />
                  </HStack>
                </FormControl>
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
                        value={updatedPetInfo.height}
                        onChange={(e) =>
                          setUpdatedPetInfo({
                            ...updatedPetInfo,
                            height: +e.target.value,
                          })
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
                        value={updatedPetInfo.weight}
                        onChange={(e) =>
                          setUpdatedPetInfo({
                            ...updatedPetInfo,
                            weight: +e.target.value,
                          })
                        }
                      />
                    </HStack>
                  </FormControl>
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
                          setUpdatedPetInfo({
                            ...updatedPetInfo,
                            dietary: [...updatedPetInfo.dietary, tag],
                          });
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                    <TagList
                      tags={updatedPetInfo.dietary}
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
                          setUpdatedPetInfo({
                            ...updatedPetInfo,
                            tags: [...updatedPetInfo.tags, tag],
                          });
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                    <TagList
                      tags={updatedPetInfo.tags}
                      onRemove={handleTagDelete}
                    />
                  </HStack>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <Textarea
                    name="bio"
                    ref={textareaRef}
                    value={updatedPetInfo.bio}
                    placeholder="A bit about the pet's life"
                    onChange={(e) =>
                      setUpdatedPetInfo({
                        ...updatedPetInfo,
                        bio: e.target.value,
                      })
                    }
                    resize="none"
                    sx={{ minHeight: MIN_TEXTAREA_HEIGHT }}
                  />
                </FormControl>
              </VStack>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleEditPet}>Edit Pet</Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default EditPet;
