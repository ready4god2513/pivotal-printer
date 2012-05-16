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
	
	window.StoryView = Backbone.View.extend({
		template: _.template($("#story-template").html()),
		tagName: "section",
		className: "well",
		
		render: function()
		{
			$(this.el).html(this.template(this.model.toJSON()));	
			return this;
		}
	});
	
	
	window.StoriesView = Backbone.View.extend({
		
		initialize: function()
		{
			_.bindAll(this, "render");
			this.collection.bind("reset", this.render);
		},
		
		render: function()
		{
			$("#waiting").fadeOut("slow");
			this.collection.each(this.renderStory);
		},
		
		renderStory: function(story)
		{
			var view = new StoryView({
				model: story
			});
			this.$("#stories").append(view.render().el);
		}
	});
	
	
	
	$(function(){
		
		window.PivotalPrinter = Backbone.Router.extend({
			routes: {
				"" : "index",
				"projects/search/:params": "search",
				"projects/:project_id/story/:id": "print"
			},
			
			initialize: function()
			{
				window.stories = new Stories();
				window.stories.fetch();
				
				this.storiesView = new StoriesView({
					collection: window.stories
				});
				
				$("#pivotal-projects").prepend("<h4 id=\"waiting\">Fetching stories from Pivotal...</h4>");
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
		
		
		// Set up the global error handling
		$(document).ajaxError(function(e, jqxhr, settings, exception){
			$("#error-handler").html("Something bad happened : " + exception).slideDown();
		});
		
		
		// Kick off the application
        window.App = new PivotalPrinter();
        Backbone.history.start({pushState: true});
	});

})(jQuery);