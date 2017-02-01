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
		watch: {
			css: {
				files: ['themes/material/static/sass/*.scss', 'themes/material/static/css/style.css'],
				tasks: ['sass', 'autoprefixer']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.registerTask('default',['watch']);
}
