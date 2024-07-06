import { Details } from './_component/Details';
import { getSimilarProduct, getSingleProduct } from '@/db/queries';
import { notFound } from 'next/navigation';

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
  if (!searchParams.id) {
    return notFound();
  }
  const product = await getSingleProduct(+searchParams.id);
  const similarProduct = await getSimilarProduct(product.category);
  return <Details product={product} similarProduct={similarProduct} />;
};

export default page;
