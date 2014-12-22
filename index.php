<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$edit = 0;
switch (isset($_GET['action']) ? $_GET['action'] : '') {
	case 'mediaList':
		
		require_once 'lib/mar_media.php';
		
		$tem = new mar_media;
		$media_list = $tem->getAllMedia();
		echo json_encode($media_list);		
		
		exit;
	break;	
	case 'save':
		file_put_contents('test.txt', json_encode($_POST['panels']));
		exit;
	break;		
	default:

	require_once 'lib/mar_templates.php';
	
	$tem = new mar_templates;
	$tmpl_list = $tem->getAllTemplates();
	$tmpl = $tem->getTemplateData($edit);		
		
	$load = json_decode(file_get_contents('test.txt'));		
	include 'lib/templates/main.php';
					
	break;
}
?>
