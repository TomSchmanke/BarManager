package de.fhswf.barmanager.backend.api

import de.fhswf.barmanager.backend.model.Ingredient
import de.fhswf.barmanager.backend.service.IngredientsService
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:4200"])
@RequestMapping("/bars/{barId}/ingredients")
@RestController
class IngredientsController(private val ingredientsService: IngredientsService) {

    @GetMapping
    fun getAllIngredients(@PathVariable barId: String): List<Ingredient> {
        return ingredientsService.getAllIngredients(barId)
    }

    @DeleteMapping("/{ingredientsId}")
    fun deleteIngredient(@PathVariable barId: String, @PathVariable ingredientsId: String): Ingredient {
        return ingredientsService.deleteIngredient(barId, ingredientsId)
    }

    @PutMapping("/{ingredientsId}")
    fun updateIngredient(@PathVariable barId: String, @PathVariable ingredientsId: String, @RequestBody ingredient: Ingredient): Ingredient {
        ingredient.barId = barId
        ingredient.id = ingredientsId
        return ingredientsService.updateIngredient(ingredient)
    }
}