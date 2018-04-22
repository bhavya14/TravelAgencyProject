var MySQLEvents = require('mysql-events');
var dsn = {
    host: 'localhost',
    user: 'root ',
    database: 'dbms',
    password: '1234'
};
var myCon = MySQLEvents(dsn);
var event1 = myCon.add(
    'test.user.Password.Insert',
    function (oldRow, newRow, event) {
        console.log("oldrow : " , oldRow);
        console.log(newRow);
        console.log(event);
    },
    'Active'
);

module.exports = {
    event1 : event1
}
