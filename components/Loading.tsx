import { Flex, Spinner } from '@chakra-ui/react';

type Props = {};

export const Loading = ({}: Props): JSX.Element => {
  return (
    <Flex minHeight={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <Spinner color="green" size="xl" />
    </Flex>
  );
};
