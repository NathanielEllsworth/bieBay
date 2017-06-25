var mysql = require("mysql");
var inquirer = require("inquirer");

var userOpt = [];


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "biebay"
});


connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    console.log('');
    console.log('WELCOME TO THE BIEBER STORE\n   Products on SALE:');
    console.log('');
    displayItems()
});

function displayItems() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].items_id + '.' + res[i].product_name + '  |  Price: ' + res[i].price);
        }
        console.log('');
        ask1()
    });
}

function ask1() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Which product are you interested today?\n (enter by ID please)',
            name: 'userInput'
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                if (answer.userInput === JSON.stringify(res[i].items_id)) {
                    console.log('good!');
                    userOpt.push(answer.userInput)
                }
            }
            ask2();
            console.log('');
            console.log(userOpt + ' array')
        })
    })
}

function ask2() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'How many units?',
            name: 'userInput'
        }
    ]).then(function(answer) {
        connection.query("SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                if (answer.userInput === JSON.stringify(res[i].stock_quantity)) {
                    console.log('HDP')
                }
            }
        });
    });
}