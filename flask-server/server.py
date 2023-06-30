from flask import Flask, request
from flask_pymongo import PyMongo
from flask_cors import CORS
import math


app = Flask(__name__)
cors = CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/Pantry_Pals"  # MongoDB connection URI
app.config['CORS_HEADERS'] = 'Content-Type'
mongo = PyMongo(app)


# Login Token
@app.route("/login", methods=("GET", "POST"))
def login():
    if request.method == 'POST':
        json = request.get_json()

        print(json["username"], json["password"])

        # Check if login credentials match
        if(json["username"] == '1' and json["password"] == '2'):
            print("Login is correct")
            return {"token": "test Granted"}
        else:
            print("Incorrect Credentials")
            return {"token": "Test Failed"}
    return "test"

@app.route("/recipe")
def recipe():
    try:
        collection = mongo.db.Recipes  # Access the "Recipes" collection in the MongoDB database

        # Retrieve the "title" parameter from the query string
        title = request.args.get("title")

        if not title:
            return {"error": "Title parameter is missing"}, 400  # Return an error if the "title" parameter is missing

        # Perform a case-insensitive search for recipes that match the provided title
        recipes = list(collection.find({"title": {"$regex": title, "$options": "i"}}))

        return {"recipe": recipes}  # Return the matching recipes
    except Exception as e:
        return {"error": str(e)}, 500  # Return an error message if an exception occurs

@app.route("/recipe/<title>")
def recipe_by_title(title):
    try:
        collection = mongo.db.Recipes  # Access the "Recipes" collection in the MongoDB database

        # Perform a case-insensitive search for a recipe that matches the provided title
        recipe = collection.find_one({"title": {"$regex": title, "$options": "i"}})

        if recipe:
            return {"recipe": recipe}
        else:
            return {"error": "Recipe not found"}, 404
    except Exception as e:
        return {"error": str(e)}, 500  # Return an error message if an exception occurs
    
def compareLists(list1, list2):
    for item in list1:
        found = False
        for string in list2:
            if item in string:
                found = True
                break
        if not found:
            return False
    return True


@app.route("/filter")
def filter_recipes():
    try:
        collection = mongo.db.Recipes  # Access the "Recipes" collection in the MongoDB database

        # Retrieve the "ingredients" and "page" parameters from the query string
        ingredients = request.args.get("ingredients")
        ingredient_list = ingredients.split(",") if ingredients else []

        # Retrieve the "page" parameter from the query string, default to 1 if not provided
        page = int(request.args.get("page", 1))
        items_per_page = 20

        # Fetch all recipes from the database
        recipes = list(collection.find({}))

        # Filter the recipes based on the provided ingredients
        filtered_recipes = []
        for recipe in recipes:
            if "ingredients" in recipe and compareLists(ingredient_list, recipe["ingredients"]):
                filtered_recipes.append(recipe)

        total_items = len(filtered_recipes)
        start_index = (page - 1) * items_per_page
        end_index = start_index + items_per_page
        paginated_recipes = filtered_recipes[start_index:end_index]

        total_pages = math.ceil(total_items / items_per_page)

        return {
            "recipe": paginated_recipes,
            "totalPages": total_pages
        }  # Return the filtered recipes with pagination information

    except Exception as e:
        return {"error": str(e)}, 500  # Return an error message if an exception occurs


if __name__ == "__main__":
    app.run(debug=True)  # Run the Flask application in debug mode
