package de.fhswf.barmanager.backend.service

import de.fhswf.barmanager.backend.model.Bar
import de.fhswf.barmanager.backend.repository.BarRepository
import org.springframework.stereotype.Service

@Service
class LoginService(
    val barRepository: BarRepository
) {

    fun login(barCode: String): Bar {
        println("called GET /login/$barCode")
        return barRepository.findByBarCode(barCode)
    }

    fun createBar(bar: Bar): Bar {
        println("called POST /bars/bar")
        bar.barCode = generateBarCode(6)
        return barRepository.insert(bar)
    }

    fun generateBarCode(length: Int): String {
        val allowedCharacters = ('A'..'Z') + ('a'..'z') + ('0'..'9')
        return (1..length).map { allowedCharacters.random() }.joinToString("")
    }
}