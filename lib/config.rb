PivotalTracker::Client.token = "416389666dfa61bad7d773209ab49835"
PivotalTracker::Client.use_ssl = true

::RAILS_ENV = "development" # this is needed to work around a Jammit limitation
Jammit.load_configuration("#{File.expand_path(File.dirname(__FILE__))}/assets.yml")