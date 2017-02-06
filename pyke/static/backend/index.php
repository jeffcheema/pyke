<?php
$url = escapeshellarg($_GET['url']);
$command = "youtube-dl -x -g ";
$response = exec($command . $url);
header('Location: ' .$response . '');
?>
