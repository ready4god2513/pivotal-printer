$(function(){

	$("#search-form .search-query").on("keyup", function(){
		$("#pivotal-projects").html($(this).val());
	});
	
});