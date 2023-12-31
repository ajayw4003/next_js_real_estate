import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from "react-icons/bs";

import SearchFilters from '../components/SearchFilters';
import Property from "../components/Property";
import NoResult from '../assets/images/NoResult.jpg';
import { fetchAPi, baseUrl } from "../utils/fetchApi";

const Search = (props) => {
  const { properties } = props;
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return(
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        p="2"
        borderBottom="1px"
        borderColor="gray.100"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters(prevFilters => !prevFilters)}
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" fontWeight="bold" p="4">
          Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties?.map(property => <Property property={property} key={property.value} />)}
      </Flex>
      {properties?.length === 0 && (
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
          <Box maxW='xs' borderWidth='3px' borderRadius="3xl" overflow='hidden'>
            <Image alt="No result" src={NoResult} />
          </Box>
          <Text color="gray.500" fontSize="2xl" marginTop="3" fontWeight="medium">No Results Found</Text>
        </Flex>
      )}
    </Box>
  )
}

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-sale';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'fetchAPi-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4' 
  // Data fetching
  const data = await fetchAPi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  // here data added in props will be received by page component as props
  return {
    props: {
      properties: data?.hits,
    }
  }
}

export default Search;

