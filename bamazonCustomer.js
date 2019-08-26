// Requiring NPM packages
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Create connection object variable to initialize database connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

// Connect to server. If successful, run loadProducts function
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

// Function to load products table from database and print results
function loadProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // Makes table of products from database in terminal
    console.log("");
    console.log("************************************************************************************");
    console.log("*****************************BAMAZON PRODUCT LIST***********************************");
    console.log("************************************************************************************");
    console.table(res);
    console.log("************************************************************************************");
    console.log("");



    // Call function to prompt user to select item passing through the "res".
    promptCustomerForItem(res);
  });
}

// Function to prompt customer for product ID
function promptCustomerForItem(inventory) {
  // Prompts user for input and records the selection
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would you like to purchase? [Quit with Q]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      // Call function to check if user wishes to quit program
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      // Does product ID exist? then ask for quantity to purchase
      if (product) {
        // Pass the chosen product to promptCustomerForQuantity function
        promptCustomerForQuantity(product);
      }
      else {
        // Otherwise prompt error message an reload inventory table
        console.log("\nThat item is not in the inventory.");
        loadProducts();
      }
    });
}

// Prompt user for product quantity
function promptCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      // Call function to check if user wishes to quit program
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);

      // Sufficient inventory of chosen product ? prompt error and reload inventory table
      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        loadProducts();
      }
      else {
        // Otherwise run makePurchase function and pass thorugh product id and quantity
        makePurchase(product, quantity);
      }
    });
}

// Fucntion to purchase desired quantity of desired item
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + ? WHERE item_id = ?",
    [quantity, product.price * quantity, product.item_id],
    function(err, res) {
      // Prompt user purchase was successful, run loadProducts
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadProducts();
    }
  );
}

// Fucntion to check if product selected exist in inventory
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // Matching product found ? return the item
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}

// Function to check if user wants to exit program
function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    // Send message to user and exit the current node process
    console.log("Goodbye!");
    process.exit(0);
  }
}
