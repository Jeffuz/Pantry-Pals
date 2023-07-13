from flask import Flask, request
from flask_pymongo import PyMongo
from flask_cors import CORS

from bson import json_util, ObjectId
import json
import math


app = Flask(__name__)
cors = CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/Pantry_Pals"  # MongoDB connection URI
app.config['CORS_HEADERS'] = 'Content-Type'
mongo = PyMongo(app)
#region Bookmarks
@app.route("/setBookmark", methods=("GET", "POST"))
def setBookmark():
    users = mongo.db.Users;
    if request.method == "POST":
        json = request.get_json()

        user = users.find({"_id": ObjectId(json["token"])})
        try:
            userData = user.next()
        except Exception as e:
            return {"error": "User not found in system"}, 900  # Return an error message if an exception occurs
        
        userBookmarkList = userData["Bookmarks"]

        print(userBookmarkList, json["recipeName"])

        try:
            # Remove Recipe from bookmarks
            if not json["isAddBookmark"]: 
                for item in userBookmarkList:
                    if item == json["recipeName"]:
                        userBookmarkList.remove(item)
            # Add recipe to bookmark
            else:
                print("Adding to bookmark")
                print(str(json["token"]))
                filter = {"_id": ObjectId(json["token"]) }
                newKey = { "$push": { "Bookmarks": json["recipeName"]}}
                try:
                    users.update_one(filter, newKey)

                except Exception as e:
                    return {"error": str(e)}, 801
                print(userBookmarkList)
        except Exception as e:
            return {"error": "Could Not Add or Remove bookmark from user"}, 808
        
        return {
            "result": "Success"
        }

#endregion
@app.route("/login", methods=("GET", "POST"))
def login():
    # Get List of current users in the database.
    users = mongo.db.Users;

    isValid = False
    validUserID = None
    # Return user ID if found user
    if request.method == 'POST':
        json = request.get_json()

        user = list(users.find({ "Email": json["email"]}))

        for x in user:
            if x["Password"] == json["password"]:
                isValid = True
                validUserID = x["_id"]

    # Return UserID and token
    if isValid:
        idString = str(validUserID)
        return {
            "id": idString,
            "token": "valid",
            "error": ""
        }
    
    # Cannot find user / no match
    return {
        "id": "",
        "token": "invalid",
        "error": "Email or Password does not match"
    }

@app.route("/signup", methods=("GET", "POST"))
def signup():
    isDuplicate = False

    if request.method == 'POST':
        json = request.get_json()

        users = mongo.db.Users;

        user = list(users.find({ "Email": json["email"]}))
        
        if len(user) > 0:
            return {"error": "Account for email already exists."}
        
        users.insert_one({
                "Email": json["email"],
                "Password": json["password"],
                "Bookmarks": [],
            })
        
    return {"error": ''}

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
    return all(any(item in string for string in list2) for item in list1)

@app.route("/filter")
def filter_recipes():
    try:
        collection = mongo.db.Recipes  # Access the "Recipes" collection in the MongoDB database

        # Retrieve the "ingredients" and "page" parameters from the query string
        ingredients = request.args.get("ingredients")
        ingredient_list = ingredients.split(",") if ingredients else []

        # Retrieve the "page" parameter from the query string, default to 1 if not provided
        page = int(request.args.get("page", 1))
        items_per_page = 50

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
