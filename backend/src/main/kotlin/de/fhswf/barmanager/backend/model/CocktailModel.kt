package de.fhswf.barmanager.backend.model

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("cocktail")
data class Cocktail(
    @Id
    @JsonProperty("cocktailId")
    var id: String? = null,

    @JsonProperty("barId")
    var barId: String? = null,

    @JsonProperty("cocktailName")
    val name: String,

    @JsonProperty("recipeIngredients")
    val ingredients: List<CocktailIngredient>
)

data class CocktailIngredient(
    @JsonProperty("unitOfMeasurement")
    val unitOfMeasurement: MeasurementUnit,

    @JsonProperty("ingredientGroupName")
    val ingredientGroup: String,

    @JsonProperty("amount")
    val amount: Int
)