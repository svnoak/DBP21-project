<?php
//Error reports på = -1, av = 0
error_reporting(-1);

//Variable med server request
//$rqstMethod = $_SERVER["REQUEST_METHOD"];
//$contentType = "application/json";

//Checks if contenttype is set to application/json
function contentType($type) {
    $contentType = "application/json";
    if($contentType !== "$type") {
        sendJson(
            ["message" => "The API only accepts JSON"],
            400
        );
        exit();
    }
}

//Checks if the method is the same as the server has requested
function requestMethod($method) {
    $rqstMethod = $_SERVER["REQUEST_METHOD"];
    if($rqstMethod !== "$method") {
        sendJson(
            ["message" => "Method not allowed"],
            405
        );
        exit();
    }
}

//1 openJSON function, file argument
function openJSON($fileName) {
    $dataLoadJSON = json_decode(file_get_contents($fileName), true);
    return $dataLoadJSON;
}

//2 SaveToJSON function, file/data argument
function saveToJSON($fileName, $data) {
    copy($fileName, $fileName . "_backup");
    $json = json_encode($data, JSON_PRETTY_PRINT);
    if (file_put_contents($fileName, $json) ) {
    sendJSON("Successfully saved");
    } else{
    sendJSON("Writing to file failed", 500);
    }
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
    //Fetching data from database
    $data = openJSON($fileName);
    //Setting necessary variables
    $highestID = 0;
    //Looping through given data and returns the highest ID
    foreach($data as $user) {
        if ($user["id"] > $highestID) {
            $highestID = $user["id"];
            //For testing in insomnia
            //echo $highestID;
        }
    }
    //returns the last ID
    return $highestID;
}

//5 getEntryByID function, file/id argument
function getEntryByID($fileName, $id) {
    //Fetching data from database
    $data = openJSON($fileName);

    $column = array_column($data, "id");
    $index = array_search($id, $column);

    return $data[$index];
    }

//6 getChars function, amount argument
function getChars($amount){
    //Fetching data from database
    $data = openJSON("databas/character.json");
    //Fetching all arrays with the key "highscore"
    $column = array_column($data, "highscore");
    //Sorting the arrays by the key "highscore"
    array_multisort($column, SORT_DESC, $data);
    //Creating a new associative array with given amount of arrays
    array_splice($data, $amount);
    return $data;
}

//6.5 updateLeaderboard, name/highscore argument
function updateLeaderboard($name, $highscore) {
    //Fetching data from database
    $data = openJSON("databas/leaderboard.json");
    //Creating a user
    $updateLeaderboard = [
        "name" => $name,
        "highscore" => $highscore
    ];
    
    //Saving the new user
    array_push($data, $updateLeaderboard);
    saveToJSON("databas/leaderboard.json", $data);
}

//7 createUser function, username/email/password argument
function createUser($username, $password, $email, $avatar) {
    //Fetching data from database
    $data = openJSON("databas/user.json");
    //Creating a user
    $addUser = [
        "username" => $username,
        "password" => $password,
        "email" => $email,
        "avatar" => $avatar
];

    foreach($data as $user) {
	    if ($user["username"] == $username) {
		    return false;
	    }
    }
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
    $filePath = "databas/user.json";
    if(file_exists($filePath)) {
        $json = openJSON("$filePath");

        $found = false;
        $foundUser = null;

        foreach($json as $index => $user) {
            if($user["id"] == $id) {
                $found = true;
                if(isset($data["username"])) {
                    $user["username"] = $data["username"];
                }
                if(isset($data["password"])) {
                    $user["password"] = $data["password"];
                }
                if(isset($data["email"])) {
                    $user["email"] = $data["email"];
                }
                if(isset($data["avatar"])) {
                    $user["avatar"] = $data["avatar"];
                }
                $json[$index] = $user;
                break;
            }
        }

        if($found === false) {
            sendJSON(
                ["message" => "This user $id does not exist"],
                404
        );
        exit();
        }

        saveToJSON("databas/user.json", $json);
        sendJSON(["message" => "User with $id has been changed in user.json"], 200);
    } else {
        sendJSON(
            ["message" => "File does not exist"],
            404
        );
    }
}

//9 authenticateUser function, username/password argument
function authenticateUser($username, $password) {
    

}

//10 getNPCByLevel function, level argument
function getNPCByLevel($level) {
    //Fetching data from database
    $data = openJSON("databas/monster.json");
    //Looping through npc's in datbase and returning the monster/s with given level requirement
    foreach($data as $npc) {
        $npcLvl = $npc["level"];
        if ($npcLvl == $level) {
            return $npc;
        }
    }
}


// Inspect data (var_dump)
function inspect($inspectVariable) {
    echo "<pre>";
    echo var_dump($inspectVariable);
    echo "</pre>";
}
?>
