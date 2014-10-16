<?php

class mar_templates{
	
	private $template_path = 'templates'; 
	private $template_config = 'config.js'; 
	
	private $templatesLoaded = array();
	
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
	
	public function getTemplateData($id) {
		return 	$this->templatesLoaded[$id];
	}

	public function getTemplateFile($tmpl) {
			
		if(is_numeric($tmpl)) {
			$tmpl = $this->getTemplateData($tmpl);
		}
		
		return file_get_contents($this->template_path.'/'.$tmpl['path'].'/'.$tmpl['file']);
		
	}	
	
}