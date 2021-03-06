/* vi laddar in moduler först som vi ska använda */
const fs = require('fs'); // Modul för att läsa och skriva in filer.
const express = require('express'); // Modul Express ramverket
const http = require('http'); // Modul för att skapa en webbserver
const bcrypt = require('bcrypt'); /// Modul för att hasha lösenorden ---- för framtida ändringar.
const bodyParser = require('body-parser'); // Modul för att göra om json filen till objekt
const session = require('express-session'); // Modul för skapa sessioner när användaren loggar in.
const htmlModel = require("./htmlbody.js"); // importerar funktioner som innehåller html kroppen


const app = express(); // gör om express ramverket till en variabel så vi kan använda den som app.
const server = http.createServer(app); // gör om http modulen till variabeln server så vi kan skapa en server.

// gör om informationen som kommer genom formulär osv.
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public")); // vi gör mappen public åtkomlig för andra.

const users = (JSON.parse(fs.readFileSync('user.json'))); // Vi laddar in json filen user som vi kommer ha våra användarinformation på.
const guestbook = (JSON.parse(fs.readFileSync('guestbook.json'))); // Vi laddar in json filen user som vi kommer ha våra användarinformation på.

// skapar en session när användaren loggar in sen.
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// vi skapar en validator funktion för onskefulla input för att slippa kopiera och klistra det överallt som behövs.
let valiDator = (input) => {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        if (input[i] == '<')
            output += '&lt;';
        else
            output += input[i];
    }
    return output;
}



// När de gör en request när de besöker sidan, så tar vi emot requesten och kollar om de är först inloggade, annars så skickar vi de till inloggning sidan.
app.get('/', function(req, res) {
    if (req.session.loggedin == true) // om denna är true så betyder de att de har loggat in.
        res.redirect('/start') // response med redirect till den riktiga start sidan.
    else
        res.send(`${htmlModel.htmlToBody()}${htmlModel.menuLoggedout()}  ${htmlModel.loginForm()}  ${htmlModel.bodyToHtml()}`); // skapat en html sida genom importerade funktioner.
});

// När användaren är inloggad så kommer de komma till den riktiga start sidan.
app.get('/start', function(req, res) {
            if (req.session.loggedin == true) // kollar om användaren är inloggad genom att kolla om sessionen är skapad.
                res.send(`${htmlModel.htmlToBody()}${htmlModel.menuLoggedin()} ${htmlModel.createForm(`${req.session.username}`)} <br> 
         ${guestbook.map(function (entry) {
            return ` ${htmlModel.entryForm(`${entry.Namn}`, `${entry.Datum}`, `${entry.Medelande}`)}
                    `
        }).join('')}  ${htmlModel.bodyToHtml()}`); //////// vi skapar en html sida, sedan med hjälp av en map funktion kopierar objektet guestbook som innehåller inläggen. 
    else
        res.redirect('/'); // annars skickas dem till logga in sidan. 

});



app.post('/loggain', async function (req, res) {  // när formuläret skickas, så kommer det hit genom POST
    let userAccount = users.find(user => req.body.username === user.username)  // skapar en ny variabel till ger den att kolla igenom vår json fil genom arrow expresson, där vi kollar om inmatningen finns i json filen.
    if (userAccount) {  // om användarnamnet finns. alltså då kommer den returnera true.
        let userPassword = userAccount.password;  // skapar en variabel userPassword för att underlätta.
        const matchPassword = await bcrypt.compare(req.body.password, userPassword);  // vi hashar tillbaks det sparade lösenordet och jämför med den nyligen imatade genom modulen bcrypt
        console.log(matchPassword);  // feedback som returnerar true ifall de stämmer.

        if (matchPassword) {  // om användarnamn och lösenord stämmer eller har hittats. (true, så kmr den fortsätta annars hoppar till else.)
            req.session.loggedin = true;  // vi skapar en session,.
            req.session.username = req.body.username; /// vi sparar användarnamnet som är inmatad med session namnet som vi kan använda senare.
            res.redirect('/start')  // skickar iväg till gästboken
            console.log(`Användare: ${req.session.username} har loggat in.`)  // lägger till i konsolen för roligt skull.
        }
        else 
            res.redirect('/'); // om de har skrivit in fel användarnamn eller lösenord så skickar vi dem tillbaks till logga in sidan.
        console.log(`Användaren ${userAccount.username} skrev in fel lösen.`)
    }
    else
    res.redirect('/');  // ifall användarnamnet inte hittades så blir de redirectade tillbaks till inloggning sidan.
    console.log('Någon försökte logga in med ett användarnamn som inte hittades.') // feedback för skaparen.
});

app.get('/loggaut', function (req, res) {   // skapar en sida för när användaren vill logga ut.
    console.log(`Användare: ${req.session.username} har loggat ut.`) // skriver i konsolen för feedback osv.
    req.session.destroy(); // vi förstör session, så de inte får tillgång till gästboken utan att logga in igen.
    res.redirect('/'); // skickar till logga in sidan igen.
});

app.get('/registera', function (req, res) {  // skapar en sida som skickar iväg användaren till registering htmlen med formulär.
    res.send(`${htmlModel.htmlToBody()} ${htmlModel.menuLoggedout()}  ${htmlModel.registerForm()}  ${htmlModel.bodyToHtml()}`);// skapar en html sida för registering med hjälp av importerade funktioner.
});

app.post('/registera', async function (req, res) { // För registeringsidans formulär. 
    let userAccount = users.find((user) => req.body.username === user.username); // vi gör som förut som vi gjorde på inloggning sidan.
    let userEmail = users.find((user) => req.body.email === user.email);  // vi testar om de emailet finns redan i listan.
    if (!userAccount && !userEmail) { // om användarnamnet och emailen är ledigt.
        const hashPassword = bcrypt.hashSync(req.body.password, 8);  // hashar lösenordet 8^2 rundor för att de ska bli säkert., .
        let newUser = {  // vi skapar en objekt
            username: req.body.username, // där username, email och lösenord ska vara inmatningarna från formuläret.
            email: req.body.email,  
            password: hashPassword // det hashade lösenordet.
        }
        users.push(newUser); // lägg till det nya objektet i den vanliga objekt.
        fs.writeFileSync('user.json', JSON.stringify(users, null, 4)) // vi skriver in den nya objektet tillsammans med de gamla med mellanrum(4) för att de ska vara läsbart.

        res.redirect('/');  // feedback när kontot är skapad.
        console.log(`Användare: ${req.body.username} och ${req.body.email} är skapad!`)  // feedback för konsolen.
    }
    else
        res.send('Denna användarnamn eller email är redan upptaget! <br> <a href="./registera">Försök igen!</a>') // feedback om att någon av dessa är upptaget.

});

// detta bort kommenterade koden var förut när jag använde en seperat sida för att användare ska göra in lägg.
// app.get('/skapa', function (req, res) {   // request sidan när de vill komma åt /skapa
//     if (req.session.loggedin == true) //
//         res.send(`${htmlModel.htmlToBody()}  ${htmlModel.createForm()}  ${htmlModel.bodyToHtml()}`); // vi skickar skapa.html om de är inloggade.
//     else
//         res.redirect('/'); // annars tillbaks till inloggning sidan.
// });

app.post('/skapa', function (req, res) {  // POST för skapa inlägg sidan. formuläret.
    if (req.session.loggedin == true) {  // om användaren är inloggad
        let entryMessage = req.body.body; // deklarerar  entryMEssage som inmatade medelande.
        let newEntry = {   // skapar ny inlägg objekt
            Namn: req.session.username,  // vi hämtar deras användarnamn från sessionen de har loggat in med.
            Medelande: valiDator(entryMessage),  // medelandet.
            Datum: new Date().toLocaleDateString()  // datumet.
        }
        guestbook.push(newEntry) // lägger in i guestbook objektet
        fs.writeFileSync('guestbook.json', JSON.stringify(guestbook, null, 4)) // sparar det nya guestbooket.
        console.log(`Användaren: ${req.session.username} har skapat ett inlägg!`)  // feedback för consolen.
        res.redirect('/start');  // vi skickar tillbaks användaren till gästbok sidan.
    }
    else
        res.redirect('/'); // annars får de logga in.s
});


// startar servern.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});