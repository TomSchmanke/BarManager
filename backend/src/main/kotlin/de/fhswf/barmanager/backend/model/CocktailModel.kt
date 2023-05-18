package de.fhswf.barmanager.backend.model

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("cocktail")
data class Cocktail(
    @Id
    @JsonProperty("cocktailId")
    var id: String? = null,
    var barId: String? = null,
    @JsonProperty("cocktailName")
    val name: String,
    @JsonProperty("recipeIngredients")
    val ingredients: List<CocktailIngredient>
)

data class CocktailIngredient(
    val unitOfMeasurement: MeasurementUnit,
    val ingredientGroup: String,
    val amount: Int
)