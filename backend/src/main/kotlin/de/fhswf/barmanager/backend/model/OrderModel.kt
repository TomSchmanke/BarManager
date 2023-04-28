package de.fhswf.barmanager.backend.model

data class Order(
    val id: Int,
    val cocktailId: Int,
    val cocktailName: String,
    val customerName: String,
    val timestamp: String
)