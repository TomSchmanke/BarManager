package de.fhswf.barmanager.backend.model

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("order")
data class Order(
    @Id
    @JsonProperty("orderId")
    var id: String?,
    var barId: String?,
    val cocktailId: String,
    val cocktailName: String,
    val customerName: String,
    var timestamp: String?
)