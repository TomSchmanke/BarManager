package de.fhswf.barmanager.backend.config

import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories


@Configuration
@EnableMongoRepositories(basePackages = ["de.fhswf.barmanager.backend.repository"])
class MongoConfig : AbstractMongoClientConfiguration() {

    @Autowired
    lateinit var env: Environment

    override fun getDatabaseName(): String {
        return "bar-manager"
    }

    override fun mongoClient(): MongoClient {
        val password = env.getProperty("mongodb.password")

        val connectionString = ConnectionString("mongodb+srv://bar-manager:$password@bar-manager.k5n0gqy.mongodb.net/?retryWrites=true&w=majority")
        val mongoClientSettings = MongoClientSettings.builder()
            .applyConnectionString(connectionString)
            .build()
        return MongoClients.create(mongoClientSettings)
    }

    public override fun getMappingBasePackages(): Set<String> {
        return setOf("de.fhwsf.barmanager.backend")
    }
}