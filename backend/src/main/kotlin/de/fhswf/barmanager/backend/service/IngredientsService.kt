package de.fhswf.barmanager.backend.service

import de.fhswf.barmanager.backend.model.Ingredient
import de.fhswf.barmanager.backend.repository.IngredientRepository
import org.springframework.stereotype.Service

@Service
class IngredientsService(
    val ingredientRepository: IngredientRepository
) {

    fun getAllIngredients(barId: String): List<Ingredient> {
        println("called GET /bars/$barId/ingredients")
        return ingredientRepository.findAllByBarId(barId)
    }

    fun deleteIngredient(barId: String, ingredientsId: String): Ingredient {
        println("called DELETE /bars/$barId/ingredients/$ingredientsId")
        return ingredientRepository.deleteByBarIdAndId(barId, ingredientsId)
    }

    fun updateIngredient(ingredient: Ingredient): Ingredient {
        println("called PUT /bars/${ingredient.barId}/ingredients/${ingredient.id}")
        val newIngredient = ingredientRepository.findByBarIdAndId(ingredient.barId!!, ingredient.id!!)
        newIngredient.name = ingredient.name
        newIngredient.amount = ingredient.amount
        newIngredient.description = ingredient.description
        return ingredientRepository.save(newIngredient)
    }
}