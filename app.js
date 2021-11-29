
/* vi laddar in moduler först som vi ska använda */
const fs = require('fs'); // Modul för att läsa och skriva in filer.
const express = require('express'); // Modul Express ramverket
const http = require('http'); // Modul för att skapa en webbserver
const bcrypt = require('bcrypt'); /// Modul för att hasha lösenorden
const path = require("path"); // Modul för att sökvägar och mappar.
const bodyParser = require('body-parser'); // Modul för att göra om json filen till objekt
const session = require('express-session'); // Modul för skapa sessioner när användaren loggar in.

const app = express(); // gör om express ramverket till en variabel så vi kan använda den som app.
const server = http.createServer(app); // gör om http modulen till variabeln server så vi kan skapa en server.

app.use(bodyParser.urlencoded({ extended: false }));


const users = (JSON.parse(fs.readFileSync('user.json'))); // Vi laddar in json filen user som vi kommer ha våra användarinformation på.
module.exports = users;  // vi gör så den är tillgänglig för att skrivas.

// start sidan
app.get('/', function (req, res) {
    response.sendFile(path.join(__dirname, './public', 'loggain.html'));
});


// startar servern.
server.listen(3000, function () { 
    console.log("Server är startad på port: 3000");
});