package de.fhswf.barmanager.backend.api

import de.fhswf.barmanager.backend.model.Cocktail
import de.fhswf.barmanager.backend.service.CocktailService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/bars/{barId}/cocktails")
@RestController
class CocktailController(private val cocktailService: CocktailService) {

    @GetMapping
    fun getAllCocktails(@PathVariable barId: String, @RequestParam checkAvailability: String?): List<Cocktail> {
        return cocktailService.getAllCocktails(barId, checkAvailability)
    }

    @GetMapping("/{cocktailId}")
    fun getSpecificCocktails(@PathVariable barId: String, @PathVariable cocktailId: String): Cocktail {
        return cocktailService.getCocktail(barId, cocktailId.toLong())
    }

    @PostMapping("/cocktail")
    fun createCocktail(@PathVariable barId: String, @RequestBody cocktail: Cocktail): Cocktail {
        cocktail.barId = barId
        return cocktailService.createCocktail(cocktail)
    }

    @DeleteMapping("/{cocktailId}")
    fun deleteCocktail(@PathVariable barId: String, @PathVariable cocktailId: String): Cocktail {
        return cocktailService.deleteCocktail(barId, cocktailId.toLong())
    }

    @PutMapping("/{cocktailId}")
    fun updateCocktail(@PathVariable barId: String, @PathVariable cocktailId: String, @RequestBody cocktail: Cocktail): Cocktail {
        cocktail.id = cocktailId.toLong()
        cocktail.barId = barId
        return cocktailService.updateCocktail(cocktail)
    }
}