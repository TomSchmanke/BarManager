package de.fhswf.barmanager.backend.api

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/bars/{barId}/ingredients")
@RestController
class IngredientsController {

    @GetMapping
    fun getAllIngredients(@PathVariable barId: String) {
        println("called GET /bars/$barId/ingredients")
    }

    @DeleteMapping("/{ingredientsId}")
    fun deleteIngredient(@PathVariable barId: String, @PathVariable ingredientsId: String) {
        println("called DELETE /bars/$barId/ingredients/$ingredientsId")
    }

    @PutMapping("/{ingredientsId}")
    fun updateIngredient(@PathVariable barId: String, @PathVariable ingredientsId: String) {
        println("called PUT /bars/$barId/ingredients/$ingredientsId")
    }
}