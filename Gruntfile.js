/*globals module:true, require:true*/
module.exports = function (grunt) {
  "use strict";

  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // static server
    connect: {
      server: {
        options: {
          port: '8888',
          hostname: '', // Must be empty to be accessible everywhere and not only "localhost"
          keepalive: true
        }
      }
    },

    open : {
      dev : {
        path: 'http://localhost:8888/src'
      }
    }

  });

  grunt.registerTask('default', ['connect', 'open:dev']);
};