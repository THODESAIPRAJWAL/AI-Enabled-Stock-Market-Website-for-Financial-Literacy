const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const ejs = require("ejs");
const csv = require('csv-parser');
const fs = require('fs');



const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(request, response){
    response.sendFile(__dirname + "/public/index.html");
})

c_sym = "";
slist = ['MSFT','AMZN','GOOG','IBM'];

app.post("/", function(request, response){
    c_sym = request.body.nm;
    if (request.body.type == "Stock"){
        response.redirect("/stock");
    } else if(request.body.type == "LSTM"){
        response.redirect("/lstm");
    }  else if(request.body.type == "CV"){
        response.redirect("/cv");
    } else if(request.body.type == "NLP"){
        response.redirect("/nlp");
    } else {
        response.send("<h1>Something is worng with your choise of Prediction</h1>")
    }
})

app.get("/lstm", function(request, response){
    somoevariable = c_sym + ".html"
    response.render("LTTM.ejs", {
        sym: c_sym
    })
})


app.get("/nlp", function(request, response){
    somoevariable = c_sym + ".html"
    const results = [];
    fs.createReadStream('D:/WebDevelopment/Self Projects/tarp/public/nlp/'+c_sym+'.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        response.render("NLP.ejs", {
            sym: c_sym,
            somevariable: somoevariable,
            data: results
        });
    });
})

app.get("/cv", function(request, response){
    somoevariable = c_sym + ".png"
    response.render("CV.ejs", {
        sym: c_sym
        //somevariable: somoevariable,
        //predict: predict
    })
})

app.get("/stock", function(request, response){
    somoevariable = c_sym + ".html"
    const results = [];
    fs.createReadStream('D:/WebDevelopment/Self Projects/tarp/public/nlp/'+c_sym+'.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        response.render("stock.ejs", {
            sym: c_sym,
            somevariable: somoevariable,
            data: results
        });
    });
})

app.listen(3000, function(){
    console.log("server started at port 3000");
});