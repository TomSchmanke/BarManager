package de.fhswf.barmanager.backend.api

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/bars/{barId}/orders")
@RestController
class OrderController {

    @GetMapping
    fun getAllOrders(@PathVariable barId: String) {
        println("called GET /bars/$barId/orders")
    }

    @PostMapping("/order")
    fun createOrder(@PathVariable barId: String) {
        println("called POST /bars/$barId/orders/order")
    }

    @DeleteMapping("/{orderId}")
    fun deleteOrder(@PathVariable barId: String, @PathVariable orderId: String) {
        println("called DELETE /bars/$barId/orders/$orderId")
    }
}