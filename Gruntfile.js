//Gruntfile
module.exports = function(grunt) {

  // requirejs compile options
  var compileOptions = {

      mainConfigFile: 'app/scripts/main.js',
      baseUrl: 'app/scripts',
      include: ['main'],
      out: 'dist/main.min.js',
      removeCombined: false,
      findNestedDependencies: true,

      //Removes console.logs for production
      onBuildWrite: function (moduleName, path, contents) {
          if(/(.*)js\/modules\/(.*)/.test(path)) return contents.replace(/console.log(.*);/g, ';');
          return contents;
      }
  }

  //Initializing the configuration object
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Add global variables for asset locations
    dirs: {            
        sass_folder: 'app/sass',
        css_folder: 'app/css',
        js_folder: './app/scripts',
        images_folder: './app/images',
        // files for deploying
        production_build_folder: './app/production_build'
        // Usage Example: 
            // dest: '<%= dirs.sass_folder %>/assets/sass' 
    },
    // Task configuration
    
    less: {
        development: {
            options: {
              compress: false,  // no minification in dev
            },
            files: {
              //compiling base.less into styles.css
              "./app/styles/styles.css":"./app/styles/base.less"
            }
        },
        production: {
          options: {
            cleancss: true, // minify css
            // compress: true, // minify css
          },
          files: {
            //compiling base.less into main.min.css
            "./dist/main.min.css": "./app/styles/base.less"
          }
        }
    },
    requirejs: {
        compile: {
            options : compileOptions
        }
    },

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
        less: {
            // Watch all .less files from the styles directory)
            files: ['app/styles/*.less'],
            tasks: ['less'],
            // Reloads the browser
            options: {
              livereload: true  
            }
        },
        requirejs: {
            // Watch only main.js so that we do not constantly recompile the .js files
            files: [ 'app/scripts/main.js' ],
            tasks: [ 'requirejs' ],
            // Reloads the browser
            options: {
              livereload: true  
            }
        }
    }
  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-sass'); 
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-compass');
  

  // Task definition
  grunt.registerTask('default', ['watch' ]);
  grunt.registerTask('dev', ['sass' ]);

};
