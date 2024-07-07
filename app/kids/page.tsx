import { Container } from '@/components/Container';
import { ProductDisplay } from '@/components/ProductDisplay';
import { CustomText } from '@/components/typography';
import { getKidsProduct, getMenProducts } from '@/db/queries';
import { Box } from '@chakra-ui/react';

interface Props {}

const page = async ({}) => {
  const children = await getKidsProduct();
  return (
    <Box>
      <Container>
        <CustomText
          text="Children"
          fontSize={40}
          fontWeight={700}
          textColor={'black'}
          mb={10}
        />
      </Container>
      <ProductDisplay title="" products={children} />
    </Box>
  );
};

export default page;
