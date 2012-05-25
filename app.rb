class PivotalPrinter < Sinatra::Base
  
  register Padrino::Helpers
  register Sinatra::RespondTo
  register Jammit
  
  
  get "/" do
    erb :index
  end
  
  get "/projects" do
    @projects = PivotalTracker::Project.all
    
    respond_to do |format|
      format.html {erb "projects/index".to_sym, :locals => {:projects => @projects}}
      format.json {@projects.to_json}
    end
  end
  
  get "/projects/:project_id/stories" do |project_id|
    @project = PivotalTracker::Project.find(project_id)
    
    respond_to do |format|
      format.html {erb "projects/show".to_sym, :locals => {:project => @project}}
      format.json {@project.to_json}
    end
  end
  
  get "/projects/:project_id/stories/:id" do |project_id, id|
    @project = PivotalTracker::Project.find(project_id)
    @stories = @project.stories.find(id)
    
    respond_to do |format|
      format.html {erb "projects/stories/index".to_sym, :locals => {:projects => @projects, :stories => @stories}}
      format.json {@stories.to_json}
    end
  end
  
  post "/stories" do
    
  end
  
  put "/stories/:id" do
    
  end
  
  delete "/stories/:id" do
    
  end
end