$(function(){
	
	var Story = new Backbone.Model;
	var stories = new Backbone.Collection;
	
	stories.comparator = function(story)
	{
	  return Story.get("name");
	};
	
	stories.search = function(query)
	{
		return this.filter(function(story)
		{
			var found = false;
			var filters = ["project", "name", "description", "type", "estimate", "state", "requester", "owner", "label", "note", "task"];
			
			_.each(filters, function(filter)
			{
				console.log(filter);
			});
			
			if(story.get("name").toLowerCase().indexOf(query.toLowerCase()) != -1)
			{
				found = true;
			}

			return found;
		});
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
		var res = stories.search($("#search-form .search-query").val());
		var result_count = $("#pivotal-projects #number-of-results");
		display.html("Searching...");

		if(res.length > 0)
		{
			result_count.html(res.length + " stories found");
			display.html("");
			_.each(res, function(story){
				display.append(ich.story(story.toJSON()));
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