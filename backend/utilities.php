<?php
//Error reports på = -1, av = 0
error_reporting(-1);

//Variable med server request
//$rqstMethod = $_SERVER["REQUEST_METHOD"];
//$contentType = "application/json";

//Kollar så att vald är json
function contentType($type) {
    $contentType = "application/json";
    if($contentType !== "$type") {
        sendJson(
            ["message" => "The API only accepts JSON"],
            400
        );
    }
}

//Kollar så att vald method är det samma som servern har tagit emot
function requestMethod($method) {
    $rqstMethod = $_SERVER["REQUEST_METHOD"];
    if($rqstMethod !== "$method") {
        sendJson(
            ["message" => "Method not allowed"],
            405
        );
    }
}

//1 openJSON function, file argument
function openJSON($fileName) {
    $dataLoadJSON = json_decode(file_get_contents($fileName), true);
    return $dataLoadJSON;
}

//2 SaveToJSON function, file/data argument
function saveToJSON($fileName, $data) {
    $dataSaveJSON = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($fileName, $dataSaveJSON);
    return true;
}

//3 SendJSON function, message/httpcode argument
function sendJSON($message, $statusCode = 200) {
    header("Content-Type: application/json");
    http_response_code($statusCode);
    $json = json_encode($message);
    echo $json;
    exit();
}

//4 getMaxID function, file argument
function getMaxID($fileName) {
    $data = openJSON($fileName);
    $highestID = 0;
    foreach($data as $user) {
        if ($user["id"] > $highestID) {
            $highestID = $user["id"];
            //Skriver ut all id'n
            //echo $highestID;
        }
    }
    //returnerar det sista id't
    return $highestID;
}

//5 getEntryByID function, file/id argument
function getEntryByID($fileName, $id) {
    $data = openJSON($fileName);
    foreach($data as $user) {
        $i = $user["id"];
        $username = $user["username"];
        $password = $user["password"];
        $email = $user["email"];
        $avatar = $user["avatar"];
        if ($i == $id) {
            echo "Username: $username </br>";
            echo "Password: $password </br>";
            echo "Email: $email </br>";
            echo "Avatar: $avatar </br>";
        }
    }
}

//6 getTopCharacters function, limit argument
function getTopCharacters($limit) {
    $data = openJSON("databas/character.json");
    foreach($data as $character) {
        $characterName = $character["name"];
        $highscore = $character["highscore"];
        if($highscore >= $limit) {
            echo "$characterName: $highscore </br>";
        }
    }
}

//7 createUser function, username/email/password argument
function createUser($username, $email, $password, $avatar) {
    $data = openJSON("databas/user.json");
    //Creating an user
    $addUser = [
        "username" => $username,
        "password" => $password,
        "email" => $email,
        "avatar" => $avatar
    ];
    //Creating an ID for the new user
    $highestId = 0;
    foreach($data as $user) {
        if($user["id"] > $highestId) {
            $highestId = $user["id"];
        }
    }
    $addUser["id"] = $highestId + 1;
    //Saving the new user
    array_push($data, $addUser);
    saveToJSON("databas/user.json", $data);
}

//8 updateUser function, id/data argument
function updateUser($id, $data) {
    $json = openJSON("databas/user.json");
    //$id = $requestData["id"];
    $found = false;
    $foundUser = null;
    foreach($json as $index => $user) {
        if($user["id"] == $id) {
            $found = true;
            if(isset($requestData["username"])) {
                $user["username"] = $requestData["username"];
            }
            if(isset($requestData["password"])) {
                $user["password"] = $requestData["password"];
            }
            if(isset($requestData["email"])) {
                $user["email"] = $requestData["email"];
            }
            if(isset($requestData["avatar"])) {
                $user["avatar"] = $requestData["avatar"];
            }
            $json[$index] = $user;
            $foundUser = $user;
            break;
        }
    }
    if($found === false) {
        sendJSON(
            ["message" => "This user $id does not exist"],
            404
        );
    }
    saveToJSON("databas/user.json", $json);
    sendJSON(["message" => "User with $id has been changed in user.json", $foundUser], 200);
}

//9 authenticateUser function, username/password argument
function authenticateUser($username, $password) {
    
}

//10 getNPCByLevel function, level argument
//https://stackoverflow.com/questions/50963708/get-user-level-depending-on-his-her-points-number-php/50963827
function getNPCByLevel($level) {
    /* if($level >= 1) {
        $floor = floor($level);
    } else {
        $floor = floor($level);
    } */
}


// Inspect data (var_dump)
function inspect($inspectVariable) {
    echo "<pre>";
    echo var_dump($inspectVariable);
    echo "</pre>";
}
?>