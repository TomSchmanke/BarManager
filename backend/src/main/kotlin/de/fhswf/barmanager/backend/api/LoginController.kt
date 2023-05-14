package de.fhswf.barmanager.backend.api

import de.fhswf.barmanager.backend.model.Bar
import de.fhswf.barmanager.backend.service.LoginService
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:4200"])
@RestController
class LoginController(private val loginService: LoginService) {

    @GetMapping("/login/{barCode}")
    fun login(@PathVariable barCode: String): Bar {
        return loginService.login(barCode)
    }

    @PostMapping("/bars/bar")
    fun createBar(@RequestBody bar: Bar): Bar {
        return loginService.createBar(bar)
    }
}