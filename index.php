<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


$edit = 0;

require_once 'lib/mar_templates.php';

$tem = new mar_templates;
$tmpl_list = $tem->getAllTemplates();
$tmpl = $tem->getTemplateData($edit);

switch (isset($_GET['action']) ? $_GET['action'] : '') {
	case 'save':
		file_put_contents('test.txt', json_encode($_POST['panels']));
		exit;
	break;	
	default:
	$load = json_decode(file_get_contents('test.txt'));		
	include 'lib/templates/main.php';
					
	break;
}
?>
