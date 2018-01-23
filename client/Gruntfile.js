const path = require('path');
const webpackConfig = require('./webpack.config.js');
const dllConfig = require('./dll.config.js');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('../package.json'),
    banner: '/*!\n' +
      ' * Garen v<%= pkg.version %>\n' +
      ' * Powered by TFCloud Inc.\n' +
      ' */\n',

    // Task configuration.
    clean: {
      dist: ['client/dist/*']
    },

    cssnano: {
      options: {
        sourcemap: false
      },
      dist: {
        files: [{
          src: 'client/dist/*.css',
          dest: 'client/dist/'
        }]
      }
    },

    webpack: {
      options: {
        // 报错后继续运行
        failOnError: false
      },
      buildDll: dllConfig(),
      devDll: dllConfig({development: true}),
      build: webpackConfig(),
      dev: webpackConfig({development: true})
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: ['client/dist/*']
      }
    },

    copy: {
      uskin: {
        expand: true,
        cwd: 'client/uskin/dist/css',
        src: '**',
        dest: 'client/dist/uskin'
      },
      assets: {
        expand: true,
        cwd: 'client/applications',
        src: '**/assets/**',
        dest: 'client/assets/',
        rename: function(dest, matchedSrcPath) {
          return path.join(dest, matchedSrcPath.replace('/assets', ''));
        }
      }
    },

    jsonlint: {
      client: {
        src: ['client/applications/**/*.json'],
        options: {
          formatter: 'prose'
        }
      }
    }

  });

  grunt.file.setBase('../');

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });

  require('time-grunt')(grunt);

  grunt.registerTask('dev', ['clean:dist', 'copy:uskin', 'webpack:devDll', 'webpack:dev']);

  grunt.registerTask('build', ['clean:dist', 'copy:uskin', 'webpack:buildDll', 'webpack:build']);

  grunt.registerTask('before', ['clean:dist', 'webpack:buildDll']);
  // Build JS
  grunt.registerTask('js', ['webpack:build']);

  // Cope with the rest stuffs
  grunt.registerTask('rest', ['cssnano', 'usebanner', 'copy']);

};
