package de.fhswf.barmanager.backend.service

import org.springframework.stereotype.Service

@Service
class IngredientGroupsService {

    fun getAllIngredientGroups(barId: String) {
        println("called GET /bars/$barId/ingredient-groups")
    }

    fun getIngredientGroup(barId: String, ingredientGroupId: String) {
        println("called GET /bars/$barId/ingredient-groups/$ingredientGroupId")
    }

    fun createIngredientGroup(barId: String) {
        println("called POST /bars/$barId/ingredient-groups/ingredient-group")
    }

    fun deleteIngredientGroup(barId: String, ingredientGroupId: String) {
        println("called DELETE /bars/$barId/ingredient-groups/$ingredientGroupId")
    }

    fun updateIngredientGroup(barId: String, ingredientGroupId: String) {
        println("called PUT /bars/$barId/ingredient-groups/$ingredientGroupId")
    }
}