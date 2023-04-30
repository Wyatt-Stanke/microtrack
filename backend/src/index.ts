import { publicProcedure, router } from "./trpc";
import {
	RateSingleMealInputSchema,
	rateSingleMeal,
} from "./routes/rateSingleMeal";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const appRouter = router({
	rateSingleMeal: publicProcedure
		.input(RateSingleMealInputSchema)
		.query(async (opts) => {
			// @ts-ignore for now
			return await rateSingleMeal(opts);
		}),
});

const httpServer = createHTTPServer({
	router: appRouter,
});
httpServer.listen(3000);

export type AppRouter = typeof appRouter;
