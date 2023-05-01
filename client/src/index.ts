import { TRPCClient, createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@microtrack/backend";

const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "http://localhost:3000",
		}),
	],
});

trpc.rateSingleMeal.query({
	time: "breakfast",
	components: ["cheerios with milk", "watermelon", "water"],
});
