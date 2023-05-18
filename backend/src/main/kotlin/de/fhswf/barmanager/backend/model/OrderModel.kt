package de.fhswf.barmanager.backend.model

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("order")
data class Order(
    @Id
    @JsonProperty("orderId")
    var id: String?,

    @JsonProperty("barId")
    var barId: String?,

    @JsonProperty("cocktailId")
    val cocktailId: String,

    @JsonProperty("cocktailName")
    val cocktailName: String,

    @JsonProperty("customerName")
    val customerName: String,

    @JsonProperty("timestamp")
    var timestamp: String?
)