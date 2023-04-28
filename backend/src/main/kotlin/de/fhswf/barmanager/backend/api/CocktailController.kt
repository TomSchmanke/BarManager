package de.fhswf.barmanager.backend.api

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/bars/{barId}/cocktails")
@RestController
class CocktailController {

    @GetMapping
    fun getAllCocktails(@PathVariable barId: String, @RequestParam checkAvailability: String?) {
        println("called GET /bars/$barId/cocktails checkAvailability: $checkAvailability")
    }

    @GetMapping("/{cocktailId}")
    fun getSpecificCocktails(@PathVariable barId: String, @PathVariable cocktailId: String) {
        println("called GET /bars/$barId/cocktails/$cocktailId")
    }

    @PostMapping("/ingredient-group")
    fun createCocktail(@PathVariable barId: String) {
        println("called POST /bars/$barId/cocktails/cocktail")
    }

    @DeleteMapping("/{cocktailId}")
    fun deleteCocktail(@PathVariable barId: String, @PathVariable cocktailId: String) {
        println("called DELETE /bars/$barId/cocktails/$cocktailId")
    }

    @PutMapping("/{cocktailId}")
    fun updateCocktail(@PathVariable barId: String, @PathVariable cocktailId: String) {
        println("called PUT /bars/$barId/cocktails/$cocktailId")
    }
}