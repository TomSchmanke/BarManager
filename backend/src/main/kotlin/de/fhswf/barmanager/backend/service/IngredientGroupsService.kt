package de.fhswf.barmanager.backend.service

import de.fhswf.barmanager.backend.model.Ingredient
import de.fhswf.barmanager.backend.model.IngredientGroup
import de.fhswf.barmanager.backend.repository.IngredientGroupsRepository
import de.fhswf.barmanager.backend.repository.IngredientRepository
import org.springframework.stereotype.Service

@Service
class IngredientGroupsService(
    val ingredientRepository: IngredientRepository,
    val ingredientGroupRepository: IngredientGroupsRepository
) {

    fun getAllIngredientGroups(barId: String): List<IngredientGroup> {
        println("called GET /bars/$barId/ingredient-groups")
        val ingredientGroups = emptyList<IngredientGroup>().toMutableList()
        for (group in ingredientGroupRepository.findAllByBarId(barId)) {
            group.ingredients = ingredientRepository.findAllByBarIdAndIngredientGroupId(barId, group.id!!)
            ingredientGroups += group
        }
        return ingredientGroups
    }

    fun getIngredientGroup(barId: String, ingredientGroupId: String): IngredientGroup {
        println("called GET /bars/$barId/ingredient-groups/$ingredientGroupId")
        val ingredients = ingredientRepository.findAllByBarIdAndIngredientGroupId(barId, ingredientGroupId)
        val group = ingredientGroupRepository.deleteByBarIdAndId(barId, ingredientGroupId)
        group.ingredients = ingredients

        return group
    }

    fun createIngredientGroup(ingredientGroup: IngredientGroup): IngredientGroup {
        println("called POST /bars/${ingredientGroup.barId}/ingredient-groups/ingredient-group")
        ingredientGroupRepository.save(ingredientGroup)
        for (ingredient in ingredientGroup.ingredients!!) {
            ingredient.ingredientGroupId = ingredientGroup.id
            ingredient.barId = ingredientGroup.barId
            ingredientRepository.insert(ingredient)
        }
        return ingredientGroup
    }

    fun deleteIngredientGroup(barId: String, ingredientGroupId: String): IngredientGroup {
        println("called DELETE /bars/$barId/ingredient-groups/$ingredientGroupId")
        val group = ingredientGroupRepository.deleteByBarIdAndId(barId, ingredientGroupId)
        group.ingredients = ingredientRepository.deleteAllByBarIdAndIngredientGroupId(barId, ingredientGroupId)
        return group
    }

    fun updateIngredientGroup(ingredientGroup: IngredientGroup): IngredientGroup {
        println("called PUT /bars/${ingredientGroup.barId}/ingredient-groups/${ingredientGroup.id}")
        ingredientGroupRepository.save(ingredientGroup)
        for (ingredient in ingredientGroup.ingredients!!) {
            ingredient.ingredientGroupId = ingredientGroup.id
            ingredient.barId = ingredientGroup.barId
            ingredientRepository.save(ingredient)
        }
        return ingredientGroup
    }

    fun createIngredientInIngredientGroup(ingredient: Ingredient): Ingredient {
        println("called POST /bars/${ingredient.barId}/ingredient-groups/${ingredient.ingredientGroupId}/ingredient")
        return ingredientRepository.insert(ingredient)
    }
}