package de.fhswf.barmanager.backend.api

import de.fhswf.barmanager.backend.service.CocktailService
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
class CocktailController(private val cocktailService: CocktailService) {

    @GetMapping
    fun getAllCocktails(@PathVariable barId: String, @RequestParam checkAvailability: String?) {
        cocktailService.getAllCocktails(barId, checkAvailability)
    }

    @GetMapping("/{cocktailId}")
    fun getSpecificCocktails(@PathVariable barId: String, @PathVariable cocktailId: String) {
        cocktailService.getCocktail(barId, cocktailId)
    }

    @PostMapping("/cocktail")
    fun createCocktail(@PathVariable barId: String) {
        cocktailService.createCocktail(barId)
    }

    @DeleteMapping("/{cocktailId}")
    fun deleteCocktail(@PathVariable barId: String, @PathVariable cocktailId: String) {
        cocktailService.deleteCocktail(barId, cocktailId)
    }

    @PutMapping("/{cocktailId}")
    fun updateCocktail(@PathVariable barId: String, @PathVariable cocktailId: String) {
        cocktailService.updateCocktail(barId, cocktailId)
    }
}