package de.fhswf.barmanager.backend.model

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("ingredient-groups")
data class IngredientGroup(
    @Id
    var id: String?,
    var barId: String?,
    val name: String,
    val unitOfMeasurement: MeasurementUnit,
    @Transient
    var ingredients: List<Ingredient>?
)

@Document("ingredient-group")
data class Ingredient(
    @Id
    var id: String?,
    var barId: String?,
    var name: String,
    var amount: Int,
    var description: String,
    @JsonIgnore
    var ingredientGroupId: String?,
)