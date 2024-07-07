import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const Container = ({ children }: Props): JSX.Element => {
  return (
    <Box
      minHeight={'100vh'}
      width={{ base: '90%', md: '70%' }}
      pt={{ base: 120, md: 150 }}
      mx="auto"
    >
      {children}
    </Box>
  );
};
