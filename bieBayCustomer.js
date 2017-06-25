var mysql = require('mysql');
var inquirer = require('inquirer');
var itemsList = [];
var idChosen;
var quantityChosen;
var total;
var changeStock;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bieBay'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("");
    console.log("");
    console.log("");
    console.log("-----------------------------------");
    console.log("Welcome to the Bieber FEVER Store!!!");
    console.log("-----------------------------------");
    console.log("");
    console.log("What would you like to buy today?");
    console.log("");
    initialPrompt();
    function initialPrompt() {
        connection.query("SELECT `items_id`, `product_name`, `price`, `autographed` FROM `products`", function(err, data) {
            if (err) throw err;
            for (var i = 0; i < data.length; i++) {
                itemsList.push(data[i]);

                // console.log(data[i].stock_quantity)
                if (data[i].autographed == 1){
                    console.log(itemsList[i].items_id + ":", itemsList[i].product_name, "$" + itemsList[i].price, "(Autographed)");

                }
                else {
                    console.log(itemsList[i].items_id + ":", itemsList[i].product_name, "$" + itemsList[i].price);
                }
            }
            console.log("");
            console.log("");
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Pick an item by number:',
                    name: 'itemChoice'
                }
            ]).then(function(response) {
                idChosen = response.itemChoice;
                connection.query("SELECT `items_id`, `product_name`, `price`, `stock_quantity`, `autographed` FROM `products` WHERE `items_id` = ?", [idChosen], function(err, data) {
                    if (data[0].autographed === 1) {
                        console.log("You chose", data[0].product_name, "for $" + data[0].price, "(Autographed)");

                    } else {
                        console.log("You chose", data[0].product_name, "for $" + data[0].price);
                    }

                    checkAmount();
                    function checkAmount () {
                        inquirer.prompt([
                            {
                                type: 'input',
                                message: 'How many ' + data[0].product_name + '\'s would you like?',
                                name: 'quantity'
                            }
                        ]).then (function(response) {
                            quantityChosen = response.quantity;
                            if (data[0].stock_quantity > quantityChosen) {
                                total = data[0].price * quantityChosen;
                                changeStock = data[0].stock_quantity - quantityChosen;

                                console.log("Your total is: $" + total);
                                connection.query("UPDATE `products` SET `stock_quantity` = ?  WHERE `items_id` = ?", [changeStock, idChosen])
                            }
                            else {
                                console.log("Sorry! We do not have enough inventory for your request");
                                console.log("We have", data[0].stock_quantity, "total in stock");
                                console.log("Please try a different amount");
                                checkAmount();
                            }

                        })
                    }
                })
            })
        })
    }

});