/**
 *              Manager App
 */

var mysql = require('mysql');
var inquirer = require('inquirer');
var itemsList = [];
var idChosen;


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bieBay'
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("");
    console.log("");
    console.log("");
    console.log("-----------------------------------");
    console.log("Welcome Bieber FEVER Manager!");
    console.log("-----------------------------------");
    console.log("");
    console.log("Check out and manage your Products and Inventory!");
    console.log("");

    initialPrompt();
    function initialPrompt() {


        console.log("");
        console.log("");
        inquirer.prompt([
            {
                type: 'list',
                message: 'Pick a management option from the list:',
                choices: ['View Products', 'View Inventory', 'Add Inventory', 'Add New Product'],
                name: 'menuOptions'
            }


        ]).then(function (response) {
            idChosen = response.menuOptions;

            switch (idChosen) {
                case 'View Products':
                    viewProduct();
                    break;
                case 'View Inventory':
                    viewInventory();
                    break;
                case 'Add Inventory':
                    addInventory();
                    break;
                case 'Add New Product':
                    addNewProduct();
                    break;
                default:
                    console.log("incorrect choice");


            }


            function viewProduct() {
                connection.query("SELECT `items_id`, `product_name`, `price` FROM `products`", function (err, data) {
                    if (err) throw err;
                    console.log("View Products For Sale");
                    for (var i = 0; i < data.length; i++) {
                        itemsList.push(data[i]);
                        console.log("Item ID: ", itemsList[i].items_id + ":", itemsList[i].product_name);
                    }

                })
            }


            function viewInventory() {
                connection.query("SELECT `items_id`, `product_name`, `price` FROM `products` WHERE stock_quantity <= 4", function (err, data) {
                    if (err) throw err;
                    console.log("Items with less than 5 in Inventory");
                    console.log("");
                    data <= 5;
                    for (var i = 0; i < data.length; i++) {
                        itemsList.push(data[i]);

                        console.log("Item ID: ", itemsList[i].items_id + " Item", itemsList[i].product_name);
                    }

                })
            }


            function addInventory() {
                connection.query("SELECT `items_id`, `product_name`, `price` FROM `products`", function (err, data) {
                    if (err) throw err;
                    console.log("View Products For Sale");
                    for (var i = 0; i < data.length; i++) {
                        itemsList.push(data[i]);
                        console.log("Item ID: ", itemsList[i].items_id + ":", itemsList[i].product_name);
                    }

                })
            }


            function addNewProduct() {
                inquirer.prompt([

                    {
                        type: 'input',
                        message: 'product to add',
                        name: 'productName'
                    },
                    {
                        type: 'input',
                        message: 'department_name',
                        name: 'departmentName'
                    },
                    {
                        type: 'input',
                        message: 'price',
                        name: 'price'
                    },
                    {
                        type: 'input',
                        message: 'stock quantity',
                        name: 'stockInventory'
                    },
                    {
                        type: 'input',
                        message: 'autographed',
                        name: 'autographed'
                    }


                ]).then(function (res)
                {
                    connection.query("INSERT INTO `products` ( `product_name`, `department_name`, `product_name`, `price`, `stock_quantity`, `autographed`) VALUES (?, ?, ?, ?, ?)", [res.productName, res.departmentName, res.price, res.stockInventory, res.autographed], function (err, data) {
                        if (err) throw err;
                        console.log("View Products For Sale");


                    })
                })

            }



        })

    }
});

// prompt


//stock quantity

//autograph
