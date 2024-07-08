'use client';

import { useEffect, useState } from 'react';

type Props = {};

export const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) return null;

  return <></>;
};
