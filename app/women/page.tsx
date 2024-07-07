import { ProductDisplay } from '@/components/ProductDisplay';
import { CustomText } from '@/components/typography';
import { getWomenProducts } from '@/db/queries';

interface Props {}

const page = async ({}) => {
  const women = await getWomenProducts();
  return (
    <div className="min-h-screen">
      <CustomText text="Women" fontSize={30} textColor={'black'} mb={10} />
      <ProductDisplay title="" products={women} />
    </div>
  );
};

export default page;
