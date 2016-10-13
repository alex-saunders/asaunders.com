<?php
/**
 * Created by PhpStorm.
 * User: AlexSaunders
 * Date: 21/08/16
 * Time: 10:56
 */

$lwURL = $_POST['lwURL'];

$lwURL = "http://www.littlewoods.com" . $lwURL;

$html = file_get_contents($lwURL);

echo $html;


