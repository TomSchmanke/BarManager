package de.fhswf.barmanager.backend.repository

import de.fhswf.barmanager.backend.model.IngredientGroup
import org.springframework.data.mongodb.repository.MongoRepository

interface IngredientGroupsRepository : MongoRepository<IngredientGroup, String> {

    fun findAllByBarId(barId: String): List<IngredientGroup>

    fun deleteByBarIdAndId(barId: String, groupId: String): IngredientGroup
}