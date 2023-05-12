package de.fhswf.barmanager.backend.service

import org.springframework.stereotype.Service

@Service
class IngredientsService {

    fun getAllIngredients(barId: String) {
        println("called GET /bars/$barId/ingredients")
    }

    fun deleteIngredient(barId: String, ingredientsId: String) {
        println("called DELETE /bars/$barId/ingredients/$ingredientsId")
    }

    fun updateIngredient(barId: String, ingredientsId: String) {
        println("called PUT /bars/$barId/ingredients/$ingredientsId")
    }
}