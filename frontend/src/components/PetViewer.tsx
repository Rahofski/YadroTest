// PetViewer.tsx
import { useQuery } from '@tanstack/react-query';
import {
  Box, Text, Spinner, VStack, Heading,
  Icon, Badge, Center, Flex, useClipboard
} from '@chakra-ui/react';
import { useColorModeValue } from "./ui/color-mode";
import { FaDog, FaHeart } from 'react-icons/fa';
import { BASE_URL } from '../App';

type Pet = {
  ascii: string;
  description: string;
};

export const PetViewer = () => {
  const { data, isLoading, error } = useQuery<Pet>({
    queryKey: ['pet'],
    queryFn: async () => {
      const res = await fetch(BASE_URL + '/pet');
      if (!res.ok) throw new Error("Ошибка загрузки");
      return res.json();
    },
    retry: false,
  });

  const { copy } = useClipboard({ value: data?.ascii || "" });
  const accentColor = useColorModeValue("purple.500", "purple.200");
  const cardBg = useColorModeValue("white", "gray.800");

  if (isLoading) return (
    <Center minH="200px">
      <Spinner size="xl" color={accentColor} />
    </Center>
  );

  if (error || !data) return (
    <Center minH="200px" flexDirection="column">
      <Icon as={FaDog} w={12} h={12} color="gray.400" mb={4} />
      <Text color="gray.500" fontSize="lg">Нет данных о питомце</Text>
    </Center>
  );

  return (
    <Box
      p={{ base: 4, md: 8 }}
      borderRadius="2xl"
      bg={cardBg}
      boxShadow="2xl"
      borderWidth="1px"
      borderColor={accentColor}
    >
      <VStack gap={6} align="stretch">
        <Flex align="center" justify="space-between">
          <Heading size="lg" display="flex" alignItems="center">
            <Icon as={FaHeart} color="pink.400" mr={3} />
            {data.description}
          </Heading>
          <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
            ASCII ART
          </Badge>
        </Flex>

        <Box
          p={5}
          bg="gray.900"
          borderRadius="xl"
          border="1px solid"
          borderColor="whiteAlpha.300"
          overflowX="auto"
          cursor="pointer"
          onClick={copy}
          _hover={{ bg: "gray.800" }}
          transition="background 0.2s"
        >
          <Text
            whiteSpace="pre-wrap"
            fontFamily="monospace"
            fontSize="sm"
            color="green.200"
            lineHeight="tall"
          >
            {data.ascii}
          </Text>
        </Box>

        <Text fontSize="sm" color="gray.500" textAlign="center" fontStyle="italic">
          Нажмите на арт, чтобы скопировать
        </Text>
      </VStack>
    </Box>
  );
};
