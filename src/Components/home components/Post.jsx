import React, { useEffect } from "react";
import axios from "axios";
import SuccessModal from "./SuccessModal";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Stack,
  Image,
  Text,
  useSafeLayoutEffect,
  Grid,
  GridItem,
  Center,
  useDisclosure,
  Input,
  useToast,
  Spinner,
  Skeleton,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { setAllPostFData } from "../redux/action";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { ModalProduct } from "./AddProductModal";
import { useNavigate } from "react-router-dom";
function Post(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const dat = useSelector((state) => {
    return state;
  });
  const username = useSelector((state) => {
    return state;
  });
  console.log(username, "usser");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [query, setQuery] = useState("");
  const [addFlag, setAddFlag] = useState(false);
  console.log(dat);
  const userName = localStorage.getItem("username");
  const toast = useToast();
  useEffect(() => {
    axios
      .get("https://energetic-puce-sturgeon.cyclic.app/classifieds")
      .then((res) => {
        console.log(res?.data?.products);
        // setAllPostFData(res?.data?.products);
        dispatch({ type: "post", payload: res?.data?.products });
        setData(res?.data?.products);
        setFlag(false);
        setAddFlag(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [flag, query, addFlag]);

  const getSearch = () => {
    // const apiUrl = "https://tame-red-snail-ring.cyclic.app/classifieds";
    // const searchUrl = query
    //   ? `${apiUrl}?search=${encodeURIComponent(query)}`
    //   : apiUrl;

    // axios
    //   .get(searchUrl)
    //   .then((res) => {
    //     dispatch({ type: "post", payload: res?.data?.products });
    //     setData(res?.data?.products);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching search results:", error);
    //   });

    axios
      .get(
        `https://energetic-puce-sturgeon.cyclic.app/classifieds?search=${query}`
      )
      .then((res) => {
        dispatch({ type: "post", payload: res?.data?.products });
        setData(res?.data?.products);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  const deletData = (id) => {
    axios
      .delete(`https://energetic-puce-sturgeon.cyclic.app/classifieds/${id}`)
      .then((res) => {
        if (res.data) {
          setFlag(true);
          // toast({
          //   title: `Iteam deleted  Successfully!`,
          //   status: "success",
          //   isClosable: true,
          // });
        }
        // dispatch({ type: "post", payload: res?.data?.products });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getSearch();
  }, []);
  return (
    <Box>
      <Flex
        bg="black"
        color="white"
        padding={"20px"}
        alignItems={"center"}
        justify={"center"}
      >
        <Heading mr="150px">OLX Classifields Dashboard</Heading>
        <Text fontSize={"1.5rem"} ml="500px">
          Admin : {userName}
        </Text>
        {/* </Center> */}
      </Flex>
      <Flex justifyContent={"start"}>
        <Button m="2rem" onClick={onOpen}>
          Add Products
        </Button>
        <Button
          m="2rem"
          onClick={() => {
            localStorage.clear("username");
            navigate("/");
          }}
        >
          Log out
        </Button>
        <Box>
          <Input
            w="500px"
            margin={"auto"}
            mb="20px"
            ml="20px"
            mt="34px"
            type="search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="search products"
          />

          <Button ml="20px" mb="4px" onClick={getSearch}>
            Search{" "}
          </Button>
        </Box>
      </Flex>

      <ModalProduct isOpen={isOpen} onClose={onClose} setAddFlag={setAddFlag} />
      <Grid templateColumns="repeat(3, 1fr)" ml="40px" gap={6}>
        {dat?.post?.length > 0 ? (
          dat?.post?.map((elm) => {
            return (
              <GridItem>
                <Card maxW="sm">
                  <CardBody>
                    <Image
                      w="100%"
                      h="100%"
                      src={elm.image}
                      alt="Green double couch with wooden legs"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">Title : {elm.name}</Heading>
                      <Text>Description: {elm.description}</Text>

                      <Text>Location : {elm.location}</Text>
                      <Text>Posted on: {elm.postedAt}</Text>
                      <Text color="blue.600" fontSize="2xl">
                        Price : ₹ {elm.price}
                      </Text>

                      <Text color="blue.600" fontSize="2xl"></Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        onClick={() => {
                          openModal();
                          deletData(elm._id);
                        }}
                      >
                        Buy now
                      </Button>
                      <SuccessModal
                        isOpen={modalOpen}
                        onClose={closeModal}
                        name={elm.name}
                      />
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </GridItem>
            );
          })
        ) : (
          // <Center>
          //   <Heading ml="600px" mt="100px">
          //     <Spinner
          //       thickness="80px"
          //       speed="0.65s"
          //       emptyColor="gray.200"
          //       color="blue.500"
          //       size="xl"
          //     />
          //   </Heading>
          // </Center>
          <Center ml="10px">
            <Flex templateColumns="repeat(3, 1fr)" gap={6}>
              {/* <GridItem> */}
              <Skeleton w="400px" h="400px">
                <div>contents wrapped</div>
                <div>won't be visible</div>
              </Skeleton>
              <Skeleton w="400px" h="400px">
                <div>contents wrapped</div>
                <div>won't be visible</div>
              </Skeleton>
              <Skeleton w="400px" h="400px">
                <div>contents wrapped</div>
                <div>won't be visible</div>
              </Skeleton>
              {/* </GridItem> */}
            </Flex>
          </Center>
        )}
      </Grid>

      {/* 
      <Center>
        <Flex>
          <Button>Previous</Button>
          <Button>0</Button>
          <Button>Next</Button>
        </Flex>
      </Center> */}
    </Box>
  );
}

export default Post;
