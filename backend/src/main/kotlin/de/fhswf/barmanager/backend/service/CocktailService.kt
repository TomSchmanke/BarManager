package de.fhswf.barmanager.backend.service

import org.springframework.stereotype.Service

@Service
class CocktailService {

    fun getAllCocktails(barId: String, checkAvailability: String) {
        println("called GET /bars/$barId/cocktails checkAvailability: $checkAvailability")
    }
}