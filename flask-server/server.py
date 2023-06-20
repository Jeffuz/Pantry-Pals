from flask import Flask, request
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/Pantry_Pals"  # MongoDB connection URI
mongo = PyMongo(app)

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
    
if __name__ == "__main__":
    app.run(debug=True)  # Run the Flask application in debug mode
