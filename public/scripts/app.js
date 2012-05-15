(function($){

	window.Story = Backbone.Model.extend({
		
	});
	
	window.Stories = Backbone.Collection.extend({
		model: Story,
		url: "/stories",
		
		search: function(query)
		{
			return this.filter(function(story)
			{
				var found = false;
				var filters = ["project", "name", "description", "type", "estimate", "state", "requester", "owner", "label", "note", "task"];

				_.each(filters, function(filter)
				{

				});

				if(story.get("name").toLowerCase().indexOf(query.toLowerCase()) != -1)
				{
					found = true;
				}

				return found;
			});
		}
	});
	
	window.stories = new Stories();
	window.stories.fetch();
	
	window.StoryView = Backbone.View.extend({
		template: _.template($("#story-template").html()),
		
		render: function()
		{
			$(this.el).html(this.template(this.model.toJSON()));	
			return this;
		}
	});
	
	
	$(function(){
		
		window.PivotalPrinter = Backbone.Router.extend({
			routes: {
				"" : "index",
				"projects/search/:params": "search",
				"projects/:project_id/story/:id": "print"
			},

			index: function()
			{
				
			},

			search: function()
			{

			},

			print: function()
			{

			}
		});
		
		
		// Kick off the application
        window.App = new PivotalPrinter();
        Backbone.history.start({pushState: true});
	});

})(jQuery);