use actix_web::{get, web, Result};
mod types;

fn main() {
    println!("Hello, world!");
}


#[get("/rate_single_meal")]
async fn rate_single_meal(ctx: web::Json<RateSingleMealRequest>) -> Result<String> {}
