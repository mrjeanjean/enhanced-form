<?php
// WARNING
// Don't use this in production!!!
header("Access-Control-Allow-Origin: *");

$filename = $_FILES['file']['name'];
$location = __DIR__ . "/files/" . $filename;

$data = [
    'error' => true
];

if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
    $data['error'] = false;
    $data['url'] = 'http://localhost:8383/files/' . $filename;
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($data);
