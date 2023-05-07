package de.fhswf.barmanager.backend.service

import de.fhswf.barmanager.backend.model.Cocktail
import de.fhswf.barmanager.backend.repository.CocktailRepository
import org.springframework.stereotype.Service

@Service
class CocktailService(
    val cocktailRepository: CocktailRepository
) {

    fun getAllCocktails(barId: String, checkAvailability: String?): List<Cocktail> {
        println("called GET /bars/$barId/cocktails checkAvailability: $checkAvailability")
        return cocktailRepository.findAllByBarId(barId)
    }

    fun getCocktail(barId: String, cocktailId: Long): Cocktail {
        println("called GET /bars/$barId/cocktails/$cocktailId")
        return cocktailRepository.findByBarIdAndId(barId, cocktailId)
    }

    fun createCocktail(cocktail: Cocktail): Cocktail {
        println("called POST /bars/${cocktail.barId}/cocktails/cocktail")
        return cocktailRepository.insert(cocktail)
    }

    fun deleteCocktail(barId: String, cocktailId: Long): Cocktail {
        println("called DELETE /bars/$barId/cocktails/$cocktailId")
        return cocktailRepository.deleteByBarIdAndId(barId, cocktailId)
    }

    fun updateCocktail(cocktail: Cocktail): Cocktail {
        println("called PUT /bars/${cocktail.barId}/cocktails/${cocktail.id}")
        return cocktailRepository.save(cocktail)
    }
}