import React from "react";
import { ChangePassword } from "../../types/types";
import { ChangePassword as ChangePasswordSchema } from "../../schemas/user.zod";
import { useMutation } from "@tanstack/react-query";
import axios from "../../utils/axiosClient";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Spacer,
  useToast,
  VStack,
} from "@chakra-ui/react";

type Props = {};

const ChangePasswordForm = (props: Props) => {
  const [passwordChangeInfo, setPasswordChangeInfo] =
    React.useState<ChangePassword>({
      oldpassword: "",
      password: "",
      repassword: "",
    });
  const toast = useToast();

  const changePassword = useMutation(
    (data: ChangePassword) => {
      return axios().put("/users/changepwd", data);
    },
    {
      onSuccess: (response) => {
        setPasswordChangeInfo({
          oldpassword: "",
          password: "",
          repassword: "",
        });
        toast({
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  const handlePasswordChange = async () => {
    const result = ChangePasswordSchema.safeParse(passwordChangeInfo);
    if (!result.success) {
      // do something to handle the error
      // form validation should probably be done here...
      console.log(result.error);
      return false;
    } else {
      changePassword.mutate(result.data);
    }
  };

  return (
    <VStack width="100%" gap={3}>
      <Heading
        size="md"
        color="brand.Bittersweet"
        sx={{
          fontFamily: "var(--title-font)",
        }}
        mb={3}
      >
        Change your password
      </Heading>
      <FormControl>
        <FormLabel htmlFor="currentpassword">Current password</FormLabel>
        <Input
          type="password"
          id="currentpassword"
          name="currentpassword"
          value={passwordChangeInfo?.oldpassword}
          onChange={(e) =>
            setPasswordChangeInfo({
              // some stuff here with typing. Asserting is probably not the right thing to do.
              ...passwordChangeInfo!,
              oldpassword: e.target.value,
            })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="newpassword">New password</FormLabel>
        <Input
          type="password"
          id="newpassword"
          name="newpassword"
          value={passwordChangeInfo?.password}
          onChange={(e) =>
            setPasswordChangeInfo({
              // some stuff here with typing. Asserting is probably not the right thing to do.
              ...passwordChangeInfo!,
              password: e.target.value,
            })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="repassword">Confirm new password</FormLabel>
        <Input
          type="password"
          id="repassword"
          name="repassword"
          value={passwordChangeInfo?.repassword}
          onChange={(e) =>
            setPasswordChangeInfo({
              // some stuff here with typing. Asserting is probably not the right thing to do.
              ...passwordChangeInfo!,
              repassword: e.target.value,
            })
          }
        />
      </FormControl>
      <HStack width="100%">
        <Spacer />
        <Button onClick={handlePasswordChange}>Change password</Button>
      </HStack>
    </VStack>
  );
};

export default ChangePasswordForm;
