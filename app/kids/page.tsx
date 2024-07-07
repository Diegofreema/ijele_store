import { ProductDisplay } from '@/components/ProductDisplay';
import { CustomText } from '@/components/typography';
import { getKidsProduct, getMenProducts } from '@/db/queries';

interface Props {}

const page = async ({}) => {
  const children = await getKidsProduct();
  return (
    <div className="min-h-screen">
      <CustomText text="Children" fontSize={30} textColor={'black'} mb={10} />
      <ProductDisplay title="" products={children} />
    </div>
  );
};

export default page;
