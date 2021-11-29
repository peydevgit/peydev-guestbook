# peydev-guestbook
guestbook node.js express login

////////////////////////////////////////////////////////////////
Vi har fått i uppgift att skapa en gästbok med NodeJS från vår Javascript lärare - Holger Rosencrantz.
Vad ska en gästbok göra? En besökare ska kunna gå in på hemsidan sedan fylla inmatningar på hemsidan
och skicka det till servern som sedan sparar information och skriver ut på sidan.

Jag har sedan tidigare gjort gästbok fast inte i denna nivå. Det blir spännande erfarenhet!

Min vision och funktioner som gästboken är följande:
En användare som besöker sidan ska bli ombedd att logga in direkt från början.
Om användaren inte har ett konto så ska de kunna få registera.
När de har registerat och loggat in så ska de komma in till gästboken.
Gästboken sidan ska ha inmatningar för att skapa ett inlägg men även under inmatningarna
ska inläggen som har skapats visas.

Funktioner:
Spara informationet i JSON fil
Validering av inmatningar som anges av användaren. 
Skapa konto
Logga in
Logga ut
Skapa in lägg i gästboken
Visa inläggen
Användaren ska vara inloggad tills de har loggat eller varit en viss tid där.

Lite mer advancerade funktioner.
Hasha lösenordet
