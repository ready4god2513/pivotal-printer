class PivotalPrinter < Sinatra::Base
  
  set :root, File.dirname(__FILE__)
  register Sinatra::AssetPack
  
  assets {
    serve "/js",     from: "public/scripts"        # Optional
    serve "/css",    from: "public/styles"
    serve "/images", from: "public/img"

    # The second parameter defines where the compressed version will be served.
    # (Note: that parameter is optional, AssetPack will figure it out.)
    js :app, "/js/main.js", [
      "/js/json2.js", "/js/underscore.js","/js/backbone.js", "/js/app.js"
    ]

    css :application, "/css/application.css", [
      "/css/*.css"
    ]
  }
  
  PivotalTracker::Client.token = "416389666dfa61bad7d773209ab49835"
  PivotalTracker::Client.use_ssl = true
  
  get "/" do
    erb :index
  end
  
  get "/projects" do
    content_type "application/json"
    PivotalTracker::Project.all.to_json
  end
  
  get "/projects/:project_id/stories" do |project_id|
    content_type "application/json"
    PivotalTracker::Project.find(project_id).to_json
  end
  
  get "/projects/:project_id/stories/:id" do |project_id, id|
    @project = PivotalTracker::Project.find(project_id)
    content_type "application/json"
    @project.stories.find(id).to_json
  end
  
  post "/stories" do
    
  end
  
  put "/stories/:id" do
    
  end
  
  delete "/stories/:id" do
    
  end
end