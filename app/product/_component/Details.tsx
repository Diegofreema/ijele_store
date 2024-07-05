'use client';
import { CustomButton } from '@/components/CustomButton';
import { Wrapper } from '@/components/Wrapper';
import { colors } from '@/constants';

import { SelectProduct } from '@/db/schema';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Minus, Plus } from 'lucide-react';

import { useState } from 'react';

type Props = {
  product: SelectProduct;
};

export const Details = ({ product }: Props): JSX.Element => {
  const [qty, setQty] = useState(1);
  const href = product.category.toLowerCase();
  const onIncrease = () => {
    if (qty < +product.numberInStock) {
      setQty((prev) => prev + 1);
    }
  };
  const onDecrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };
  return (
    <Wrapper>
      <Box
        mb={10}
        mt={{ base: 100, md: 150 }}
        width={{ base: '90%', md: '60%' }}
        mx="auto"
      >
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink fontWeight={700} href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/${href}`}
              fontWeight={700}
              textTransform={'capitalize'}
            >
              {product?.category}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              fontWeight={700}
              href=""
              textTransform={'capitalize'}
            >
              {product?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={{ base: 5, md: 10 }}
        width={{ base: '90%', md: '70%' }}
        mx="auto"
        height={'100%'}
      >
        <Box width="100%" borderRadius={10} overflow={'hidden'}>
          <Image
            src={product?.imagePath}
            width="100%"
            height={{ base: 300, md: 500 }}
            objectFit={'cover'}
            alt="img"
          />
        </Box>
        <Box width="100%" height="100%">
          <Heading>{product?.name}</Heading>
          <Text>{product?.description}</Text>
          <Box mt={15}>
            <Text fontSize={25} fontWeight={700}>
              ₦{product?.price}
            </Text>
          </Box>
          <Box mt={30} gap={5} display={'flex'} flexDir={'column'}>
            <Text fontWeight={700}>Quantity</Text>
            <Flex
              bg={colors.darkBlue}
              borderRadius={20}
              gap={4}
              width={120}
              justifyContent={'center'}
              py={2}
            >
              <Minus onClick={onDecrease} color="white" cursor={'pointer'} />
              <Text color="white">{qty}</Text>

              <Plus onClick={onIncrease} color="white" cursor={'pointer'} />
            </Flex>
            <Text fontWeight={700} fontSize={15}>
              {product?.numberInStock} items left in stock
            </Text>
          </Box>
        </Box>
      </SimpleGrid>
    </Wrapper>
  );
};
