# Bamazon
### by Jeremy Parra
 
A node.js app mimicking an online store that takes command line input and modifies a MySQL database.
 
## Customer Interface
<hr>

The app has a single interface where the user is prompted to "purchase" items or exit the store.


The customers have the option to select from an inventory list. When a selection is made, the inventory is updated.

![Alt Text](https://github.com/jparradev/Bamazon-CLI/blob/master/Media/Sequence%2001.gif?raw=true)
 
If the requested quantity exceeds the actual quantity, the customer is given an error message.

![Alt Text](https://github.com/jparradev/Bamazon-CLI/blob/master/Media/Sequence%2002.gif?raw=true)
 
If the item ID does not exist, the user is given an error message.

![Alt Text](https://github.com/jparradev/Bamazon-CLI/blob/master/Media/Sequence%2003.gif?raw=true)
 
All changes are registered in the local MySQL database.
 
## Technologies Used
<hr>
 
- The app is interfacing with a local database launched in MySQL on port 3306. 

- MAMP is running the local server for development.
 
- The app also features the NPM package Inquirer which allows the app to prompt the user and take input stored to variables.

