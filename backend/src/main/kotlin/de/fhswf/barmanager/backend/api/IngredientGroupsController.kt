package de.fhswf.barmanager.backend.api

import de.fhswf.barmanager.backend.model.Ingredient
import de.fhswf.barmanager.backend.model.IngredientGroup
import de.fhswf.barmanager.backend.service.IngredientGroupsService
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:4200"])
@RequestMapping("/bars/{barId}/ingredient-groups")
@RestController
class IngredientGroupsController(private val ingredientGroupsService: IngredientGroupsService) {

    @GetMapping
    fun getAllIngredientGroups(@PathVariable barId: String): List<IngredientGroup> {
        return ingredientGroupsService.getAllIngredientGroups(barId)
    }

    @GetMapping("/{ingredientGroupId}")
    fun getIngredientGroup(@PathVariable barId: String, @PathVariable ingredientGroupId: String): IngredientGroup {
        return ingredientGroupsService.getIngredientGroup(barId, ingredientGroupId)
    }

    @PostMapping("/ingredient-group")
    fun createIngredientGroup(@PathVariable barId: String, @RequestBody ingredientGroup: IngredientGroup): IngredientGroup {
        ingredientGroup.barId = barId
        return ingredientGroupsService.createIngredientGroup(ingredientGroup)
    }

    @DeleteMapping("/{ingredientGroupId}")
    fun deleteIngredientGroup(@PathVariable barId: String, @PathVariable ingredientGroupId: String): IngredientGroup {
        return ingredientGroupsService.deleteIngredientGroup(barId, ingredientGroupId)
    }

    @PutMapping("/{ingredientGroupId}")
    fun updateIngredientGroup(@PathVariable barId: String, @PathVariable ingredientGroupId: String, @RequestBody ingredientGroup: IngredientGroup): IngredientGroup {
        ingredientGroup.barId = barId
        ingredientGroup.id = ingredientGroupId
        return ingredientGroupsService.updateIngredientGroup(ingredientGroup)
    }

    @PostMapping("/{ingredientGroupId}/ingredient")
    fun createIngredientInIngredientGroup(@PathVariable barId: String, @PathVariable ingredientGroupId: String, @RequestBody ingredient: Ingredient): Ingredient {
        ingredient.barId = barId
        ingredient.ingredientGroupId = ingredientGroupId
        return ingredientGroupsService.createIngredientInIngredientGroup(ingredient)
    }
}