package de.fhswf.barmanager.backend.service

import org.springframework.stereotype.Service

@Service
class OrderService {

    fun getAllOrders(barId: String) {
        println("called GET /bars/$barId/orders")
    }

    fun createOrder(barId: String) {
        println("called POST /bars/$barId/orders/order")
    }

    fun deleteOrder(barId: String, orderId: String) {
        println("called DELETE /bars/$barId/orders/$orderId")
    }
}