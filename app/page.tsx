
import Planets from "@/src/components/planets"
import queryClient from "@/src/utils/QueryClient"
import {
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query"

export default async function Home() {
  const dehydratedState = dehydrate(queryClient)

  return (
    <main>
      <HydrationBoundary state={dehydratedState}>
        <Planets />
      </HydrationBoundary>
    </main>
  )
}