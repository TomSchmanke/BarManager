package de.fhswf.barmanager.backend.repository

import de.fhswf.barmanager.backend.model.Cocktail
import org.springframework.data.mongodb.repository.MongoRepository

interface CocktailRepository : MongoRepository<Cocktail, Long> {
    fun findAllByBarId(barId: String): List<Cocktail>

    fun findByBarIdAndId(barId: String, id: Long): Cocktail

    fun deleteByBarIdAndId(barId: String, id: Long): Cocktail
}