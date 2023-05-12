package de.fhswf.barmanager.backend.service

import org.springframework.stereotype.Service

@Service
class LoginService {

    fun login(barCode: String) {
        println("called GET /login/$barCode")
    }

    fun createBar() {
        println("called POST /bars/bar")
    }
}