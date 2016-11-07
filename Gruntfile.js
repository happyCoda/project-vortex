module.exports = function (grunt) {
  const JS_PATH = `${__dirname}/js`;
  let fs = require('fs'),
    browserify = require('browserify'),
    tsify = require('tsify'),
    time = require('time-grunt');

  grunt.initConfig({
    pkg: grunt.file.readJSON(`${__dirname}/package.json`),
    clean: {
      options: {},
      dev: {
        src: [`${JS_PATH}/dest/*.js`]
      }
    },

    connect: {
      options: {
        hostname: 'localhost',
        port: 1337,
        livereload: 1338,
        base: './'
      },

      dev: {}
    },
    watch: {
      options: {
        livereload: 1338
      },
      dev: {
        files: [`${__dirname}/index.html`, `${JS_PATH}/src/*.ts`, `Gruntfile.js`],
        tasks: ['clean:dev', 'compile:dev']
      }
    }
  });

  time(grunt);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('compile', function () {
    let done = this.async();

    browserify({
      basedir: '.',
      entries: [
        `${JS_PATH}/src/main.ts`,
        `${JS_PATH}/src/dom.ts`
      ]
    })
    .plugin(tsify, {target: 'es6'})
    .on('error', (err) => {
      console.log(err);
    })
    .bundle((err, src) => {

      fs.writeFile(`${JS_PATH}/dest/bundle.js`, src,  (err) => {
        if (err) {
          throw new Error(err);
        }
        done();
      })
    });
  });

  grunt.registerTask('dev', ['connect:dev', 'watch:dev']);
};
