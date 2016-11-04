module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
        ' * jQuery.extendext <%= pkg.version %>\n' +
        ' *\n' +
        ' * Copyright 2014-<%= grunt.template.today("yyyy") %> Damien "Mistic" Sorel (http://www.strangeplanet.fr)\n' +
        ' * Licensed under MIT (http://opensource.org/licenses/MIT)\n' +
        ' *\n' +
        ' * Based on jQuery.extend by jQuery Foundation, Inc. and other contributors\n' +
        ' */',

        // compress js
        uglify: {
            options: {
                banner: '<%= banner %>\n',
                mangle: { except: ['$'] }
            },
            lib: {
                src: 'jQuery.extendext.js',
                dest: 'jQuery.extendext.min.js'
            }
        },

        // jshint tests
        jshint: {
            lib: {
                src: 'jQuery.extendext.js'
            }
        },

        // qunit test suite
        qunit: {
            lib: {
                options: {
                    urls: ['tests/index.html?coverage=true'],
                    noGlobals: true
                }
            }
        },

        // save LCOV files
        qunit_blanket_lcov: {
            lib: {
                options: {
                    dest: '.coverage-results/all.lcov'
                },
                src: 'jQuery.extendext.js'
            }
        },

        // coveralls data
        coveralls: {
            options: {
                force: true
            },
            lib: {
                src: '.coverage-results/all.lcov'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-qunit-blanket-lcov');
    grunt.loadNpmTasks('grunt-coveralls');

    grunt.registerTask('default', [
        'uglify'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'qunit_blanket_lcov',
        'qunit'
    ]);
};