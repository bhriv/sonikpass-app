module.exports = function (grunt) {

    var isWin = /^win/.test(process.platform);
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', '!grunt-template-jasmine-istanbul', '!grunt-template-jasmine-requirejs']});


    grunt.initConfig({

        shell: {
            runBower: {
                command: function () {
                    if (isWin) {
                        return 'bower.cmd install';
                    }
                    return 'node ./node_modules/.bin/bower install';
                }
            }
        },

        bowercopy: {
            options: {
                runBower: false
            },
            js: {
                options: {
                    destPrefix: 'js/lib'
                },
                files: {
                    'backbone.js': 'backbone/backbone.js',
                    'backbone.babysitter.js': 'backbone.babysitter/lib/backbone.babysitter.js',
                    'backbone.wreqr.js': 'backbone.wreqr/lib/backbone.wreqr.js',
                    'marionette.js': 'marionette/lib/core/backbone.marionette.js',
                    'underscore.js': 'underscore/underscore.js',
                    'jquery.js': 'jquery/dist/jquery.js',
                    'require.js': 'requirejs/require.js',
                    'backbone-validation.js': 'backbone-validation/dist/backbone-validation-amd.js',
                    'backbone.syphon.js': 'backbone.syphon/lib/amd/backbone.syphon.js'
                }
            }
        },

        clean: {
            vendor: ['js/lib/*']
        },

        jshint: {
            options: grunt.file.readJSON('.jshintrc'),
            node: {
                options: {
                    node: true
                },
                src: [
                    'Gruntfile.js'
                ]
            },
            project: {
                src: [
                    'js/src/FormWrapper.js', 'js/spec/FormWrapper.spec.js'
                ]
            }

        },

        jasmine: {
            project: {
                options: {
                    specs: 'js/spec/*.spec.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: ['js/require-config.js']
                    },
                    keepRunner: true
                }
            }
        }

    });
    
    grunt.registerTask('vendor', ['clean:vendor', 'shell:runBower', 'bowercopy']);
    grunt.registerTask('test', ['vendor', 'jasmine']);
    grunt.registerTask('default', ['vendor', 'jshint', 'jasmine']);

};
