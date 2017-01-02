import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import morgan from 'morgan';

var app = express();

app.server = http.createServer(app);

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride('X-HTTP-Method-Override'));


var hangman = "hangman",
    hangswer = function(letters = ["", "", "", "", "", "", ""]) {
        return "<br/>Saisissez une lettre <form action='/' method='post'><input name='letter[0]' value='" + letters[0] + "'/><input name='letter[1]' value='" + letters[1] + "'/><input name='letter[2]' value='" + letters[2] + "'/><input name='letter[3]' value='" + letters[3] + "'/><input name='letter[4]' value='" + letters[4] + "'/><input name='letter[5]' value='" + letters[5] + "'/><input name='letter[6]' value='" + letters[6] + "'/><input type='submit'/></form>"
    }

app.get('/', function(req, res) {
    res.send(hangman + hangswer());
});
app.post('/', function(req, res) {
    console.log(req.body.letter);
    var arr = hangman.split('');
    for (let element of arr) {
        for (let letter of req.body.letter) {
            if (letter == element) {
                console.log('trouvé');
            }
        }
    }
    res.send(hangman + hangswer(req.body.letter));

});

process.on('SIGINT', function() {
    console.log('Stopping...');
    process.exit();
});

app.server.listen(8000);
console.log('Server started on port 8000');

export default app;
