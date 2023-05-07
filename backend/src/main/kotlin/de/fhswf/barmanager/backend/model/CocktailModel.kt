package de.fhswf.barmanager.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("cocktail")
data class Cocktail(
    @Id
    var id: Long? = null,
    var barId: String? = null,
    val name: String,
    val ingredients: List<CocktailIngredient>
)

data class CocktailIngredient(
    val unitOfMeasurement: MeasurementUnit,
    val ingredientGroup: String,
    val amount: Int
)