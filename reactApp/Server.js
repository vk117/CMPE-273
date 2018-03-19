var express = require('express');
var parser = require('body-parser');
var app = express();
var http = require('http');
var cors = require('cors');

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(cors());

var value1,value2,op,result;

function perform(op){
    switch(op){
        case '+':
        return value1 + value2;
        break;
        
        case '-':
        return value1 - value2;
        break;

        case '*':
        return value1*value2;
        break;

        case '/':
        return value1/value2;
        break;

        default:
        return 'Wrong op';

    }
}

app.post('/op', function(req, res){
    value1 = req.body.param1;
    value2 = req.body.param2;
    op = req.body.operation;
    result = perform(op);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({a: Number(result).toFixed(3)}));
});

app.listen(8080, function(){
    console.log('web server listening');
})

