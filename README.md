# Bamazon

These console only programs operate directly with the database and will query information and either update or add new items based on the
JS application used. The different uses will be described below for further information.

### BamazonCustomer

This console application uses inquirer to ask the customer using it the ID of the product they wish to buy along with the quantity
of the item they wish to buy. After recieving information, and using the mySQL module, it will query the database to first determine wether or nor their is enough of the stock to make said purchase. If their isnt, it will stop the program there. If their is enough items in
stock it will begin updating the database to take out the amount of the purchase and infroming the user that the purchase was successful 
along with the price of the purchase.

### BamazonManager

This console application uses the module inquirer to give the user selection of its 4 functions which are as follows:

##### View Products for sale
This will query the entire inventory of items for sale and post them in order of ID (which is auto-generated) along with all their relevent information.

#### View Low Inventory
This will query the database and only pull out information on items that are less then 5 left of quantity, along with all of its information as well.

#### Add to Inventory
This will be used for restocking said items, which requires the ID of the item being restocked along with the amount.

#### Add New Product
This will use inquirer as well and ask for all the information on the new item being added to the database as well.
