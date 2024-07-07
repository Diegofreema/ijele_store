import { EditForm } from './_component/EditForm';
import { getProfile } from '@/db/queries';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: { id?: string } }) => {
  if (!params?.id) {
    return notFound();
  }
  const user = await getProfile(params.id);
  return <EditForm user={user} />;
};

export default page;
