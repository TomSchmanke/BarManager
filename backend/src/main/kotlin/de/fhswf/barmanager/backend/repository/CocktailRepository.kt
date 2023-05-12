package de.fhswf.barmanager.backend.repository

import de.fhswf.barmanager.backend.model.Cocktail
import org.springframework.data.mongodb.repository.MongoRepository

interface CocktailRepository : MongoRepository<Cocktail, String> {
    fun findAllByBarId(barId: String): List<Cocktail>

    fun findByBarIdAndId(barId: String, id: String): Cocktail

    fun deleteByBarIdAndId(barId: String, id: String): Cocktail
}