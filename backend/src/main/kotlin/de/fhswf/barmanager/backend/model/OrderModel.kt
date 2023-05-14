package de.fhswf.barmanager.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("order")
data class Order(
    @Id
    var id: String?,
    var barId: String?,
    val cocktailId: String,
    val cocktailName: String,
    val customerName: String,
    var timestamp: String?
)