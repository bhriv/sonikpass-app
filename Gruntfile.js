//Gruntfile
module.exports = function(grunt) {

  // Add global variables for asset locations



  //Initializing the configuration object
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Add global variables for asset locations
    dirs: {            
        bower_folder: 'bower_components',
        npm_folder: 'node_modules',

        sass_folder: 'app/sass',
        css_folder: 'app/css',
        js_folder: 'app/js',
        images_folder: 'app/images',
        // files for deploying
        production_build_folder: './app/production_build'
        // Usage Example: 
            // dest: '<%= dirs.sass_folder %>/assets/sass' 
    },
    // Concat JS into single production file
    concat: {
        ui_vendor: {
            src: [
                '<%= dirs.bower_folder %>/jquery/dist/jquery.js',
                '<%= dirs.bower_folder %>/underscore/underscore.js',
                '<%= dirs.bower_folder %>/backbone/backbone.js',
                '<%= dirs.bower_folder %>/marionette/lib/backbone.marionette.js',
                '<%= dirs.bower_folder %>/bootstrap/dist/js/bootstrap.js',
            ],
            dest: '<%= dirs.js_folder %>/build/concat-ui_vendor.js',
        },
        // global_custom: {
        //     src: [
        //         '<%= dirs.js_folder %>/useful.js',  // This specific file
        //         '<%= dirs.js_folder %>/local-storage.js',  // This specific file
        //     ],
        //     dest: '<%= dirs.js_folder %>/build/concat-global_custom.js',
        // },
    },
    // Uglify JS
    uglify: {
        build: {
            src: '<%= dirs.js_folder %>/build/concat-ui_vendor.js',
            // src: '<%= dirs.js_folder %>/build/concat-dashboard_custom.js',
            dest: '<%= dirs.production_build_folder %>/all-uglified.js'
        }
    },
    // Task configuration
    
    // less: {
    //     development: {
    //         options: {
    //           compress: false,  // no minification in dev
    //         },
    //         files: {
    //           //compiling base.less into styles.css
    //           "./app/styles/styles.css":"./app/styles/base.less"
    //         }
    //     },
    //     production: {
    //       options: {
    //         cleancss: true, // minify css
    //         // compress: true, // minify css
    //       },
    //       files: {
    //         //compiling base.less into main.min.css
    //         "./dist/main.min.css": "./app/styles/base.less"
    //       }
    //     }
    // },
    // requirejs: {
    //     compile: {
    //         options : compileOptions
    //     }
    // },

    sass: {
        dist: {
            options: {
                style: 'compressed',
                require: 'susy'
            },
            files: {
                '<%= dirs.css_folder %>/screen.css': '<%= dirs.sass_folder %>/screen.scss'
                // 'css/build/mixins.css': 'styles/mixins.sass'
            }
        } 
    },
    // Compass
    compass: {
        // Optionally specify different dev and production
       dev: {
           options: {   
               config: 'config.rb',
               force: true,           
               sassDir: ['<%= dirs.sass_folder %>'],
               cssDir: ['<%= dirs.css_folder %>'],
               require: 'susy',
               environment: 'development'
           }
       },
       prod: {
           options: { 
               config: 'config.rb',             
               sassDir: ['<%= dirs.sass_folder %>'],
               cssDir: ['<%= dirs.css_folder %>'],
               require: 'susy',
               environment: 'production'

          }
        }
    },
    // sass: {
    //   dist: {
    //     files: {
    //       'styles/compiled.css' : 'sass/screen.scss'
    //     }
    //   }
    // },
    watch: {
        css: {
          files: '<%= dirs.sass_folder %>/*.scss',
          tasks: ['sass'],
          options: {
            livereload: true  
          }
        },
        // less: {
        //     // Watch all .less files from the styles directory)
        //     files: ['app/styles/*.less'],
        //     tasks: ['less'],
        //     // Reloads the browser
        //     options: {
        //       livereload: true  
        //     }
        // },
        // requirejs: {
        //     // Watch only main.js so that we do not constantly recompile the .js files
        //     files: [ 'app/scripts/main.js' ],
        //     tasks: [ 'requirejs' ],
        //     // Reloads the browser
        //     options: {
        //       livereload: true  
        //     }
        // }
    }
  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-sass'); 
  // grunt.loadNpmTasks('grunt-contrib-less');
  // grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  

  // Task definition
  grunt.registerTask('default', ['watch','concat','uglify' ]);
  grunt.registerTask('dev', ['sass' ]);
  // grunt.registerTask('default', ['concat','uglify','compass:dev' ]);

};
