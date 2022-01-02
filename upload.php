<?php

$dbHost     = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName     = 'soundspace';



// new filename
$filename = 'pic.jpeg';

$url = '';
if(move_uploaded_file($_FILES['webcam']['tmp_name'],'upload/'.$filename) ){
   $url = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . '/upload/' . $filename;
}

// Return image url
echo $url;