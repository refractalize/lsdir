require 'fileutils'

describe 'lsdir' do
    before :all do
        @rootdir = Dir.pwd
        @testdir = 'testdir'
    end

    before :each do
        Dir.chdir(@rootdir)
        cleanup
        FileUtils.mkdir(@testdir)
        Dir.chdir(@testdir)
    end

    after :each do
        cleanup
    end

    def cleanup
        FileUtils.rm_rf(@testdir)
    end

    def file(filename)
        FileUtils.touch('file')
    end

    def dir(dir)
        FileUtils.mkdir_p('dir')
    end

    def lsdir
        %x{node ../lsdir.js}
    end

    it 'only lists directories' do
        dir 'dir'
        file 'file'

        lsdir.should == <<eof
dirs:
    dir
eof
    end

    it 'still prints header if no directories found' do
        file 'file'

        lsdir.should == <<eof
dirs:
eof
    end

    it 'still prints header if no files or directories found' do
        lsdir.should == <<eof
dirs:
eof
    end
end
