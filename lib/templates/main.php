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
			<button id="saveTemplate" class="btn btn-primary pull-right">Save</button>		
		</div>	
		
	</div>	
</div>
<?php
include 'footer.php';
?>