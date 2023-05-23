package de.fhswf.barmanager.backend.model

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("ingredient-groups")
data class IngredientGroup(
    @Id
    @JsonProperty("ingredientGroupId")
    var id: String?,

    @JsonProperty("barId")
    var barId: String?,

    @JsonProperty("ingredientGroupName")
    val name: String,

    @JsonProperty("unitOfMeasurement")
    val unitOfMeasurement: MeasurementUnit,

    @Transient
    var ingredients: List<Ingredient>?
)

@Document("ingredients")
data class Ingredient(
    @Id
    @JsonProperty("ingredientId")
    var id: String?,

    @JsonProperty("barId")
    var barId: String?,

    @JsonProperty("ingredientName")
    var name: String,

    @JsonProperty("amount")
    var amount: Int,

    @JsonProperty("description")
    var description: String,

    @JsonIgnore
    var ingredientGroupId: String?,
)