def compare_lists(list1, list2):
    for item in list1:
        found = False
        for string in list2:
            if item in string:
                found = True
                break
        if not found:
            return False
    return True


# user ingredients 
list = ["rice", "cheese"]

# ingredients are listed (True)
list1 = ["4 bags of rice", "2 oz of cheese", "1 tbsp of soy sauce"]

# plural ingredients (True)
list2 = ["4 bags of rice", "2 oz of cheeses", "1 tbsp of soy sauces"]

# no ingredients (False)
list3 = ["4 skinless, boneless chicken breast halves","2 tablespoons butter"]

# empty list (False)
list4 = []

result1 = compare_lists(list, list1)
result2 = compare_lists(list, list2)
result3 = compare_lists(list, list3)
result4 = compare_lists(list, list4)

print(f'{result1}\n{result2}\n{result3}\n{result4}') 
