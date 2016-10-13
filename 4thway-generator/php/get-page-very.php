<?php
/**
 * Created by PhpStorm.
 * User: AlexSaunders
 * Date: 21/08/16
 * Time: 10:56
 */

$type = $_POST['type'];

$veryURL = $_POST['veryURL'];

$veryURL = "http://www.very.co.uk" . $veryURL;

if ($type == "desktop") {


    $html = file_get_contents($veryURL);

    echo $html;

} else {

    $opts = array('http' =>
        array(
            'header' => 'User-agent: Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3B48b Safari/419.3',
        )
    );

    $context = stream_context_create($opts);

    $result = file_get_contents($veryURL, false, $context);

    echo $result;
}


