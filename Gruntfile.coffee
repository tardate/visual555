module.exports = (grunt)->

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      coffee: {
        files: ['src/javascripts/**/*.coffee'],
        tasks: ['coffee']
      },
      javascript: {
        files: ["app/javascripts/*.js", "specs/*_spec.js"],
        tasks: ['test']
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
    jasmine: {
      src: 'app/javascripts/*.js',
      options: {
        specs: 'specs/*_spec.js',
        helpers: 'spec/*_helper.js',
        vendor: [
          "http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"
        ]
      }
    },
  })

  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-jasmine')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('test', ['jasmine'])
  grunt.registerTask('default', ['test'])

