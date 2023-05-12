package de.fhswf.barmanager.backend.repository

import de.fhswf.barmanager.backend.model.Order
import org.springframework.data.mongodb.repository.MongoRepository

interface OrderRepository : MongoRepository<Order, String> {
    fun findAllByBarId(barId: String): List<Order>

    fun deleteByBarIdAndId(barId: String, orderId: String): Order
}