package de.fhswf.barmanager.backend.service

import org.springframework.stereotype.Service

@Service
class CocktailService {

    fun getAllCocktails(barId: String, checkAvailability: String?) {
        println("called GET /bars/$barId/cocktails checkAvailability: $checkAvailability")
    }

    fun getCocktail(barId: String, cocktailId: String) {
        println("called GET /bars/$barId/cocktails/$cocktailId")
    }

    fun createCocktail(barId: String) {
        println("called POST /bars/$barId/cocktails/cocktail")
    }

    fun deleteCocktail(barId: String, cocktailId: String) {
        println("called DELETE /bars/$barId/cocktails/$cocktailId")
    }

    fun updateCocktail(barId: String, cocktailId: String) {
        println("called PUT /bars/$barId/cocktails/$cocktailId")
    }
}