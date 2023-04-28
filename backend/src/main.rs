mod types;
use actix_web::{get, web, Result};
use async_openai::Client;
use lazy_static::lazy_static;

fn main() {
    println!("Hello, world!");
}

lazy_static! {
    static ref CLIENT: Client = Client::new();
}

#[get("/rate_single_meal")]
async fn rate_single_meal(ctx: web::Json<types::RateSingleMealRequest>) -> Result<String> {
    let meal_string = ctx.components.clone().into_iter().map(|x| format!("- {x}")).collect::<Vec<String>>().join("\n");

    let prompt = format!("You are a nutritionist. You will see a specific meal for a day and you will rate it out of 5 and give advice on how it could be better, if you gave it a low score. Score the meal based off on healthiness and portion size. Don't be too harsh. The person eating this meal is a {ctx.user.age}yo, {ctx.user.weight}lb {ctx.user.gender}, and they ate it for {ctx.meal_time.get_name()}. On the first line, have your score written in this format: \"x/5\". On the second line, optionally write 1 short sentence about how it could have been better. Below that, write a longer sentence that gives more information about your feedback. Only write the sentences if you have feedback! Do not write any more than that. Here is the meal:
{meal_string}");

    Ok(prompt)
}
