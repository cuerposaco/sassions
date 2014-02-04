module.exports = function(grunt){
	grunt.initConfig({
		watch: {
			options: {
				livereload: true,
			},
			files: ['public/**/*','views/**/*', "!public/vendor/**/*"]
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['watch']);
}