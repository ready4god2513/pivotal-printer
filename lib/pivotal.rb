module PivotalTracker
  
  class Project
    
    def to_json(*args)
      {
        id: id,
        name: name,
        account: account,
        point_scale: point_scale,
        labels: labels,
        velocity_scheme: velocity_scheme,
        iteration_length: iteration_length,
        initial_velocity: initial_velocity,
        current_velocity: current_velocity,
        last_activity_at: last_activity_at,
        first_iteration_start_time: first_iteration_start_time,
        current_iteration_number: current_iteration_number,
        stories: stories.all
      }.to_json
    end
    
  end
  
  class Story
    
    def to_json(*args)
      {
        id: id,
        project_id: project_id,
    		url: url,
    		created_at: created_at,
    		accepted_at: accepted_at,
    		name: name,
    		description: description,
    		story_type: story_type,
    		estimate: estimate,
    		current_state: current_state,
    		requested_by: requested_by,
    		owned_by: owned_by,
    		owned: owned_by.nil?,
    		estimateable: story_type.include?("feature"),
    		labels: labels,
    		deadline: deadline,
    		notes: notes,
    		tasks: tasks
      }.to_json
    end
    
  end
  
end