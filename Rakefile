require 'sinatra/base'
require 'digest/sha2'
require 'pathname'

class ServerApp < Sinatra::Base
  
    set :root, File.join(File.dirname(__FILE__), '..')
    set :public, 'src'

    get '/' do
      File.read(File.join(settings.public, 'index.html'))
    end

    get '/application.manifest' do
      content_type 'text/cache-manifest'

      manifest = "CACHE MANIFEST\n\n"
      manifest << "# " << Digest::SHA2.hexdigest(Time.now.to_s + Time.now.usec.to_s) << "\n"

      root = Pathname.new(settings.public)
      Pathname.glob(File.join(root, "**", "*")).each do |p|
        manifest << "/" << p.relative_path_from(root) << "\n" if p.file?
      end

      manifest
    end

end

task :default => :server

task :server do 
  ServerApp.run! :port => 9090, :logging => true
end