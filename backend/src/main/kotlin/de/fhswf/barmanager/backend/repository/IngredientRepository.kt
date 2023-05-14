package de.fhswf.barmanager.backend.repository

import de.fhswf.barmanager.backend.model.Ingredient
import org.springframework.data.mongodb.repository.MongoRepository

interface IngredientRepository : MongoRepository<Ingredient, String> {

    fun findByBarIdAndId(barId: String, id: String): Ingredient

    fun findAllByBarId(barId: String): List<Ingredient>

    fun findAllByBarIdAndIngredientGroupId(barId: String, ingredientGroupId: String): List<Ingredient>

    fun deleteByBarIdAndId(barId: String, ingredientId: String): Ingredient

    fun deleteAllByBarIdAndIngredientGroupId(barId: String, ingredientGroupId: String): List<Ingredient>
}