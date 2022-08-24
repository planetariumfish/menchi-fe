import {
  Button,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import axios from "../../utils/axiosClient";
import FilePicker from "chakra-ui-file-picker";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { ActiveUser } from "../../contexts/contexts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UploadAvatar = ({ isOpen, onClose }: Props) => {
  const { user, refetch } = React.useContext(ActiveUser);
  const [file, setFile] = React.useState<File | null>();
  const [invalid, setInvalid] = React.useState(false);
  const toast = useToast();

  const upload = useMutation(
    (data: FormData) => {
      return axios().post("/users/upload", data);
    },
    {
      onSuccess: (response) => {
        toast({
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setFile(null);
        onClose();
        if (refetch) refetch();
      },
    }
  );

  const handleSubmit = () => {
    if (!file) {
      setInvalid(true);
      return;
    }
    const image = new FormData();
    if (user) image.append("id", user.id);
    image.append("avatar", file);
    upload.mutate(image);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          color="brand.Bittersweet"
          sx={{
            fontFamily: "var(--title-font)",
          }}
        >
          Upload a Photo
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FilePicker
            onFileChange={(fileList) => {
              setInvalid(false);
              setFile(fileList[0]);
            }}
            placeholder="choose a .jpg or a .png file"
            multipleFiles={false}
            accept="image/*"
            hideClearButton={true}
          />
          {invalid && (
            <FormErrorMessage>
              Please choose an image to upload.
            </FormErrorMessage>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} isLoading={upload.isLoading}>
            Upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadAvatar;
