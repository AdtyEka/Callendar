<?php
$host = 'localhost';
$dbname = 'calendar_db';
$username = 'your_username';
$password = 'your_password';

try {
    $pdo = new PDO("mysql:host=localhost;dbname=your_db", "username", "password");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}