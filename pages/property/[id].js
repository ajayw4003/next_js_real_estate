import { Avatar, Box, Spacer, Flex, Text } from '@chakra-ui/react';
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import { baseUrl,fetchAPi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

const PropertyDetails = (props) => {
  const { propertyDetails : {
    agency,
    isVerified,
    title,
    price,
    rentFrequency,
    area,
    baths,
    rooms,
    type,
    purpose,
    description,
    furnishingStatus,
    amenities,
    photos

  }} = props;

  return(
  <Box maxWidth="1000px" margin="auto" p="4" marginBottom="6">
    {photos && <ImageScrollbar data={photos} />}
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
      <Box marginTop="2">
        <Text fontSize="lg" fontWeight="bold" marginBottom="2">
          {title}
        </Text>
        <Text color="gray.700" lineHeight="8">
          {description}
        </Text>
      </Box>
      <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
        <Flex w="400px" justifyContent="space-between" p="4">
          <Text>Type</Text>
          <Text fontWeight="bold">{type}</Text>
        </Flex>
        <Flex w="400px" justifyContent="space-between" p="4">
          <Text>Purpose</Text>
          <Text fontWeight="bold">{purpose}</Text>
        </Flex>
        {furnishingStatus && (
          <Flex w="400px" justifyContent="space-between" p="4">
          <Text>Furnishing Status</Text>
          <Text fontWeight="bold">{furnishingStatus}</Text>
        </Flex>
        )}
      </Flex>
      <Box marginTop="4">
        {amenities.length && <Text fontWeight="black" fontSize="2xl">Amenities</Text>}
        <Flex flexWrap="wrap">
          {amenities.map(item => (
            item.amenities.map(amenity => (
              <Text 
                fontWeight="bold" 
                bg="blue.50" 
                border="gray" 
                borderColor="gray.400" 
                key={amenity.text}
                margin="2"
                borderRadius="md"
                p="2"
              >
                {amenity.text}
              </Text>
            ))
          ))}
        </Flex>
      </Box>
    </Box>
  </Box>
)}

export default PropertyDetails;

export async function getServerSideProps({ params: { id }}) {
  // Data fetching
  const data = await fetchAPi(`${baseUrl}/properties/detail?externalID=${id}`)

  // here data added in props will be received by page component as props
  return {
    props: {
      propertyDetails: data,
    }
  }
}