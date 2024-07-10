'use client';
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { colors } from '@/constants';
import { motion } from 'framer-motion';

type Props = {};

export const Landing = ({}: Props): JSX.Element => {
  const bg = useColorModeValue(colors.darkBlue, '#181818');
  return (
    <Box
      minHeight={'100vh'}
      bg={'white'}
      width="100%"
      pt={{ base: 50, md: 50 }}
      display={'flex'}
      alignItems="center"
      position={'relative'}
      justifyContent={'center'}
    >
      <Box position="absolute" top={0} left={0} bottom={0} right={0}>
        <Image
          alt="img"
          src="/hero.png"
          width={'100%'}
          height={'100%'}
          objectFit={'cover'}
        />
      </Box>

      <CaptionText />
    </Box>
  );
};

const CaptionText = () => {
  return (
    <Flex
      as={motion.div}
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5 },
      }}
      viewport={{ once: true }}
      flexDir={'column'}
      alignItems={'center'}
      gap={3}
      zIndex={10}
      mt={{ base: 0, md: -40 }}
    >
      <Heading
        fontSize={{ base: '5xl', md: '7xl' }}
        fontFamily={'var(--font-rubik)'}
        fontWeight={'bold'}
        textColor="white"
        textAlign={'center'}
      >
        Ijele SC Store
      </Heading>
      <Text
        textColor={'#eee'}
        width={{ base: '90%', md: '60%' }}
        fontSize={{ base: 18, md: 20 }}
        textAlign={'center'}
      >
        Shop at Ijele SC store , where you will get quality sport wears at
        affordable prices
      </Text>
    </Flex>
  );
};
