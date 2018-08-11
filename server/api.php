<?PHP

header('Content-Type: application/json');

$endPoint = "https://www.drukzo.nl.joao.hlop.nl/challenge.php?player={$_GET['player']}&guess={$_GET['guess']}";
$contents = file_get_contents($endPoint);

echo $contents;
