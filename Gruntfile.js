module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'themes/material/static/css/style.css' : 'themes/material/static/sass/style.scss'
				}
			}
		},
		autoprefixer: {
	    dist: {
	      src: 'themes/material/static/css/style.css'
	    }
	  },
		cssmin: {
			dist: {
				files: {
					 'themes/material/static/css/style.min.css': 'themes/material/static/css/style.css',
					 'themes/material/static/css/material.min.css': 'themes/material/static/css/material.css',
					 'themes/material/static/css/prism.min.css': 'themes/material/static/css/prism.css'
				}
			}
		},
		imagemin: {
			png: {
				options: {
					optimizationLevel: 7
				},
				files: [{
					expand: true,
					cwd: 'static/img/src/',
					src: ['**/*.png', '*.png'],
					dest: 'static/img/compressed/',
					ext: '.png'
				}]
			},
			jpg: {
				options: {
					optimizationLevel: 7
				},
				files: [{
					expand: true,
					cwd: 'static/img/src/',
					src: ['**/*.jpg', '*.jpg'],
					dest: 'static/img/compressed/',
					ext: '.jpg'
				}]
			}
		},
		watch: {
			css: {
				files: ['themes/material/static/sass/*.scss', 'themes/material/static/css/style.css'],
				tasks: ['sass', 'autoprefixer', 'cssmin']
			},
			image: {
				files: ['static/img/src/*.png', 'static/img/src/*.jpg', 'static/img/src/**/*.png', 'static/img/src/**/*.jpg'],
				tasks: ['imagemin']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'imagemin']);
}
