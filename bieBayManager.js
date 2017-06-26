/**
 *              Manager App
 */

var mysql = require('mysql');
var inquirer = require('inquirer');
var itemsList = [];
var listInvent = [];
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
                choices: ['View Products', 'View Low Inventory', 'Add Inventory', 'Add New Product'],
                name: 'menuOptions'
            }


        ]).then(function (response) {
            idChosen = response.menuOptions;

            switch (idChosen) {
                case 'View Products':
                    viewProduct();
                    break;
                case 'View Low Inventory':
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
                    console.log("Inventory with less than 5 items in stock");
                    console.log("");
                    for (var i = 0; i < data.length; i++) {
                        itemsList.push(data[i]);

                        console.log("Item ID#:", itemsList[i].items_id + " Item:", itemsList[i].product_name);
                    }

                })

            }




            function addInventory() {
                connection.query('SELECT `product_name` FROM `products`', function(err, data) {
                    if (err) throw err;
                    for (var i = 0; i < data.length; i++) {
                        listInvent.push(data[i].product_name)
                    }
                    inquirer.prompt([
                        {
                            type: 'list',
                            message: 'Choose a product',
                            name: 'prodChoose',
                            choices: listInvent
                        }, {
                            type: 'input',
                            message: 'Modify product stock: ',
                            name: 'stockQuant'
                        }
                    ]).then(function (res) {
                        connection.query('UPDATE `products` SET `stock_quantity`= ? WHERE `product_name`= ?', [res.stockQuant, res.prodChoose], function (err, data) {
                            if (err) throw err;

                            console.log('Stock updated for ' + res.prodChoose);
                        })
                    })
                })
            }




            function addNewProduct() {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Product to Add',
                        name: 'productName'
                    },
                    {
                        type: 'input',
                        message: 'Department Name',
                        name: 'departmentName'
                    },
                    {
                        type: 'input',
                        message: 'Price',
                        name: 'price'
                    },
                    {
                        type: 'input',
                        message: 'Stock Quantity',
                        name: 'stockInventory'
                    },
                    {
                        type: 'input',
                        message: 'Autographed (1 yes, 0 no)',
                        name: 'autographed'
                    }


                ]).then(function (res)
                {
                    connection.query("INSERT INTO `products` ( `product_name`, `department_name`, `price`, `stock_quantity`, `autographed`) VALUES (?, ?, ?, ?, ?)", [res.productName, res.departmentName, res.price, res.stockInventory, res.autographed], function (err, data) {
                        if (err) throw err;
                        console.log("New Product Added!");


                    })

                })

            }

        })

    }


});


