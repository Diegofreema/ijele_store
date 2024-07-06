import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  return <div className="min-h-screen">{children}</div>;
};

export default layout;
