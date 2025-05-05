import { useState } from "react";
import {
  Box, Button, Textarea, Input, VStack,
  Heading, Icon, Flex, Text
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCat } from "react-icons/fa";
import { BASE_URL } from "../App";
import { useColorModeValue } from "./ui/color-mode";

export const PetForm = () => {
  const [ascii, setAscii] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const queryClient = useQueryClient();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const accentColor = useColorModeValue("purple.500", "purple.300");
  const inputBg = useColorModeValue("white", "gray.800");

  const PutMutation = useMutation({
    mutationFn: async ({ ascii, description }: { ascii: string; description: string }) => {
      const res = await fetch(BASE_URL + '/pet', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ascii, description }),
      });
      if (!res.ok) throw new Error("Ошибка сохранения");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pet"] });
      setAscii("");
      setDescription("");
      setMessage("Питомец успешно сохранён!");
      setMessageType("success");
    },
    onError: (error: Error) => {
      setMessage(error.message || "Произошла ошибка");
      setMessageType("error");
    },
  });

  const handlePut = async () => {
    if (!ascii.trim() || !description.trim()) {
      setMessage("Заполните все поля");
      setMessageType("error");
      return;
    }
    await PutMutation.mutateAsync({ ascii, description });
  };

  return (
    <Box
      p={{ base: 4, md: 8 }}
      borderRadius="2xl"
      bg={bgColor}
      boxShadow="2xl"
      borderWidth="1px"
      borderColor={accentColor}
    >
      <Flex align="center" mb={6}>
        <Icon as={FaCat} w={10} h={10} color={accentColor} mr={4} />
        <Heading size="lg" bgGradient={`linear(to-r, ${accentColor}, pink.400)`} bgClip="text">
          Создай своего ASCII-питомца
        </Heading>
      </Flex>

      <VStack gap={5}>
        <Textarea
          placeholder="Вставь ASCII-арт своего питомца..."
          value={ascii}
          onChange={(e) => setAscii(e.target.value)}
          fontFamily="monospace"
          minH="200px"
          bg={inputBg}
          borderRadius="xl"
          fontSize="sm"
          border="2px solid"
          borderColor="gray.300"
          _focus={{ borderColor: accentColor }}
        />

        <Input
          placeholder="Дайте имя или описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          bg={inputBg}
          borderRadius="xl"
          border="2px solid"
          borderColor="gray.300"
          _focus={{ borderColor: accentColor }}
        />

        <Button
          onClick={handlePut}
          loading={PutMutation.isPending}
          disabled={!ascii.trim() || !description.trim()}
          size="lg"
          px={10}
          color="orange.500"
          colorScheme="purple"
          borderRadius="full"
          transition="all 0.3s ease"
          _hover={{ transform: "scale(1.03)", boxShadow: "lg" }}
        >
          Сохранить питомца
        </Button>

        {message && (
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={messageType === "success" ? "green.400" : "red.400"}
            textAlign="center"
            mt={2}
            transition="opacity 0.3s"
          >
            {message}
          </Text>
        )}
      </VStack>
    </Box>
  );
};
