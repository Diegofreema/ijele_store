import { Container } from '@/components/Container';
import { ProductDisplay } from '@/components/ProductDisplay';
import { CustomText } from '@/components/typography';
import { getWomenProducts } from '@/db/queries';
import { Box } from '@chakra-ui/react';

interface Props {}

const page = async ({}) => {
  const women = await getWomenProducts();
  return (
    <Box>
      <Container>
        <CustomText
          text="Women"
          fontSize={40}
          fontWeight={700}
          textColor={'black'}
          mb={10}
        />
      </Container>
      <ProductDisplay title="" products={women} />
    </Box>
  );
};

export default page;
