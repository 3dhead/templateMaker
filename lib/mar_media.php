<?php


class mar_media {
	
	private $media_path = 'media/images/';
	
	private $mediaLoaded = array();
	
	public function getAllMedia() {
		
		$this->mediaLoaded = array();
		$dh = opendir($this->media_path);
		 while (($file = readdir($dh)) !== false) {
		 	
		 	if(is_file($this->media_path.'/'.$file) ) {		 			
		 		$this->mediaLoaded[] = $file;				
		 	}
		 }	
		  
		 return $this->mediaLoaded;
	}
		
}