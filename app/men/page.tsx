import { ProductDisplay } from '@/components/ProductDisplay';
import { CustomText } from '@/components/typography';
import { getMenProducts } from '@/db/queries';

interface Props {}

const page = async ({}) => {
  const men = await getMenProducts();
  return (
    <div className="min-h-screen">
      <CustomText text="Men" fontSize={30} textColor={'black'} mb={10} />
      <ProductDisplay title="" products={men} />
    </div>
  );
};

export default page;
