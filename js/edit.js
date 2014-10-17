//CKEDITOR.disableAutoInline = true;
function loadEditor() {
	    
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
}
 
$(document).ready(function(){

loadEditor();
	
 $( "#modul_items li" ).draggable({
	appendTo: "body",
	helper: "clone"
 });

$( "div[data-dropArea='true']" ).droppable({
	activeClass: "ui-state-default",
	hoverClass: "ui-state-hover",
	accept: ":not(.ui-sortable-helper)",	
	drop: function( event, ui ) {
		 
		$( this ).find( ".placeholder" ).remove();
		$tt = ui.draggable;
	var last = $('<div class="panel">'
      +'<div class="panel-heading">'
      +'  <div class="panel-title"><i class="glyphicon glyphicon-align-justify"></i> '+$tt.attr('data-title')
      +'  <div class="pull-right"><i class="glyphicon glyphicon-wrench"></i></div>'
      +'  </div>'
      +'</div>'
      +'<div class="panel-body">'
 	  +'<div class="progress">'
 	  +' <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 99%"></div>'
      +'</div>'
      +'</div>'
      +'</div>'); 
    // contenteditable="true"
           
	if($(this).find(".placeholder").length>0) { //add first element when cart is empty
	    $(this).find(".placeholder").remove();
	    last.appendTo( this );
	} else {

    var i=0; //used as flag to find out if element added or not

	    $(this).children('div.panel').each(function() {
	        if($(this).offset().top>=ui.offset.top) { //compare
	               
	          last.insertBefore( $(this) );
	          i=1;   
	          return false; //break loop
	       }
	    });

	    if(i!=1) { //if element dropped at the end of cart
	        last.appendTo( this );
	    }
    }   
	
	// get template
	jQuery.ajax({
		url: template_root+$tt.attr('data-template')
	}).done(function(html) {
		jQuery('.panel-body', last).html(html);
		
		jQuery('.panel-body [contenteditable=true]', last).each(function(index) {		  	
		  	jQuery(this).uniqueId();
		  	CKEDITOR.inline( jQuery(this).attr('id') );
		});
		
	});		

	
    //	CKEDITOR.inline( jQuery('.panel-body', last).attr('id') );
	}	
}).sortable({
	items: "div.panel",
	handle: '.panel-heading .glyphicon-align-justify',
	sort: function() {
		// gets added unintentionally by droppable interacting with sortable
		// using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
		$( this ).removeClass( "ui-state-default" );
	}
});

});