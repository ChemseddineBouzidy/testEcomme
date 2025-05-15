import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "../global.css";

const queryClient = new QueryClient();


export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="Products" options={{ title: "Products", headerShown: false }} />
      <Stack.Screen name="ProductDetails/[id]" options={{ title: "Product Details", headerShown: false }} />
    </Stack>
    </QueryClientProvider>
  );
}
