package de.fhswf.barmanager.backend.service

import de.fhswf.barmanager.backend.model.Cocktail
import de.fhswf.barmanager.backend.model.IngredientGroup
import de.fhswf.barmanager.backend.repository.CocktailRepository
import de.fhswf.barmanager.backend.repository.IngredientGroupsRepository
import de.fhswf.barmanager.backend.repository.IngredientRepository
import org.springframework.stereotype.Service

@Service
class CocktailService(
    val cocktailRepository: CocktailRepository,
    val ingredientGroupsRepository: IngredientGroupsRepository,
    val ingredientRepository: IngredientRepository
) {

    fun getAllCocktails(barId: String): List<Cocktail> {
        println("called GET /bars/$barId/cocktails checkAvailability: false")
        return cocktailRepository.findAllByBarId(barId)
    }

    fun getAllAvailableCocktails(barId: String): List<Cocktail> {
        println("called GET /bars/$barId/cocktails checkAvailability: true")
        val allCocktails = cocktailRepository.findAllByBarId(barId)
        val ingredientGroups = ingredientGroupsRepository.findAllByBarId(barId)
        for (ingredientGroup in ingredientGroups) {
            ingredientGroup.ingredients = ingredientRepository.findAllByBarIdAndIngredientGroupId(barId, ingredientGroup.id!!)
        }
        return getAvailableCocktails(allCocktails, ingredientGroups)
    }

    fun getCocktail(barId: String, cocktailId: String): Cocktail {
        println("called GET /bars/$barId/cocktails/$cocktailId")
        return cocktailRepository.findByBarIdAndId(barId, cocktailId)
    }

    fun createCocktail(cocktail: Cocktail): Cocktail {
        println("called POST /bars/${cocktail.barId}/cocktails/cocktail")
        return cocktailRepository.insert(cocktail)
    }

    fun deleteCocktail(barId: String, cocktailId: String): Cocktail {
        println("called DELETE /bars/$barId/cocktails/$cocktailId")
        return cocktailRepository.deleteByBarIdAndId(barId, cocktailId)
    }

    fun updateCocktail(cocktail: Cocktail): Cocktail {
        println("called PUT /bars/${cocktail.barId}/cocktails/${cocktail.id}")
        return cocktailRepository.save(cocktail)
    }

    fun getAvailableCocktails(cocktails: List<Cocktail>, ingredientGroups: List<IngredientGroup>): List<Cocktail> {
        val availableCocktails = mutableListOf<Cocktail>()

        for (cocktail in cocktails) {
            if (allIngredientsAvailable(cocktail, ingredientGroups)) {
                availableCocktails.add(cocktail)
            }
        }

        return availableCocktails
    }

    fun allIngredientsAvailable(cocktail: Cocktail, ingredientGroups: List<IngredientGroup>): Boolean {
        val cocktailIngredients = cocktail.ingredients

        for (cocktailIngredient in cocktailIngredients) {
            val cocktailIngredientGroup = cocktailIngredient.ingredientGroup
            val cocktailIngredientAmount = cocktailIngredient.amount

            // check if ingredientGroupName is in list of ingredients
            if (!containsIngredientGroup(cocktailIngredientGroup, ingredientGroups)) {
                return false
            }

            for (ingredientGroup in ingredientGroups) {
                if (ingredientGroup.name == cocktailIngredientGroup) {
                    // check if amount of ingredient is enough in ingredient group
                    if (!amountOfGroupIsHigherThanCocktailIngredient(cocktailIngredientAmount, ingredientGroup)) {
                        return false
                    }

                    // check if at least one ingredient in ingredient group has enough content on its own to
                    // be enough for the cocktail
                    if (!oneIngredientIsHigherThanCocktailIngredient(cocktailIngredientAmount, ingredientGroup)) {
                        return false
                    }
                }
            }
        }
        return true
    }

    fun containsIngredientGroup(cocktailIngredientGroup: String, ingredientGroups: List<IngredientGroup>): Boolean {
        return ingredientGroups.map { it.name }.contains(cocktailIngredientGroup)
    }

    fun amountOfGroupIsHigherThanCocktailIngredient(cocktailAmount: Int, ingredientGroup: IngredientGroup): Boolean {
        return cocktailAmount < ingredientGroup.ingredients!!.sumOf { it.amount }
    }

    fun oneIngredientIsHigherThanCocktailIngredient(cocktailAmount: Int, ingredientGroup: IngredientGroup): Boolean {
        var highestAmountInGroup = 0
        for (ingredient in ingredientGroup.ingredients!!) {
            if (ingredient.amount > highestAmountInGroup) {
                highestAmountInGroup = ingredient.amount
            }
        }
        return cocktailAmount < highestAmountInGroup
    }
}