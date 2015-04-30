/*
 * grunt-manifold
 * https://github.com/nbellocam/grunt-manifoldjs
 *
 * Copyright (c) 2015 Nicolas Bello Camilletti
 * Licensed under the MIT license.
 */

'use strict';

var manifoldjs = require('manifoldjs'),
    manifestTools = manifoldjs.manifestTools,
    projectBuilder = manifoldjs.projectBuilder,
    path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('manifold', 'Generate hosted apps across platforms and devices', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      output: 'generatedApps',
      platforms: ['chrome', 'firefox', 'android', 'ios', 'windows10', 'web'],
      buildProjects: false
    });

    if (!options.site) {
      return grunt.fail.fatal('Required config properties "site" is missing.');
    }

    if (!options.site) {
      return grunt.fail.fatal('Required config properties "manifestFilePath" is missing.');
    }

    if (!grunt.file.exists(options.manifestFilePath) || !grunt.file.isFile(options.manifestFilePath)) {
      return grunt.fail.fatal('"manifestFilePath" config property must target an existing manifest file.');
    }

    if (grunt.util.kindOf(options.platforms) !== 'array') {
      return grunt.fail.fatal('"platforms" config property must be an array.');
    }

    if (grunt.util.kindOf(options.buildProjects) !== 'boolean') {
      return grunt.fail.fatal('"buildProjects" config property must be a boolean.');
    }

    if (grunt.util.kindOf(options.output) !== 'string') {
      return grunt.fail.fatal('"output" config property must be a string.');
    }

    if (!grunt.file.isDir(options.output)) {
      if (!grunt.file.exists(options.output)) {
        return grunt.fail.fatal('"output" config property must be a directory.');
      }
    }

    var done = this.async();

    manifestTools.getManifestFromFile(options.manifestFilePath, function (err, manifestInfo) {
      if (err) {
        grunt.fail.fatal('File error or invalid manifest format.');
        return done(false);
      }

      var outputPath = options.output;

      if (grunt.file.exists(outputPath)) {
        grunt.file.delete(outputPath);
      }

      grunt.file.mkdir(outputPath);

      if (!grunt.file.isPathAbsolute(outputPath) && grunt.file.isPathInCwd(outputPath)) {
        outputPath = path.resolve(process.cwd(), outputPath);
      }

      projectBuilder.createApps(manifestInfo, outputPath, options.platforms, options.buildProjects, function (err) {
        if (err) {
          // Build errors
          grunt.fail.fatal('An error occurs while creating the apps.');
          return done(false);
        }

        grunt.log.writeln('applications created!.');
        done(true);
      });
    });
  });

};
