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
                    choices: ['View products', 'View other'],
                    name: 'menuOptions'
                }



            ]).then(function (response) {
                idChosen = response.menuOptions;

                switch (idChosen) {
                    case 'View products':
                       viewProduct();
                        break;
                    // case 1:
                    //     day = "Monday";
                    //     break;
                    // case 2:
                    //     day = "Tuesday";
                    //     break;
                    // case 3:
                    //     day = "Wednesday";
                    //     break;
                    // case 4:
                    //     day = "Thursday";
                    //     break;
                    // case 5:
                    //     day = "Friday";
                    //     break;
                    // case 6:
                    //     day = "Saturday";
                }
                // connection.query("SELECT `items_id`, `product_name`, `price`, `stock_quantity`, FROM `products` WHERE `items_id` = ?", [idChosen], function(err, data) {
                // //
                // //     console.log("You chose", data[0].product_name, "for $" + data[0].price);
                //
                //
                //
                // })

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

            });

        // })

    }

});