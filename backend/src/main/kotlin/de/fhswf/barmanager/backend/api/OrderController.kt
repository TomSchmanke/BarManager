package de.fhswf.barmanager.backend.api

import de.fhswf.barmanager.backend.model.Order
import de.fhswf.barmanager.backend.service.OrderService
import org.springframework.web.bind.annotation.*
import java.time.Instant
import java.time.format.DateTimeFormatter

@CrossOrigin(origins = ["http://localhost:4200"])
@RequestMapping("/bars/{barId}/orders")
@RestController
class OrderController(private val orderService: OrderService) {

    @GetMapping
    fun getAllOrders(@PathVariable barId: String): List<Order> {
        return orderService.getAllOrders(barId)
    }

    @PostMapping("/order")
    fun createOrder(@PathVariable barId: String, @RequestBody order: Order): Order {
        order.id = null
        order.barId = barId
        order.timestamp = generateOrderTimestamp()
        return orderService.createOrder(order)
    }

    @DeleteMapping("/{orderId}")
    fun deleteOrder(@PathVariable barId: String, @PathVariable orderId: String): Order {
        return orderService.deleteOrder(barId, orderId)
    }

    fun generateOrderTimestamp(): String {
        return DateTimeFormatter.ISO_INSTANT.format(Instant.now())
    }
}