import requests

class SpoonacularService:
  BASE_URL = "https://api.spoonacular.com/recipes/findByIngredients"
  # API_KEY = "3759844f4d554d84b9aab6a4bf507d45" # Adrien
  API_KEY = "bf9fe0b401714cfa9daca43c70f2a771" # Woodis

  @classmethod
  def get_recipes_by_ingredients(cls, ingredients):
    params = {
      "ingredients": ",".join(ingredients),
      "number": 5,
      "apiKey": cls.API_KEY
    }
    response = requests.get(cls.BASE_URL, params=params)
    response.raise_for_status()
    return response.json()
  
  
  