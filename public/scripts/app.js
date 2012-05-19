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
			this.$("#stories").html("");
			this.updateCount();
			this.collection.each(this.renderStory);
		},
		
		renderStory: function(story)
		{
			var view = new StoryView({
				model: story
			});
			this.$("#stories").append(view.render().el);
		},
		
		updateCount: function()
		{
			$("#number-of-results").html(this.collection.length + " results fetched");
		}
	});
	
	
	
	$(function(){
		
		window.PivotalPrinter = Backbone.Router.extend({
			routes: {
				"" : "index",
				"projects/search/:params": "search",
				"stories/:id": "show"
			},
			
			initialize: function()
			{
				window.stories = new Stories();
				$("#pivotal-projects").prepend("<h4 id=\"waiting\">Fetching stories from Pivotal...</h4>");
			},

			index: function()
			{
				window.stories.fetch();
				this.storiesView = new StoriesView({
					collection: window.stories
				});
			},

			search: function(query)
			{
				
			},

			show: function(id)
			{
				console.log(window.stories.get(id));
			}
		});
		
		
		// Set up the global error handling
		$(document).ajaxError(function(e, jqxhr, settings, exception){
			$("#error-handler").html("Something bad happened : " + exception).slideDown();
		});
		
		
		// Kick off the application
        window.app = new PivotalPrinter();
        Backbone.history.start({pushState: true});

		$("#search-form").on("submit", function(){
			window.app.navigate("projects/search/" + $("#search-query").val(), {trigger: true});
			return false;
		});
	});

})(jQuery);