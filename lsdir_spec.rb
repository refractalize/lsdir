describe 'lsdir' do
    it 'should return directories name in current directory' do
        %x{node lsdir.js}.should == ".git\ndir\n"
    end
end
