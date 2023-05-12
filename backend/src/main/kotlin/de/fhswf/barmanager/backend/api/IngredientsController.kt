package de.fhswf.barmanager.backend.api

import de.fhswf.barmanager.backend.service.IngredientsService
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:4200"])
@RequestMapping("/bars/{barId}/ingredients")
@RestController
class IngredientsController(private val ingredientsService: IngredientsService) {

    @GetMapping
    fun getAllIngredients(@PathVariable barId: String) {
        ingredientsService.getAllIngredients(barId)
    }

    @DeleteMapping("/{ingredientsId}")
    fun deleteIngredient(@PathVariable barId: String, @PathVariable ingredientsId: String) {
        ingredientsService.deleteIngredient(barId, ingredientsId)
    }

    @PutMapping("/{ingredientsId}")
    fun updateIngredient(@PathVariable barId: String, @PathVariable ingredientsId: String) {
        ingredientsService.updateIngredient(barId, ingredientsId)
    }
}