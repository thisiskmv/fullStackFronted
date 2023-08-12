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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { AddDatafromapi } from "./redux/action";
export function Signup({ onClose, isOpen }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const data = useSelector((state) => {
    return state;
  });
  console.log(data, "jj");
  const getChangeValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const toast = useToast();
  const postDataOnJson = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch({ type: "username", payload: formData });
    localStorage.setItem("username", formData.username);
    axios
      .post("https://energetic-puce-sturgeon.cyclic.app/signup", formData)
      .then((res) => {
        console.log(res.data);

        if (res.data) {
          toast({
            title: `Singup  Successfully!`,
            status: "success",
            isClosable: true,
          });
          navigate("/");
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
          <Heading>OLX Classifields Singup</Heading>
        </Center>
        <Box m="1rem">
          <Input
            w="500px"
            margin="auto"
            placeholder="Username"
            name="username"
            onChange={getChangeValue}
          />
        </Box>
        <Box m="1rem">
          <Input placeholder="Email" name="email" onChange={getChangeValue} />
        </Box>
        <Box m="1rem">
          <Input
            placeholder="Password"
            name="password"
            type="password"
            onChange={getChangeValue}
          />
        </Box>

        <Box m="1rem">
          <Button
            bg="blue"
            color="white"
            onClick={postDataOnJson}
            onClose={onClose}
          >
            Signup
          </Button>
        </Box>
        <Text>
          Allready have an account <Link to="/">Login</Link>{" "}
        </Text>
      </form>
    </Center>
  );
}
