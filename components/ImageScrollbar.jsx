import { useContext } from "react";
import Image from 'next/image'
import { Box, IconButton, Flex  } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import 'react-horizontal-scrolling-menu/dist/styles.css';

const LeftArrow = () => {
  const { scrollPrev, isFirstItemVisible } = useContext(VisibilityContext);

  return(
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <IconButton
        onClick={() => scrollPrev()}
        colorScheme='blue'
        aria-label='Search database'
        icon={<FaArrowAltCircleLeft />}
        isDisabled={isFirstItemVisible}
        cursor={`${isFirstItemVisible ? '' : 'pointer'}`}
        isRound={true}
        variant='solid'
      />
    </Flex>
  )
}

const RightArrow = () => {
  const { scrollNext, isLastItemVisible } = useContext(VisibilityContext);

  return(
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <IconButton
        onClick={() => scrollNext()}
        colorScheme='blue'
        aria-label='Search database'
        icon={<FaArrowAltCircleRight />}
        isDisabled={isLastItemVisible}
        cursor={`${isLastItemVisible ? '' : 'pointer'}`}
        isRound={true}
        variant='solid'
      />
    </Flex>
  )
}

const ImageScrollbar = (props) => {
  const { data } = props;
  return(
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{overFlow: 'hidden'}} >
      {data.map(item => (
        <Box width="910px" key={item.id} itemID={item.id} overflow="hidden" p="1">
          <Image 
          placeholder="blur"
          blurDataURL={item.url}
          src={item.url}
          alt="Property"
          width={1000}
          height={0}
          style={{
            height:"500px"
          }}
          sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
        />
        </Box>
      ))}
    </ScrollMenu>
  )
}

export default ImageScrollbar;