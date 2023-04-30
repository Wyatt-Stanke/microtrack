import { OpenAI } from "langchain/llms/openai";
import { PromptTemplateInput, PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { z } from "zod";

const model = new OpenAI({ temperature: 0.7 });
const template = `You are a nutritionist. You will see a specific meal for a day and you will rate it out of 5 and give advice on how it could be better, if you gave it a low score. Score the meal based off on healthiness and portion size. Don't be too harsh. The person eating this meal ate it for {meal_time}. On the first line, have your score written in this format: \"x/5\". On the second line, optionally write 1 short sentence about how it could have been better. Below that, write a longer sentence that gives more information about your feedback. Only write the sentences if you have feedback! Do not write any more than that. Here is the meal:
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
	advice: z.string(),
	extendedAdvice: z.string(),
});

export async function rateSingleMeal(params: {
	time: string;
	components: string[];
}): Promise<z.infer<typeof RateSingleMealOutputSchema>> {
	const response = await chain.call({
		meal_string: params.components.join("\n"),
		meal_time: params.time,
	});

	const score = Number(response.output.split("\n")[0]);
	const advice = response.output.split("\n")[1];
	const extendedAdvice = response.output.split("\n")[2];

	return {
		score,
		advice,
		extendedAdvice,
	};
}
