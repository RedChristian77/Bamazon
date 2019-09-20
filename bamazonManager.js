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
            type: "list",
            name: "activity",
            message: "What is the task you would like to complete?",
            choices: ["View Products for Sale", new inquirer.Separator(),"View Low Inventory",new inquirer.Separator, "Add to Inventory",new inquirer.Separator, "Add New Product"],
        },
    ]).then(function(search) {
        if(search.activity === "View Products for Sale"){
            viewProducts();
        }
        else if(search.activity === "View Low Inventory"){
            viewLowInventory();
        }
        else if(search.activity === "Add to Inventory"){
            addToInventory();
        }
        else if(search.activity === "Add New Product"){
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
            console.log("Item ID: " + item.id);
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
    connection.query('SELECT * FROM products WHERE stock_quantity <= 5', function(err,res){
        if(err) throw err;
        //For if their is nothing in low inventory
        if(res.length < 1){
            console.log("Their is no items that are low on inventory");
        }
        else{
            //If their is an item low on inventory
            console.log("Start of Low Inventory List");
            console.log("----------------------------------------");
            res.forEach(item => {
                console.log("Item ID: " + item.id);
                console.log("Product Name: "+item.product_name);
                console.log("Department Name: "+item.department_name);
                console.log("Price: "+item.price);
                console.log("# In stock: " + item.stock_quantity);
                console.log("-------------------------------------------------------")
            });
        }
    connection.end();
    })
}

function addNewProduct(){
    inquirer.prompt([
        
        {
            type: "input",
            name: "productname",
            message: "What is the name of the Product you are Adding?",
        },
        {
            type:"input",
            name:"department",
            message: "What is the Department this item belongs to?",
        },
        {
            type: "input",
            name: "priceofItem",
            message: "what is the Price of the Item?"
        },
        {
            type:"input",
            name: "stockAmount",
            message: "How many are you adding to the stock?",
        }
    ]).then(function(search) {
        connection.query('INSERT INTO products set ?',{
            product_name: search.productname,
            department_name: search.department,
            price: search.priceofItem,
            stock_quantity : search.stockAmount
        }, function (err,result){
            if(err) throw err;
            console.log("Your Item has been Successfully added");
            connection.end();
        }
    )})}
    

function addToInventory(){
    inquirer.prompt([  
        {
            type: "input",
            name: "productID",
            message: "What is the ID of the product of wish to restock?",
        },
        {
            type: "input",
            name: "amountToAdd",
            message: "How many would you like to add to the stock?"
        }
    ]).then(function(search) {
        connection.query('SELECT * FROM PRODUCTS WHERE ?', {id: search.productID}, function(err,res) {
            if (err) throw err;
            if(res === undefined || res === null){
                console.log("Item does not exist");
                connection.end();
            }
            let total = res[0].stock_quantity + search.amountToAdd;
            connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: total}, {ID: search.productID}], function(err,res) {
                if (err) throw err;
                console.log('Added New Products');
                connection.end();
            })
        })
    })
}