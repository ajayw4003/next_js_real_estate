import Link from "next/link";
import Image from "next/image";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import DefaultImage from "../assets/images/DefaultImage.jpg";

const Property = (props) => {
  const {
    property: {
      externalID,
      coverPhoto,
      agency,
      isVerified,
      title,
      price,
      rentFrequency,
      area,
      baths,
      rooms,
    },
  } = props;
  return (
    <Link href={`property/${externalID}`} passHref>
      <Flex
        flexWrap="wrap"
        justifyContent="flex-start"
        width="420px"
        p="5"
        cursor="pointer"
        paddingTop="0"
      >
        <Box>
          <Image
            src={coverPhoto.url ? coverPhoto.url : DefaultImage}
            alt="House"
            width={400}
            height={0}
            style={{ height: "260px" }}
          />
        </Box>
        <Box w="full">
          <Flex
            paddingTop="2"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center">
              <Box paddingRight="3" color="green.400">
                {isVerified && <GoVerified />}
              </Box>
              <Text fontWeight="bold" fontSize="lg">
                USD {millify(price)}
                {rentFrequency && `/${rentFrequency}`}
              </Text>
            </Flex>
            <Box>
              <Avatar size="sm" src={agency?.logo?.url} />
            </Box>
          </Flex>
          <Flex w='250px' alignItems="center" p="1" justifyContent="space-between" color="blue.600">
            {rooms}<FaBed /> | {baths}<FaBath /> | {millify(area)} sqft{" "}<BsGridFill />
          </Flex>
          <Text fontSize="lg">
            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default Property;
