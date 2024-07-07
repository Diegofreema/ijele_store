'use client';

import { useEffect, useState } from 'react';
import { Favorite } from './drawers/Favourite';

type Props = {};

export const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <Favorite />
    </>
  );
};
