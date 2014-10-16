<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


$edit = 0;

class mar_templates{
	
	private $template_path = 'templates'; 
	private $template_config = 'config.js'; 
	private $templatesLoaded;
	
	public function getAllTemplates() {
		
		$this->templatesLoaded = array();
		$dh = opendir($this->template_path);
		 while (($file = readdir($dh)) !== false) {
		 	
		 	if(is_dir($this->template_path.'/'.$file) && file_exists($this->template_path.'/'.$file.'/'.$this->template_config) ) {		 			
		 		$tmpl_data = json_decode(file_get_contents($this->template_path.'/'.$file.'/'.$this->template_config), true);
				
				if(!empty($tmpl_data)){
		 			$this->templatesLoaded[] = $tmpl_data; 
				}
		 	}
		 }	
		  
		 return $this->templatesLoaded;
	}
	
	public function getTemplate($id) {
		return 	$this->templatesLoaded[$id];
	}
	
}

$t = new mar_templates;
$tmpl_list = $t->getAllTemplates();
$tmpl = $t->getTemplate($edit);

print_r($tmpl);


?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Experiment</title>
	<script src="lib/ckeditor/ckeditor.js"></script>
	<script>

		// This code is generally not necessary, but it is here to demonstrate
		// how to customize specific editor instances on the fly. This fits well
		// this demo because we have editable elements (like headers) that
		// require less features.

		// The "instanceCreated" event is fired for every editor instance created.
		CKEDITOR.on( 'instanceCreated', function( event ) {
			var editor = event.editor,
				element = editor.element;

			// Customize editors for headers and tag list.
			// These editors don't need features like smileys, templates, iframes etc.
			if ( element.is( 'h1', 'h2', 'h3' ) || element.getAttribute( 'id' ) == 'taglist' ) {
				// Customize the editor configurations on "configLoaded" event,
				// which is fired after the configuration file loading and
				// execution. This makes it possible to change the
				// configurations before the editor initialization takes place.
				editor.on( 'configLoaded', function() {

					// Remove unnecessary plugins to make the editor simpler.
					editor.config.removePlugins = 'colorbutton,find,flash,font,' +
						'forms,iframe,image,newpage,removeformat,' +
						'smiley,specialchar,stylescombo,templates';

					// Rearrange the layout of the toolbar.
					editor.config.toolbarGroups = [
						{ name: 'editing',		groups: [ 'basicstyles', 'links' ] },
						{ name: 'undo' },
						{ name: 'clipboard',	groups: [ 'selection', 'clipboard' ] },
						{ name: 'about' }
					];
				});
			}
		});

	</script>
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui/jquery-ui.min.js"></script>
	<li
</head>
<body>
	
<div class="editArea" style="<?php echo $tmpl[0]['styles']['width']; ?>px">	
<?php

//echo file_get_contents('templates'.'/'.$tmpl[0]['path'].'/'.$tmpl[0]['file']);

?>
</div>
<div class="menuArea">
	
	<ul>
		<?php
		$tmpl[0]['styles']
		?>		
	</ul>
	
</div>

	
</body>
</html>