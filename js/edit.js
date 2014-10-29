function TemplateMaster (data) {
    this.data = data;
    this.template_root = 'templates/';
    this.media_root = 'media/images/';
    
    // classes
    this.panelBody = '.panel-body';
    this.modulesHolder = '#modul_items';    
    this.mediaHolderCount = '#mediaCollCount';
    this.mediaHolder = '#mediaCollList>div';
    this.modulesPlaceholder = '.placeholder';
    this.templateHolder = '.templateHolder';
    
    this.saveBtn = '#saveTemplate';
        
    // data
    this.dataTemplate = 'data-template';
    this.dataTitle = 'data-title';
	
	this.addModul = function(data) {
			var l = jQuery('<div class="panel">'
		      +'<div class="panel-heading">'
		      +'  <div class="panel-title"><i class="glyphicon glyphicon-align-justify"></i> '+data.title
		      +'  <div class="pull-right btn-group">'
		 +'<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">'
		 +'  <i class="glyphicon glyphicon-wrench"></i>'
		 +'<span class="caret"></span>'
		 +'</button>'
		 +'<ul class="dropdown-menu" role="menu">'
		 +'  <li><a href="#" class="showLater hide"><i class="glyphicon glyphicon glyphicon-eye-open"></i> Visible</a></li>'
		 +'  <li><a href="#" class="hide"><i class="glyphicon glyphicon-eye-close"></i> Hidden</a></li>'
		 +'  <li><a href="#" class="delete"><i class="glyphicon glyphicon-trash"></i> Remove</a></li>'
		 +'</ul>'
		
	     +'</div>'
	     +'  </div>'
	     +'</div>'
	     +'<div class="panel-body">'
	 	 +'<div class="progress">'
	 	 +' <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 99%"></div>'
	     +'</div>'
	     +'</div>'
	     +'</div>'); 		
		      
		jQuery(this.panelBody, l).attr(this.dataTemplate, data.template).attr(this.dataTitle, data.title);		
		return l;
	};	
	this.addEditor = function(itm) {
		try {
		CKEDITOR.inline( jQuery(itm).attr('id') );
		} catch (e) {
			
		} 
	};	
	
	this.loadTemplateFile = function(template, block) {
		var _this = this;		
		jQuery.ajax({
			url: this.template_root+template
		}).done(function(html) {
			jQuery('.panel-body', block).html(html);				
			jQuery('.panel-body [contenteditable=true]', block).each(function(index) {		  	
			  	jQuery(this).removeAttr('id');
			  	jQuery(this).uniqueId();
			  	_this.addEditor(this);
			});
			_this.initMediaDrop(block);			
		});	
	};	
	
    this.initTemplate = function() {
    	this.template_root = 'templates/'+this.data.path+'/';
    	
    	var _this = this;
    	
		jQuery( this.modulesHolder+" li" ).draggable({
			appendTo: "body",
			helper: "clone",
			revert: "invalid"
		 });
		
		jQuery( "div[data-dropArea='true']" ).droppable({
			activeClass: "ui-state-default",
			hoverClass: "ui-state-hover",
			//accept: ":not(.ui-sortable-helper)",
			accept: this.modulesHolder+" li",	
			drop: function( event, ui ) {
				 
				jQuery( this ).find( _this.modulesPlaceholder ).remove();
				$tt = ui.draggable;
				var last = _this.addModul({
					title: $tt.attr(_this.dataTitle),
					template: $tt.attr(_this.dataTemplate)										
				});	

		    // contenteditable="true"
		    	           
			if(jQuery(this).find(_this.modulesPlaceholder).length>0) { //add first element when is empty
			    jQuery(this).find(_this.modulesPlaceholder).remove();
			    last.appendTo( this );
			} else {
		
			    var i=0; //used as flag to find out if element added or not
		
			    jQuery(this).children('div.panel').each(function() {
			        if(jQuery(this).offset().top>=ui.offset.top) { //compare
			               
			          last.insertBefore( jQuery(this) );
			          i=1;   
			          return false; //break loop
			       }
			    });
		
			    if(i!=1) { //if element dropped at the end of cart
			        last.appendTo( this );
			    }
		    }   
			
			// get template
			_this.loadTemplateFile($tt.attr(_this.dataTemplate), last);
				
		   }	
		}).sortable({
			items: "div.panel",
			handle: '.panel-heading .glyphicon-align-justify',
			connectWith: "div[data-dropArea='true']",
			revert: true,
			sort: function() {
				// gets added unintentionally by droppable interacting with sortable
				// using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
				$( this ).removeClass( "ui-state-default" );
			}
		});    
		
	
		// init
    	jQuery(_this.templateHolder).on('focus', _this.panelBody, function(){
			jQuery(this).parent().addClass('focus');
		});
		jQuery(_this.templateHolder).on('blur', _this.panelBody, function(){
			jQuery(this).parent().removeClass('focus');
		});
		jQuery(_this.templateHolder).on('click', 'a.delete', function(){
			jQuery(this).closest('div.panel').fadeOut(function(){jQuery(this).remove();}) 
		});
		jQuery('body').on('click', _this.saveBtn, function(){
			var btn = jQuery(this)
    		btn.button('loading')
    					
			_this.saveTemplate(function(){
				btn.button('reset');
			});
		});		
    
    };
    
    this.saveTemplate = function(callBack) {
		
		var _this = this;
		var savePanels = Array(); 
		
		jQuery(this.templateHolder+' .ui-droppable').each(function() { // block
				
				var savePanel = Array();
				
				jQuery(_this.panelBody, this).each(function() { // block
					
					var saveData = new TemplatePart();
					saveData.template = jQuery(this).attr(_this.dataTemplate);
					saveData.title = jQuery(this).attr(_this.dataTitle);
					saveData.content = jQuery(this).clone();
					// clean content
					jQuery('.cke_editable', saveData.content).removeAttr('id style title role aria-label spellcheck aria-describedby class');					
					saveData.content = saveData.content.html();
					saveData.visible = true;
										
					savePanel.push(saveData);
				});	
			savePanels.push(savePanel);				
		});	
        //console.log(savePanels);
        
        jQuery.ajax( {
        	url: 'index.php?action=save',
        	data: {'panels': savePanels},
        	type: 'POST',
        	complete: function(data){
        		if(callBack) callBack.call();
        	}
        } );
    };
    this.loadTemplate = function(data) {
		var _this = this;
					
		jQuery.each(data, function( indexDrop, listDrop ) { // drop areas
			jQuery.each(listDrop, function( indexArea, listEdit ) { // modul
				
				var block = _this.addModul({
					title: listEdit.title,
					template: listEdit.template					
				});
												
				block.appendTo(jQuery(_this.templateHolder+' [data-dropArea="true"]').eq(indexDrop));
								
				jQuery('.panel-body', block).html(listEdit.content);
				jQuery('.panel-body [contenteditable=true]', block).each(function(index) {
				  	jQuery(this).removeAttr('id');
			  		jQuery(this).uniqueId();
				  	_this.addEditor(this);
				});
				_this.initMediaDrop(block);

			});								
		});
        
    };    
    this.loadMedia = function(data) {
    	var _this = this;
        jQuery.getJSON('index.php?action=mediaList', [], function(data){
        		
        		jQuery(_this.mediaHolderCount).text(data.length);
        		
        		jQuery.each(data, function( indexArea, mediImg ) { 
        			jQuery('#mediaCollList>div').append('<img width="100" class="img-thumbnail" src="'+_this.media_root+mediImg+'" />');
        		});	
        		_this.initMediaList();
        } );    	
        
        	
	};	
	
	this.initMediaDrop = function(templ) {

		 var _this = this;
		 
         jQuery( "img[data-mediaArea='true']", templ ).droppable({
			activeClass: "ui-state-default",
			hoverClass: "ui-state-hover",			
			accept: this.mediaHolder+" img",	
			drop: function( event, ui ) {
												
				jQuery(this).attr('src', jQuery(ui.draggable).attr('src') );
				
				
			}
		 });			

	
	},

	this.initMediaList = function() {

		// media 
		jQuery( this.mediaHolder+" img" ).draggable({
			appendTo: "body",
			helper: "clone",
			revert: "invalid"
		 });	
		 
	};
	
}
function TemplatePart () {
	this.template = null;
	this.title = null;
	this.content = '';
	this.visible = true;
}

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

