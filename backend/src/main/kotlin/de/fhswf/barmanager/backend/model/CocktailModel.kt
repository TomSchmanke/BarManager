package de.fhswf.barmanager.backend.model

data class Cocktail(
    val id: Int,
    val name: String,
    val ingredients: List<CocktailIngredient>
)

data class CocktailIngredient(
    val unitOfMeasurement: MeasurementUnit,
    val ingredientGroup: String,
    val amount: Int
)