package de.fhswf.barmanager.backend.model

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("bar")
data class Bar(
    @Id
    @JsonProperty("barId")
    var barId: String?,
    val barName: String,
    val ownerName: String,
    var barCode: String? // max. 6 chars
)