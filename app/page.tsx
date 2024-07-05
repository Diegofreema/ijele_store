import { Wrapper } from '@/components/Wrapper';
import { Landing } from './_component/Landing';

import { getKidsProduct, getMenProducts, getWomenProducts } from '@/db/queries';
import { Sponsor } from '@/components/Sponsors';
import { ProductDisplay } from '@/components/ProductDisplay';

interface Props {}

const page = async () => {
  const menData = getMenProducts();
  const kidsData = getKidsProduct();
  const womenData = getWomenProducts();

  const [men, kids, women] = await Promise.all([menData, kidsData, womenData]);
  return (
    <Wrapper>
      <Landing />
      <Sponsor />
      <div className="mt-5 space-y-10">
        <ProductDisplay title="Men" products={men.slice(0, 5)} />
        <ProductDisplay title="Women" products={women.slice(0, 5)} />
        <ProductDisplay title="Children" products={kids.slice(0, 5)} />
      </div>
    </Wrapper>
  );
};

export default page;
