const webpack = require('webpack');
const fs      = require('fs');
const path    = require('path'),
      join    = path.join,
      resolve = path.resolve;

const getConfig = require('hjs-webpack');

// Personally, we'll usually create a few path variables to help us optimize our configuration 
//  when we start modifying it from it's default setup.
const root    = resolve(__dirname);
const src     = join(root, 'src');
const modules = join(root, 'node_modules');
const dest    = join(root, 'dist');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

// The hjs-webpack package exports a single function that accepts a single argument, 
//  an object that defines some simple configuration to define a required webpack configuration. 
// There are only two required keys in this object:
// in - A single entry file
// out - the path to a directory to generate files
var config = getConfig({
    isDev: isDev,
    in: join(src, 'app.js'),
    out: dest,
    // Blows away any previously built files before it starts building new ones. 
    // Turn this on to clear away any strangling files from previous builds.
    clearBeforeBuild: true
})

module.exports = config;