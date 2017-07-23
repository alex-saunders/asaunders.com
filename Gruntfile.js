module.exports = function(grunt) {

  grunt.initConfig({
      sass: {
          options: {
              sourceMap: true
          },
          dist: {
              files: {
                  'assets/dist/css/main.css': 'assets/src/scss/styles.scss'
              }
          }
      },

      postcss: {
        options: {
          map: true, 
          processors: [
            require('autoprefixer')({browsers: 'last 4 versions'}), // add vendor prefixes
            require('cssnano')() // minify the result
          ]
        },
        dist: {
          src: 'assets/dist/css/main.css'
        },
      },

      jekyll: {
        dist: {
          options: {
            config: '_config.yml',
          }
        }
      },

      connect: {
        server: {
          options: {
            livereload: '9090',
            hostname: 'localhost',
            base: '_site',
            port: 8080
          }
        }
      },

      watch: {
        options: {
          livereload: {
            host: 'localhost',
            port: 9090
          }
        },
        sass: {
          files: ['assets/src/scss/**/*'],
          tasks: ['sass', 'jekyll']
        },
        jekyll: {
          files: ['_includes/**/*', '_layouts/**/*', '_posts/**/*', '_config.yml', 'posts/**/*'],
          tasks: ['jekyll']
        }
      }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss')
  grunt.loadNpmTasks('grunt-jekyll')
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  grunt.registerTask('default', ['sass', 'postcss', 'jekyll']);
  grunt.registerTask('serve', ['sass', 'jekyll', 'connect', 'watch']);

};