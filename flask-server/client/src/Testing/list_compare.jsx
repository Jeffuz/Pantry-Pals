// function compareLists(list1, list2) {
//     for (let item of list1) {
//       let found = false;
//       for (let string of list2) {
//         if (string.includes(item)) {
//           found = true;
//           break;
//         }
//       }
//       if (!found) {
//         return false;
//       }
//     }
//     return true;
//   }

  function compareLists(list1, list2) {
    let itemSet = new Set(list2);
    for (let item of list1) {
      let found = false;
      for (let string of itemSet) {
        if (string.includes(item)) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  }
  
  // User ingredients
  let list = ["rice", "cheese"];
  
  // Ingredients are listed (True)
  let list1 = ["4 bags of rice", "2 oz of cheese", "1 tbsp of soy sauce"];
  
  // Plural ingredients (True)
  let list2 = ["4 bags of rice", "2 oz of cheeses", "1 tbsp of soy sauces"];
  
  // No ingredients (False)
  let list3 = ["4 skinless, boneless chicken breast halves","2 tablespoons butter"];
  
  // Empty list (False)
  let list4 = [];
  
  let result1 = compareLists(list, list1);
  let result2 = compareLists(list, list2);
  let result3 = compareLists(list, list3);
  let result4 = compareLists(list, list4);
  
  console.log(result1);
  console.log(result2);
  console.log(result3);
  console.log(result4);
  