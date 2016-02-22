module.exports = function (grunt) {
  
  require('jit-grunt')(grunt);

  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "client/css/style.css": "client/less/style.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['client/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    karma : {
      all: {
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS'],
        singleRun: true,
        options: {
          files: [
            'client/js/**/*.js', // js source files
            'spec/client/js/*.spec.js' // unit test files
          ]
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);

};