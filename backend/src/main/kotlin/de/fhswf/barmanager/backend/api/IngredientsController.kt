package de.fhswf.barmanager.backend.api

import de.fhswf.barmanager.backend.service.IngredientsService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

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