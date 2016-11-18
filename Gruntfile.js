module.exports = function(grunt) {
    const PUBLIC_PATH = `${__dirname}/public`;
    let browserify = require('browserify'),
        tsify = require('tsify'),
        vueify = require('vueify'),
        babelify = require('babelify'),
        bsServer = require('browser-sync').create(),
        chokidar = require('chokidar'),
        time = require('time-grunt');

    time(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON(`${__dirname}/package.json`)
    });

    grunt.registerTask('watch', function() {
        let done = this.async(),
            watcher = chokidar.watch([
                `${PUBLIC_PATH}/index.html`,
                `${PUBLIC_PATH}/js/src/**/*.ts`,
                `${PUBLIC_PATH}/js/src/**/*.vue`,
                `${PUBLIC_PATH}/js/dest/**/*.js`,
                `Gruntfile.js`
            ]),
            child;

        watcher.on('ready', () => {
            watcher.on('all', (event, file) => {
                grunt.log.writeln(`file: ${file} has been ${event}`);

                switch (true) {
                    // matchBase is provided to match filenames with slashes, eg.: path/to/file.js
                    case grunt.file.isMatch({
                        matchBase: true
                    }, '*.ts', file) || grunt.file.isMatch({
                        matchBase: true
                    }, '*.vue', file):
                        child = grunt.util.spawn({
                            grunt: true,
                            args: ['clean', 'compile']
                        }, (err, result, code) => {
                            grunt.log.writeln(result.stdout);
                        });
                        break;
                    case grunt.file.isMatch({
                        matchBase: true
                    }, '*.html', file):
                        bsServer.reload();
                        break;
                    case grunt.file.isMatch({
                        matchBase: true
                    }, '*.js', file) && event !== 'unlink':
                        bsServer.reload();
                        break;
                }
            });
        });
    });

    grunt.registerTask('clean', function() {
        let done = this.async(),
            paths = grunt.file.expand(`${PUBLIC_PATH}/js/dest/*.js`);

        paths.forEach((path) => {
            grunt.file.delete(path);
        });
        grunt.log.writeln('Deleted files and folders:\n', paths.join('\n'));
        done();
    });

    grunt.registerTask('connect', function() {
        // start the Browsersync server
        bsServer
            .init({
                port: 1337,
                server: {
                    baseDir: PUBLIC_PATH,
                    index: 'index.html'
                },
                open: false
            });
    });
    grunt.registerTask('compile', function() {
        let done = this.async();

        browserify({
                basedir: '.',
                entries: grunt.file.expand(`${PUBLIC_PATH}/js/src/main.ts`)
            })
            .plugin(tsify, {
                target: 'es6',
                experimentalDecorators: true,
                types: ["vue-typescript-import-dts"]
            })
            .transform(vueify)
            .transform(babelify)
            .bundle((err, src) => {
                let path = `${PUBLIC_PATH}/js/dest/bundle.js`;

                grunt.file.write(path, src);
                grunt.log.writeln(`file: ${PUBLIC_PATH}/js/dest/bundle.js created`);
                done();
            })
            .on('error', (err) => {
                grunt.log.writeln(err);
                done();
            });
    });
    grunt.registerTask('dev', ['connect', 'watch']);
};
