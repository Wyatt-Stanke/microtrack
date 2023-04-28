use serde::{Deserialize, Serialize};

#[derive(Deserialize, Clone, Copy)]
pub enum MealTime {
    Breakfast,
    Lunch,
    Dinner,
    Snack,
}

impl MealTime {
    pub fn get_name(self) -> String {
        match self {
            MealTime::Breakfast => "breakfast",
            MealTime::Lunch => "lunch",
            MealTime::Dinner => "dinner",
            MealTime::Snack => "snack",
        }
        .to_owned()
    }
}

#[derive(Deserialize, Clone)]
pub struct RateSingleMealRequest {
    pub meal_time: MealTime,
    pub components: Vec<String>,
    pub user: User,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct User {
    pub age: u32,
    pub weight: u32,
    pub gender: String,
}
