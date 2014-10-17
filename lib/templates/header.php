<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>templateMaker</title>
	<script src="lib/ckeditor/ckeditor.js"></script>
	<script>

	</script>
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui/jquery-ui.min.js"></script>
	<script type="text/javascript" src="lib/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/edit.js"></script>
	<link href="lib/bootstrap/css/bootstrap.min.css" media="all" rel="stylesheet" type="text/css" />
	<link href="css/editor.css" media="all" rel="stylesheet" type="text/css" />
<script>
	var template = <?php echo json_encode($tmpl); ?>;
	var template_root = 'templates/<?php echo $tmpl['path']; ?>/';				
</script>
</head>
<body>