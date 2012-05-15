class PivotalPrinter < Sinatra::Base
  
  PivotalTracker::Client.token = "416389666dfa61bad7d773209ab49835"
  PivotalTracker::Client.use_ssl = true
  
  get "/" do
    erb :index
  end
  
  get "/stories" do
    @stories = Array.new
    
    fetch_projects.each do |project|
      project.stories.all.each do |story|
        @stories.push({
          id: story.id,
          project_id: project.id,
  				url: story.url,
  				created_at: story.created_at,
  				accepted_at: story.accepted_at,
  				project_id: story.project_id,
  				name: story.name,
  				description: story.description,
  				story_type: story.story_type,
  				estimate: story.estimate,
  				current_state: story.current_state,
  				requested_by: story.requested_by,
  				owned_by: story.owned_by,
  				labels: story.labels,
  				deadline: story.deadline,
  				notes: story.notes,
  				tasks: story.tasks
        })
      end
    end
    
    @stories.to_json
  end
  
  get "/projects/:project_id/story/:id" do |project_id, id|
    @project = PivotalTracker::Project.find(project_id)
    @story = @project.stories.find(id)
    
    erb :show, :locals => {:project => @project, :story => @story}
  end
  
  def fetch_projects
    PivotalTracker::Project.all
  end
  
end