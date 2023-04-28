package de.fhswf.barmanager.backend.api

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/bars/{barId}/ingredient-groups")
@RestController
class IngredientGroupsController {

    @GetMapping
    fun getAllIngredientGroups(@PathVariable barId: String) {
        println("called GET /bars/$barId/ingredient-groups")
    }

    @GetMapping("/{ingredientGroupId}")
    fun getIngredientGroup(@PathVariable barId: String, @PathVariable ingredientGroupId: String) {
        println("called GET /bars/$barId/ingredient-groups/$ingredientGroupId")
    }

    @PostMapping("/ingredient-group")
    fun createIngredientGroup(@PathVariable barId: String) {
        println("called POST /bars/$barId/ingredient-groups/ingredient-group")
    }

    @DeleteMapping("/{ingredientGroupId}")
    fun deleteIngredientGroup(@PathVariable barId: String, @PathVariable ingredientGroupId: String) {
        println("called DELETE /bars/$barId/ingredient-groups/$ingredientGroupId")
    }

    @PutMapping("/{ingredientGroupId}")
    fun updateIngredientGroup(@PathVariable barId: String, @PathVariable ingredientGroupId: String) {
        println("called PUT /bars/$barId/ingredient-groups/$ingredientGroupId")
    }
}