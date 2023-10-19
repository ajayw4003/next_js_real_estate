import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl,fetchAPi } from '../utils/fetchApi';
import Property from '../components/Property';

const Banner = (props) => { 
  const { purpose, title1, title2, desc1, linkName, buttonText, desc2, imageUrl } = props;
  return (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={400} height={300} alt="Banner" />
    <Box p="5">
      <Text color="gray.500" fontWeight="medium" fontSize="sm">{purpose}</Text>
      <Text  fontWeight="bold" fontSize="3xl">{title1}<br/>{title2}</Text>
      <Text  paddingTop="3" paddingBottom="3" fontSize="lg" color="gray.700">{desc1}<br />{desc2}</Text>
      <Button fontSize="xl" colorScheme='teal'>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)}

export default function Home(props) {
  const { propertyForSale, propertyForRent } = props;
  return(
  <Box>
    <Banner 
      purpose="RENT A HOME" 
      title1="Rental Homes for"
      title2="Everyone"
      desc1="Explore Homes, Villas, Apartments"
      desc2="and more"
      buttonText="Explore Rental Homes"
      linkName="/search?purpose=for-rent"
      imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/185910348/d3bd0023a7d5403b88f822c026569e73"

    />
    <Flex flexWrap="wrap">
      {/* map over properties to display */}
      {propertyForRent.map(property => <Property  property={property} key={property.id} />)}
    </Flex>
    <Banner
      purpose="BUY A HOME" 
      title1="Buy or Own Your"
      title2="Dream Home"
      desc1="Explore Homes, Villas, Apartments"
      desc2="and more"
      buttonText="Explore Homes"
      linkName="/search?purpose=for-buy"
      imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/182658356/fadb84fa4b1446e19e2ce9811e70c543"
    />
    <Flex flexWrap="wrap">
      {/* map over properties to display */}
      {propertyForSale.map(property => <Property  property={property} key={property.id} />)}
    </Flex>
  </Box>
  )
}

export async function getStaticProps() {
  // Data fetching
  const propertyForSale = await fetchAPi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=4`)
  const propertyForRent = await fetchAPi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=4`)

  // here data added in props will be received by page component as props
  return {
    props: {
      propertyForSale: propertyForSale?.hits,
      propertyForRent: propertyForRent?.hits
    }
  }
}