import React from "react";
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
function SuccessModal({ isOpen, onClose, name }) {
  console.log(name);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={"30px"}> Product Name : {name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading>Product Placed successfully!</Heading>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SuccessModal;
