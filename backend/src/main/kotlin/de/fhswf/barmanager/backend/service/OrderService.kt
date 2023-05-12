package de.fhswf.barmanager.backend.service

import de.fhswf.barmanager.backend.model.Order
import de.fhswf.barmanager.backend.repository.OrderRepository
import org.springframework.stereotype.Service

@Service
class OrderService(
    val orderRepository: OrderRepository
) {

    fun getAllOrders(barId: String): List<Order> {
        println("called GET /bars/$barId/orders")
        return orderRepository.findAllByBarId(barId)
    }

    fun createOrder(order: Order): Order {
        println("called POST /bars/${order.barId}/orders/order")
        return orderRepository.insert(order)
    }

    fun deleteOrder(barId: String, orderId: String): Order {
        println("called DELETE /bars/$barId/orders/$orderId")
        // TODO: add logic to reduce used ingredients
        return orderRepository.deleteByBarIdAndId(barId, orderId)
    }
}