$(function(){
	var stories = new Backbone.Collection;
	
	stories.comparator = function(story) {
	  return story.get("name");
	};

	stories.fetch({
		url: "/stories",
		success: function()
		{
			$("#waiting").fadeOut("normal", function(){
				$(this).remove();
			});
		}
	});

	$("#search-form").on("submit", function(){
		var display = $("#pivotal-projects ul.thumbnails");
		var result_count = $("#pivotal-projects #number-of-results");

		display.html("Searching...");
		var res = stories.filter(function(story)
		{
			return story.attributes.name.toLowerCase().indexOf($("#search-form .search-query").val().toLowerCase()) != -1;
		});

		if(res.length > 0)
		{
			result_count.html(res.length + " stories found");
			display.html("");
			_.each(res, function(story){
				display.append(ich.story(story.attributes));
			});
		}
		else
		{
			display.html("");
			result_count.html("No results found");
		}


		return false;
	});
});