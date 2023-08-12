import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Heading,
  Flex,
  Center,
  Input,
  Select,
  Tr,
  Th,
  Table,
  Thead,
  Tbody,
  Td,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AddDatafromapi } from "./redux/action";
export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const getChangeValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const postDataOnJson = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("https://energetic-puce-sturgeon.cyclic.app/login", formData)
      .then((res) => {
        console.log(res.data.token);
        if (res.data.token) {
          toast({
            title: `Login Successfully!`,
            status: "success",
            isClosable: true,
          });
          navigate("/dashboard");
        } else {
          toast({
            title: `Login Faild ,invalid credential!`,
            status: "error",
            isClosable: true,
          });
        }
      });
  };
  return (
    <Center
      border={"1px solid black"}
      w="600px"
      margin={"auto"}
      mt="150px"
      p="40px"
    >
      <form>
        <Center>
          {" "}
          <Heading>OLX Classifields Login</Heading>
        </Center>
        <Box m="1rem">
          <Input placeholder="Email" name="email" onChange={getChangeValue} />
        </Box>
        <Box m="1rem">
          <Input
            w="500px"
            margin="auto"
            placeholder="Password"
            name="password"
            type="password"
            onChange={getChangeValue}
          />
        </Box>

        <Box m="1rem">
          <Button bg="blue" color="white" onClick={postDataOnJson}>
            Login
          </Button>
        </Box>
        <Text>
          Don't have an account <Link to="/signup">Singup</Link>{" "}
        </Text>
      </form>
    </Center>
  );
}
