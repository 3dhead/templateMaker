<?php
include 'header.php';
?>
<?php
include 'top_nav.php';
?>

<div class="container">
	<div class="row">
		
		<div class="col-sm-3">
			<?php
				include 'left_menu.php';
			?>
			
		</div>
		
		<div class="col-sm-9 templateHolder">
		
			<?php
				include 'content.php';
			?>
		</div>	
		
	</div>
	<div class="row">
		
		<div class="col-sm-3">
			
		</div>
		
		<div class="col-sm-9 templateHolder">
			<button id="saveTemplate" class="btn btn-primary pull-right" data-loading-text="Saving...">Save</button>		
			<button id="test" class="btn btn-default pull-right" onclick="$('#editImage').modal('show');">Test image</button>
			<button id="test" class="btn btn-default pull-right" onclick="$('#editLink').modal('show');">Test link</button>
		</div>	
		
	</div>	
</div>
<?php
include 'footer.php';
?>