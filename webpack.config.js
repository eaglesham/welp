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
const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;

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
const matchCssLoaders = /(^|!)(css-loader)($|!)/;

//loaders has to be array, found = array
const findLoader = (loaders, match) => {
const found = loaders.filter(l => 
    l && l.use && l.use[1] && l.use[1].match(match)
    );
  return found ? found[0] : null;
}
// existing css loader
const cssloader = findLoader(config.module.rules, matchCssLoaders);
const newloader = Object.assign({}, cssloader, {
    test: /\.module\.css$/,
    use: [
        {
            loader: cssloader.use[1]
            .replace(matchCssLoaders,
                    `$1$2?modules&localIdentName=${cssModulesNames}$3`)
        }
    ]
})

config.module.rules.push(newloader);
cssloader.test = new RegExp(`[^module]${cssloader.test.source}`)
cssloader.loader = newloader.loader

module.exports = config;