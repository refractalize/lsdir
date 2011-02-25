def get_spec(filename)
    if filename =~ /_spec\.rb$/
        filename
    else
        File.basename(filename, File.extname(filename)) + '_spec.rb'
    end
end

watch '.*\.(rb|js)' do |filename|
    system("clear; rspec #{get_spec(filename[0])} --color")
end
