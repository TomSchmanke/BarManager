package de.fhswf.barmanager.backend.model

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("bar")
data class Bar(
    @Id
    @JsonProperty("barId")
    var barId: String?,

    @JsonProperty("barName")
    val barName: String,

    @JsonProperty("ownerName")
    val ownerName: String,

    @JsonProperty("barCode")
    var barCode: String? // max. 6 chars
)