module.exports = (grunt)->

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['src/javascripts/**/*.coffee'],
        tasks: ['coffee']
      }
    },
    coffee: {
      compile: {
        files: {
          'app/javascripts/calculator555.js': 'src/javascripts/calculator555.coffee',
          'app/javascripts/app.js': ['src/javascripts/app.coffee', 'src/javascripts/visual555.coffee' ]
        }
      }
    },
  })

  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['watch'])

