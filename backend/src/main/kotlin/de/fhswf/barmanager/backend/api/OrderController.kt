package de.fhswf.barmanager.backend.api

import de.fhswf.barmanager.backend.service.OrderService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

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