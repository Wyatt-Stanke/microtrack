import { publicProcedure, router } from "./trpc";
import {
	RateSingleMealInputSchema,
	rateSingleMeal,
} from "./routes/rateSingleMeal";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import pino from "pino";

const logger = pino({
	level: "debug",
});

const appRouter = router({
	rateSingleMeal: publicProcedure
		.input(RateSingleMealInputSchema)
		.query(async (opts) => {
			return await rateSingleMeal(opts.input, logger);
		}),
});

const httpServer = createHTTPServer({
	router: appRouter,
});
logger.info("Server starting on port 3000");
httpServer.listen(3000);

export type AppRouter = typeof appRouter;
