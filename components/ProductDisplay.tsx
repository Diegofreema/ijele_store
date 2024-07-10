'use client';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { MyText } from './MyText';
import { SelectProduct } from '@/db/schema';
import { Link } from 'next-view-transitions';
import { formatText } from '@/lib/helper';
import { CustomButton } from './CustomButton';

import { ShoppingCart } from 'lucide-react';
import { useCart, useRemoveCart } from '@/hooks/useCart';
import { useIsInCart } from '@/hooks/useGetCart';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
  products: Array<SelectProduct>;
};

export const ProductDisplay = ({ title, products }: Props): JSX.Element => {
  const href =
    title === 'Men' ? '/men' : title === 'Women' ? '/women' : '/children';
  return (
    <Box
      height={'auto'}
      py={{ base: 50, md: 100 }}
      width={{ base: '90%', md: '70%' }}
      mx="auto"
    >
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <MyText
          text={title}
          mb={10}
          fontSize={{ base: 25, md: 35 }}
          fontWeight={700}
        />
        {products.length > 5 && (
          <Link className="text-green-400 font-bold" href={href}>
            See more
          </Link>
        )}
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </SimpleGrid>
      {!products.length && (
        <MyText
          text="Coming soon"
          mt={15}
          textAlign={'center'}
          fontSize={{ base: 20, md: 30 }}
          fontWeight={700}
        />
      )}
    </Box>
  );
};

const ProductCard = ({
  category,
  id,
  imagePath,
  name,
  price,
  description,
}: SelectProduct) => {
  const { handleAddToCart, isLoading } = useCart(id);
  const { handleRemoveFromCart, isRemoving } = useRemoveCart(id);
  const { inCart, loading, fn } = useIsInCart(id);
  const router = useRouter();

  const btnText = inCart ? 'Remove' : 'Add';
  const onLoading = isLoading || loading || isRemoving;
  const handleClick = () => {
    if (inCart) {
      handleRemoveFromCart();
      fn();
    } else {
      handleAddToCart();
      fn();
    }
  };
  return (
    <Card minHeight={400} overflow="hidden">
      <Link href={`/product?id=${id}`} passHref>
        <Image
          alt="image"
          src={imagePath}
          width={'100%'}
          height={200}
          objectFit={'cover'}
          fallbackSrc="https://via.placeholder.com/150"
        />
        <CardBody bg="white">
          <Flex alignItems={'center'} justifyContent={'space-between'} mb={15}>
            <Text fontWeight={'bold'} fontSize={'sm'} textColor={'black'}>
              {name}
            </Text>
            <Text fontWeight={'bold'} fontSize={'sm'} textColor={'black'}>
              Price: ₦{price}
            </Text>
          </Flex>

          <Text fontWeight={'bold'} fontSize={'md'} mt={5} textColor={'black'}>
            {formatText(description)}
          </Text>
        </CardBody>
      </Link>
      <CardFooter bg="white" justifyContent={'space-between'}>
        <CustomButton
          leftIcon={<ShoppingCart color="black" />}
          isLoading={onLoading}
          isDisabled={onLoading}
          title={btnText}
          color="black"
          onClick={handleClick}
          bg={'transparent'}
          borderRadius={20}
          borderWidth={1}
          borderColor={'black'}
        />
      </CardFooter>
    </Card>
  );
};
