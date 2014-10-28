<div class="panel-group" id="accordion">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        
        <i class="glyphicon glyphicon-plus"></i>
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
           Module <span class="badge badge-info"><?php echo count($tmpl['modules']); ?></span>
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in">
      <div class="panel-body">

		<ul class="nav nav-stacked" id="modul_items">
			<?php
				foreach ($tmpl['modules'] as $mod) {
					echo '<li data-title="'.$mod['title'].'" data-template="'.$mod['file'].'"><a href="javascript:;"><i class="glyphicon glyphicon-flash"></i> '.$mod['name'].'</a></li>';
				}			
			?>

		</ul>        
        
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <i class="glyphicon glyphicon-picture"></i>
        <a data-toggle="collapse" data-parent="#accordion" href="#mediaCollList">
          Media <span class="badge badge-info">4</span>
        </a>
      </h4>
    </div>
    <div id="mediaCollList" class="panel-collapse collapse">
      <div class="panel-body">
        Media
      </div>
    </div>
  </div>  
</div>


