import { Details } from './_component/Details';
import { getSingleProduct } from '@/db/queries';
import { notFound } from 'next/navigation';

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
  if (!searchParams.id) {
    return notFound();
  }
  const product = await getSingleProduct(+searchParams.id);
  return <Details product={product} />;
};

export default page;
