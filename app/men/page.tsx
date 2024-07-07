import { Container } from '@/components/Container';
import { ProductDisplay } from '@/components/ProductDisplay';
import { CustomText } from '@/components/typography';
import { getMenProducts } from '@/db/queries';
import { Box } from '@chakra-ui/react';

interface Props {}

const page = async ({}) => {
  const men = await getMenProducts();
  return (
    <Box>
      <Container>
        <CustomText
          text="Men"
          fontSize={40}
          fontWeight={700}
          textColor={'black'}
          mb={10}
        />
      </Container>
      <ProductDisplay title="" products={men} />
    </Box>
  );
};

export default page;
