def get_spec(filename)
    if filename =~ /_spec\.rb$/
        filename
    else
        file = File.basename(filename, File.extname(filename)) + '_spec.rb'
        if File.exist?(file)
            file
        end
    end
end

watch '.*\.(rb|js)' do |filename|
    spec_file = get_spec(filename[0])
    if spec_file
        system("clear; rspec #{spec_file} --color")
    end
end
