# Bamazon
### by Jeremy Parra

Node.js app mimicking an online store that takes command line input and modifys a MySQL database.

The app has three different interfaces that each interact with the DB: cutomer, manager, and supervisor. First the customer interface.

### Customer Interface
<hr>
The customers have the option to select from an inventory list. When a selection is made, the invetory is updated.

If the requested quantitiy exceeds the actual quantitiy, the customer is given an error message.

If the item ID des not exist, the user is given an error message.

All changes are registered in the local MySQL database.

### Manager Interface
<hr>
