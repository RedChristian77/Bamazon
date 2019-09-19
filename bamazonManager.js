let mysql = require("mysql");
let inquirer = require("inquirer");


let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  query();
});

//Basic Query for actions for Manager to Take
function query(){
    inquirer.prompt([
        
        {
            type: "choices",
            name: "activity",rer.Separator, "Add to Inventory", new inquirer.
            message: "What is the task you would like to complete?",
            choices: ["View Products for Sale", new inquirer.Separator(),"View Low Inventory", new inquiSeparator, "Add New Product"],
        },
    ]).then(function(search) {
        if(search === "View Products for Sale"){
            viewProducts();
        }
        else if(search === "View Low Inventory"){
            viewLowInventory();
        }
        else if(search === "Add to Inventory"){
            addToInventory();
        }
        else if(search === "Add New Product"){
            addNewProduct();
        }
    })
}

//Function for viewing all Inventory
function viewProducts(){
    //Database, where it pulls all items and loops through posting their information.
    connection.query('SELECT * FROM products', function(err,res){
        if (err) throw err;
        console.log("Start of Iventory List");
        console.log("-----------------------------------------------------------");
        res.forEach(item => {
            console.log("Item ID: " + item.ID);
            console.log("Product Name: "+item.product_name);
            console.log("Department Name: "+item.department_name);
            console.log("Price: "+item.price);
            console.log("# In stock: " + item.stock_quantity);
            console.log("-------------------------------------------------------")
        });
    })
}

//function for viewing items with 5 or less items
function viewLowInventory(){
    //Database query for all items less then 5 left in stock
    connection.query('SELECT * FROM products WHERE ?', [stock_quantity < 5], function(err,res){
        if(err) throw err;
        //For if their is nothing in low inventory
        if(res.length < 1){
            console.log("Their is no items that are low on inventory");
        }
        else{
            //If their is an item low on inventory
            console.log("Start of Low Inventory List");
            res.forEach(item => {
            
            });
        }
    })
}