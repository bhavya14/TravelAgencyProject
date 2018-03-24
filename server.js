const bodyParser = require("body-parser")
const express  = require('express')
var login = require('./routes/loginroutes');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();
// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

router.post('/register',login.register);
router.post('/login',login.login)
app.use('/api', router);

app.listen(3000);
