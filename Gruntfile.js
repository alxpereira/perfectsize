'use strict';
module.exports = function(grunt) {
  //Initializing the configuration object
  grunt.initConfig({
    uglify: {
      options: {
        mangle: true  // Use if you want the names of your functions and variables unchanged
      },
      my_target: {
          files: {
            './min/perfectsize.min.js': [
                './src/perfectsize.utils.js',
                './src/perfectsize.js'
            ]
          }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        force: true,
        bitwise: true,
        curly: true,
        debug: true,
        eqeqeq: false,
        eqnull: true,
        es3: true,
        es5: false,
        expr: true,
        funcscope: true,
        globals: {
            browser: true,
            devel: true,
            jQuery: true,
            module: true,
            require: true
        },
        laxbreak: true,
        laxcomma: true,
        loopfunc: true,
        maxerr: 80,
        onecase: true,
        regexdash: true,
        scripturl: true,
        shadow: true,
        smarttabs: true,
        sub: true
      },

      all: './assets/_src/js/*.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint:all', 'uglify']);

};