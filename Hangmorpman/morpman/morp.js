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

function kill(bill = ["", "", "", "", "", "", "", "", ""], counter = 0) {
    return "<form action='/' method='post'><table><tr><td><input value='" + bill[0] + "' name='bill[0]'/></td><td><input value='" + bill[1] + "' name='bill[1]'/></td><td><input value='" + bill[2] + "' name='bill[2]'/></td></tr><tr><td><input value='" + bill[3] + "' name='bill[3]'/></td><td><input value='" + bill[4] + "' name='bill[4]'/></td><td><input value='" + bill[5] + "' name='bill[5]'/></td></tr><tr><td><input value='" + bill[6] + "' name='bill[6]'/></td><td><input value='" + bill[7] + "' name='bill[7]'/></td><td><input value='" + bill[8] + "' name='bill[8]'/></td></tr></table><input name='counter' type='hidden' value='" + counter + "'><input name='button' type='submit'></form>";
}
app.get('/', function(req, res) {
    res.send(kill());
});

app.post('/', function(req, res) {
    console.log(req.body.bill);
    req.body.counter = Number(req.body.counter) + 1;
    let counter = 0;
    for (let i of req.body.bill) {
        if (i !== "") {
            counter++;
        }
    }
    if (counter == req.body.counter) {
        res.send(kill(req.body.bill, req.body.counter));
    } else {
      res.sendStatus(501);
    }

});

process.on('SIGINT', function() {
    console.log('Stopping...');
    process.exit();
});

app.server.listen(8000);
console.log('Server started on port 8000');

export default app;
