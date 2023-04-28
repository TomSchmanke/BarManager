package de.fhswf.barmanager.backend.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class LoginController {

    @GetMapping("/login/{barCode}")
    fun login(@PathVariable barCode: String) {
        println("called GET /login/$barCode")
    }

    @PostMapping("/bars/bar")
    fun createBar() {
        println("called POST /bars/bar")
    }
}