package de.fhswf.barmanager.backend.api

import de.fhswf.barmanager.backend.service.IngredientGroupsService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/bars/{barId}/ingredient-groups")
@RestController
class IngredientGroupsController(private val ingredientGroupsService: IngredientGroupsService) {

    @GetMapping
    fun getAllIngredientGroups(@PathVariable barId: String) {
        ingredientGroupsService.getAllIngredientGroups(barId)
    }

    @GetMapping("/{ingredientGroupId}")
    fun getIngredientGroup(@PathVariable barId: String, @PathVariable ingredientGroupId: String) {
        ingredientGroupsService.getIngredientGroup(barId, ingredientGroupId)
    }

    @PostMapping("/ingredient-group")
    fun createIngredientGroup(@PathVariable barId: String) {
        ingredientGroupsService.createIngredientGroup(barId)
    }

    @DeleteMapping("/{ingredientGroupId}")
    fun deleteIngredientGroup(@PathVariable barId: String, @PathVariable ingredientGroupId: String) {
        ingredientGroupsService.deleteIngredientGroup(barId, ingredientGroupId)
    }

    @PutMapping("/{ingredientGroupId}")
    fun updateIngredientGroup(@PathVariable barId: String, @PathVariable ingredientGroupId: String) {
        ingredientGroupsService.updateIngredientGroup(barId, ingredientGroupId)
    }
}