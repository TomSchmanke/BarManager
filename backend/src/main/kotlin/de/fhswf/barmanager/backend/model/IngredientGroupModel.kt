package de.fhswf.barmanager.backend.model

data class IngredientGroup(
    val id: Int,
    val name: Int,
    val unitOfMeasurement: MeasurementUnit,
    val ingredients: List<Ingredient>
)

data class Ingredient(
    val id: Int,
    val name: String,
    val amount: Int,
    val description: String
)