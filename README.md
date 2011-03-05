# lsdir

A particularly ugly piece of node - see if you can do better!

## The Challenge

`lsdir` is a node program that lists all the directories in the current directory. Ok, not very exciting or useful, but it demonstrates just how complicated node's asynchronous non-blocking API can make your code.

The challenge is to use `fs.readdir()` and `fs.stat()` (yes, the async ones) to read a directory listing, and for each file name returned, check if it's a directory. If it is, print it. Finally, print the number of directories found.

Sounds easy? Sure. But given the async nature of `fs.stat()`, you can't be sure which callback is the last one, and therefore, when to print the directory count.

The challenge is, then, to rewrite or refactor the lsdir.js code into something that aint ugly, and exposes the true intentions of the code.

## The Tests

Tests are written in ruby/rspec, so a quick `rspec lsdir_spec.rb` will show you if you're still on the right track. There's also a specs.watchr file, so you can run `watchr specs.watchr` if you want save-by-save test feedback.

# The Result

My solution to this is `zo`, an async friendly list processing library containing all the usual suspects `map`, `select` and `reduce`. See the [zo branch](https://github.com/refractalize/lsdir/tree/zo), or see the [zo repository](https://github.com/refractalize/zo).