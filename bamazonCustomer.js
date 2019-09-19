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


function query(){
    inquirer.prompt([
        
        {
            type: "input",
            name: "itemSearch",
            message: "What is the item you are seraching for (by id)?",
        },
        {
            type:"input",
            name:"purchaseAmount",
            message: "How many of these would you like to purchase?"
        }
    ]).then(function(search) {
        console.log("Looking up your request");
        
        connection.query('SELECT * FROM products WHERE ?', {id: search.itemSearch}, function(err,res){
            if(err) throw err;
            if(res[0].stock_quantity < search.purchaseAmount){
                console.log("Not enough product in stock");
                connection.end();
            }
            else{
                console.log("Completing your purchase!");
                let pricetotal = search.purchaseAmount * res[0].price;
                console.log("Your total comes to: $" + pricetotal);
                let newstock = parseInt(res[0].stock_quantity) - parseInt(search.purchaseAmount);
                updateProduct(search.itemSearch, newstock);
            }
        })


      });
}

function updateProduct(test, stockamount) {
  let query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: stockamount
      },
      {
        ID: test
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log("Purchase Complete, Stock has been updated");
      connection.end();
    }
  );

}
