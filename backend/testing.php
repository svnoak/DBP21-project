<?php
    require_once("utilities.php");

    /* $array = openJSON("user.json");
    inspect($array); */

    //Hämtar en användare med valt ID
    echo "<h2>Hämta användare med valt ID</h2>";
    $data = getEntryByID("databas/user.json", 2);
    inspect($data);

    //Hämtar användaren med högst ID
    echo "<h2>Hämta högsta ID</h2>";
    $data = getMaxID("databas/user.json");
    inspect($data);

    //Hämtar alla characters med en score inom xxx
    echo "<h2>Hämta characters med en min score av 200</h2>";
    $data = getTopCharacters(200);
    inspect($data);

    //Function som skapar en användare med POST
    echo "<h2>Create user test</h2>";
    //createUser("hej", "hej@hej.hej", "hej123", "image");
    //$data = getEntryByID("user.json", getMaxID("user.json"));
    //inspect($data);

    //Uppdatera en användare
    echo "<h2>Uppdatera en användare</h2>";
    echo "<form action='utilities.php' method='PATCH' accept-charset='utf-8'>";
        echo "Username:</br>";
        echo "<input type='text' name='username'></br>";
        echo "Password:</br>";
        echo "<input type='password' name='password'></br>";
        echo "Email:</br>";
        echo "<input type='email' name='email'></br>";
        echo "Avatar:</br>";
        echo "<input type='file' name='avatar'></br>";
        echo "<button>Submit</button>";
    echo "</form>";
    if($rqstMethod === "PATCH") {
        
        updateUser(1,$data);
    }
?>