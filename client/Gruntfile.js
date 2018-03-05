/**
 * @PengJiyuan
 */
const path = require('path');
const webpackConfig = require('./webpack.config.js');
const dllConfig = require('./dll.config.js');

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
      dist: ['client/public/dist/*'],
      exceptDll: ['client/public/dist/*.*'],
      assets: ['client/public/assets/*/']
    },

    cssnano: {
      options: {
        sourcemap: false
      },
      dist: {
        files: [{
          src: 'client/public/dist/*.css',
          dest: 'client/public/dist/'
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
        src: ['client/public/dist/*']
      }
    },

    copy: {
      assets: {
        expand: true,
        cwd: 'client/applications',
        src: '**/assets/**',
        dest: 'client/public/assets/',
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

  grunt.registerTask('dev', ['clean:dist', 'webpack:devDll', 'webpack:dev']);

  grunt.registerTask('devServer', ['clean:dist', 'webpack:dev']);

  grunt.registerTask('build', ['clean:dist', 'webpack:buildDll', 'webpack:build']);
  // Build JS
  grunt.registerTask('js', ['webpack:build']);

  // Cope with the rest stuffs
  grunt.registerTask('rest', ['cssnano', 'usebanner', 'merge_assets']);

  grunt.registerTask('merge_assets', ['clean:assets', 'copy:assets']);

};
