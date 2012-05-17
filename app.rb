class PivotalPrinter < Sinatra::Base
  
  PivotalTracker::Client.token = "416389666dfa61bad7d773209ab49835"
  PivotalTracker::Client.use_ssl = true
  
  get "/" do
    erb :index
  end
  
  get "/stories" do
    @stories = Array.new
    
    PivotalTracker::Project.all.each do |project|
      project.stories.all.each do |story|
        @stories.push({
          id: story.id,
          project_id: project.id,
    			url: story.url,
    			created_at: story.created_at,
    			accepted_at: story.accepted_at,
    			project: project.name,
    			name: story.name,
    			description: story.description,
    			story_type: story.story_type,
    			estimate: story.estimate,
    			current_state: story.current_state,
    			requested_by: story.requested_by,
    			owned_by: story.owned_by,
    			owned: story.owned_by.nil?,
    			estimateable: story.story_type.include?("feature"),
    			labels: story.labels,
    			deadline: story.deadline,
    			notes: story.notes,
    			tasks: story.tasks
        })
      end
    end
    
    content_type "application/json"
    @stories.to_json
  end
  
  
end