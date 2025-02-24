const express = require('express');
const {
   Repository
} = require('./repository');
const app = express();

app.get('/', async (_, res) => {
   const selectSql = `SELECT * FROM people`;
   const people = await Repository.query(selectSql);

   const title = '<h1>Full Cycle Rocks!</h1>';
   const list = `
    <ul>
      ${people.map(p => `<li>${p.name}</li>`).join('')}
    </ul>
  `;

   res.send(title + list);
});


var sql = "CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id))";
Repository.query(sql, function (err, result) {
   if (err) throw err;
   console.log("Table created");
});


app.listen(3000, () => {
   console.log('Running on port 3000');

   var sql = "INSERT INTO people (name) values ('Fulano'), ('Beltrano'), ('FullCycle'), ('Desafio'), ('Challenge')";
   Repository.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Line inserted");
   });

});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
   console.log('Received kill signal, shutting down gracefully');

   var sql = "DELETE FROM people";
   Repository.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Line deleted");
   });
}