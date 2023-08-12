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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { AddDatafromapi } from "./redux/action";
export function ModalProduct({ onClose, isOpen, setAddFlag }) {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    location: "",
    postedAt: "",
    category: "",
    price: "",
  });
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
    axios
      .post("https://energetic-puce-sturgeon.cyclic.app/classifieds", formData)
      .then((res) => {
        if (res.data) {
          toast({
            title: `Iteam Posted  Successfully!`,
            status: "success",
            isClosable: true,
          });
          setAddFlag(true);
          dispatch({ type: "post", payload: res?.data?.products });
          console.log(res.data);
          onClose();
        }
      });
  };
  return (
    <>
      {/* <Button bg="blue" color="white" onClick={onOpen}>
        Add Products
      </Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Add Products</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box m="1rem">
              <Input
                placeholder="Product Image"
                name="image"
                onChange={getChangeValue}
              />
            </Box>
            <Box m="1rem">
              <Input
                placeholder="Product Name"
                name="name"
                onChange={getChangeValue}
              />
            </Box>
            <Box m="1rem">
              <Input
                placeholder="Product Description"
                name="description"
                onChange={getChangeValue}
              />
            </Box>

            <Box m="1rem">
              <Input
                placeholder="Location"
                name="location"
                onChange={getChangeValue}
              />
            </Box>
            <Box m="1rem">
              <Input type="date" name="postedAt" onChange={getChangeValue} />
            </Box>

            <Box m="1rem">
              <Select
                placeholder="Category"
                name="category"
                onChange={getChangeValue}
              >
                <option value="clothing">Adidas</option>
                <option value="electronics">nikee</option>
                <option value="furinture">puma</option>
                <option value="other">Other</option>
              </Select>
            </Box>
            <Box m="1rem">
              <Input
                type="number"
                placeholder="Price"
                name="price"
                onChange={getChangeValue}
              />
            </Box>

            <Box m="1rem">
              <Button bg="blue" color="white" onClick={postDataOnJson}>
                Add Product
              </Button>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
