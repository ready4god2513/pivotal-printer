require "rubygems"
require "bundler"
require "json"

Bundler.require

require "./lib/pivotal.rb"
require "./lib/config.rb"
require "./app.rb"
run PivotalPrinter