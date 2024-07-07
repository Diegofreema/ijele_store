import { getProfile } from '@/db/queries';
import { ProfileDrawer } from './ProfileDrawer';
import { cookies } from 'next/headers';

type Props = {};

export const Profile = async () => {
  const id = cookies().get('id')?.value;

  const user = await getProfile(id!);
  return <ProfileDrawer user={user} />;
};
