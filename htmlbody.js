exports.htmlToBody = () => {
    return `
<!DOCTYPE html>
<html lang="sv">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>PeyDev GuestBook - A NodeJS project</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="js/scriptz.js"></script>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="header">
    <h1>PeyDev - Guestbook</h1>
    <p>En gästbok skapad med hjälp av NodeJS</p>
  </div>
  <nav>
`};

exports.menuLoggedin = () => {
    return `
    <div class="navbar">
      <a href="/">Hem</a>
      <a href="/loggaut">Logga ut</a>
    </div>
    </nav>
    <div class="content">`};
exports.menuLoggedout = () => {
    return `
    <div class="navbar">
      <a href="/">Hem</a>
    </div>
    </nav>
    <div class="content">`};

exports.bodyToHtml = () => {
    return `
  </div><footer>Copyright Peyman Eliassi 2021 - All rights reserved.</footer>
</body>
</html>
`
};

exports.entryForm = (a,b,c) => {
    return `
    <div class="codebox">
    <div class="codebox_p">Användare: `+ a + ` <span id="datum_id"">Datum: `+ b + ` </span>
    </div> <code>` + c + `</code>
    </div><br>`
}

exports.loginForm = () => {
    return `
        <div class="login-form">
        <form action="/loggain" method="POST">
            <input type="text" id='username' name="username" onchange="NameValidate();" placeholder="Användarnamn" required><br>
            <input type="password" id="password" name="password" placeholder="Lösenord" required><br>
            <input type="submit" id="inputSubmit" value="Logga in">
        </form>
        <br>
        <p>Inget konto? <a id="LoginRegister" href="/registera">Registera här!</a></p>
        </div>
`
};

exports.registerForm = () => {
    return `
        <div class="login-form">
        <form action="/registera" method="POST">
            <input type="text" id="username" name="username" onchange="NameValidate();" placeholder="Användarnamn" required><br>
            <input type="email" id='email' name="email" placeholder="Email" required><br>
            <input type="password" id="password" name="password" placeholder="Lösenord" required><br>
            <input type="submit" id="inputSubmit"  value="Registera!">
        </form>
        <br>
         <p>Har du konto redan?<a id="LoginRegister" href="./">Logga in!</a></p>
        </div>
`
};

exports.createForm = (a) => {
    return `
        <div class="login-form">
        <h3>Skapa ett inlägg</h3>
        <form action="/skapa" method="post">
            <input type="text" value=" `+ a +`" disabled><br>
            <textarea id="body" name="body" rows="10" placeholder="Skriv inlägget" required></textarea><br/>
            <input type="submit" value="Skicka">
        </form>
        </div>
`
};

