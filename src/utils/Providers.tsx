"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ReactNode, useState } from 'react';
import queryClient from "./QueryClient";

export default function Provider({ children }: { children: ReactNode }) {
  const [queryClientProvider] = useState<QueryClient>(() => queryClient);
  return (
    <QueryClientProvider client={queryClientProvider}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}