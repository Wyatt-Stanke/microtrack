use serde::Deserialize;use serde::Deserialize;

#[derive(Deserialize)]
enum MealTime {
    Breakfast,
    Lunch,
    Dinner,
    Snack,
}

impl MealTime {
    fn get_name(self) -> String {
        match self {
            MealTime::Breakfast => "breakfast",
            MealTime::Lunch => "lunch",
            MealTime::Dinner => "dinner",
            MealTime::Snack => "snack",
        }
        .to_owned()
    }
}

#[derive(Deserialize)]
struct RateSingleMealRequest {
    meal_time: MealTime,
    components: Vec<String>,
}