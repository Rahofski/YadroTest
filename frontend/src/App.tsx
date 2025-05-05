// App.tsx
import { Provider } from './components/ui/provider'
import { Box, Heading, VStack } from '@chakra-ui/react'
import { PetForm } from './components/PetForm'
import { PetViewer } from './components/PetViewer'
import { useColorModeValue } from './components/ui/color-mode';

export const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000/v1");

function App() {
  const accentColor = useColorModeValue("purple.500", "purple.300");

  return (
    <Provider>
      <Box
        minH="100vh"
        minW="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg={useColorModeValue("gray.50", "gray.900")}
        px={{ base: 4, md: 10 }}
      >
        <VStack gap={10} maxW="2xl" w="full" align="stretch">
          {/* Общий заголовок */}
          <Heading 
            as="h1" 
            size="xl" 
            textAlign="center" 
            bgGradient={`linear(to-r, ${accentColor}, pink.400)`} 
            bgClip="text"
            color={useColorModeValue("gray.800", "white")}
            py={2}
          >
            ASCII Pet Gallery
          </Heading>
          <VStack gap={8} align="stretch">
            <PetForm />
            <PetViewer />
          </VStack>
        </VStack>
      </Box>
    </Provider>
  );
}

export default App;
