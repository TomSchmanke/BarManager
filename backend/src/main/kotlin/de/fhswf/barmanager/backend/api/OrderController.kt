package de.fhswf.barmanager.backend.api

import de.fhswf.barmanager.backend.service.OrderService
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:4200"])
@RequestMapping("/bars/{barId}/orders")
@RestController
class OrderController(private val orderService: OrderService) {

    @GetMapping
    fun getAllOrders(@PathVariable barId: String) {
        orderService.getAllOrders(barId)
    }

    @PostMapping("/order")
    fun createOrder(@PathVariable barId: String) {
        orderService.createOrder(barId)
    }

    @DeleteMapping("/{orderId}")
    fun deleteOrder(@PathVariable barId: String, @PathVariable orderId: String) {
        orderService.deleteOrder(barId, orderId)
    }
}