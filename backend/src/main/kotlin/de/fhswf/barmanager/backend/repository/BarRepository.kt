package de.fhswf.barmanager.backend.repository

import de.fhswf.barmanager.backend.model.Bar
import org.springframework.data.mongodb.repository.MongoRepository

interface BarRepository : MongoRepository<Bar, String> {
    fun findByBarCode(barCode: String): Bar
}