module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      game: {
        files: [ 'game.js', 'index.html' ],
        tasks: 'default'
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  grunt.registerTask( 'default', ['watch'] );
}