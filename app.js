const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const client = require("twilio")("AC7c185fef6c2016430a112340a96cd294", "7e492e2a4dabd7ef805d8498e55e40bc");
const port = process.env.PORT || 3000;
const numbers = ['+19087238650']; // , '+18565620860'
const bodyParser = require('body-parser')
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({     
  extended: true
}));

function sendAlerts(sender, type) {
    numbers.forEach(async number => {
      const message = await client.messages.create({
        body: 'eMessage notification from ' + sender.toUpperCase() + ': ' + type.toUpperCase(),
        from: '+13854104246',
        to: number
      });
    });
} 

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/em.html");
});
app.post('/send', function(req, res) {
    let pwd = req.body.password;
    if(pwd.length == 4) {
        switch(pwd) {
            case "1414":
                res.sendFile(__dirname + "/logan.html");
                break;
            case "7072":
                res.sendFile(__dirname + "/rickey.html");
                break;
            default:
                res.sendFile(__dirname + "/fail.html");
                break;                                
        }
    }
});
app.post('/sendAlert', function(req, res) {
    switch(req.body.name) {
        case "Logan": 
            res.sendFile(__dirname + "/success.html");
            sendAlerts("Logan", req.body.alert);
            break;
        case "Rickey": 
            res.sendFile(__dirname + "/success.html");
            sendAlerts("Rickey", req.body.alert);
            break;        
    }
});

http.listen(port, () => console.log('listening on port ' + port));