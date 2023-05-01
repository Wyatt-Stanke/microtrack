import { OpenAI } from "langchain/llms/openai";
import { PromptTemplateInput, PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { z } from "zod";
import { Logger } from "pino";

const model = new OpenAI({ temperature: 0.7 });
const template = `You are a nutritionist. You will see a specific meal for a day and you will rate it out of 5 (accurate to 1 decimal place) and give advice on how it could be better or how good it was. Score the meal based off on healthiness and portion size. Don't be too harsh. The person eating this meal ate it for {meal_time}. On the first line, have your score written in this format: \"x/5\". On the second line, optionally write 1 short sentence about how it could have been better. Do not write any more or less than that. Here is the meal:
{meal_string}`;
const prompt = new PromptTemplate({
	template,
	inputVariables: ["meal_string", "meal_time"],
});
const chain = new LLMChain({
	llm: model,
	prompt,
});

export const RateSingleMealInputSchema = z.object({
	time: z.string(),
	components: z.array(z.string()),
});

export const RateSingleMealOutputSchema = z.object({
	score: z.number(),
	scoreUpperBound: z.number(),
	advice: z.string(),
});

export async function rateSingleMeal(
	params: {
		time: string;
		components: string[];
	},
	log: Logger,
): Promise<z.infer<typeof RateSingleMealOutputSchema>> {
	log.info("rateSingleMeal - Rating single meal %o", params);

	const response = await chain.call({
		meal_string: params.components.join("\n"),
		meal_time: params.time,
	});

	response.output = response.output.replace(/^\n+/, "");

	log.info("rateSingleMeal - Response received %o", response);

	const score = Number(response.output.split("\n")[0].split("/")[0]);
	const scoreUpperBound = Number(response.output.split("\n")[0].split("/")[1]);
	const advice = response.output.split("\n")[1];

	return {
		score,
		scoreUpperBound,
		advice,
	};
}
