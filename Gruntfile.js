module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    bower: grunt.file.readJSON('.bowerrc'),
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      options: {
        port: 8000,
      },
      server: {
        options: {
          base: 'dist/'
        }
      }
    },

    watch: {
      html: {
        files: ['src/**/*.html'],
        tasks: ['html']
      },
      scss: {
        files: ['src/scss/**/*.scss'],
        tasks: ['scss']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['clean:js', 'js']
      },
      img: {
        files: ['src/img/**'],
        tasks: ['clean:img', 'img']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'dist/**/*.html',
          'dist/assets/css/{,*/}*.css',
          'dist/assets/js/{,*/}*.js'
        ]
      }
    },

    sass: {
      build: {
        files : [
          {
            'dist/assets/css/style.css': 'src/assets/scss/style.scss'
          }
        ],
        options : {
          style : 'expanded'
          // debugInfo: true
        }
      }
    },

    concat: {
      components: {
        src: ['src/assets/js/src/*.js'],
        dest: 'dist/assets/js/scripts.js',
        options: {
          banner: '/*! \n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/ \n\n',
        }
      }
    },

    jshint: {
      beforeconcat: ['src/assets/js/src/*.js', 'Gruntfile.js']
    },

    clean: {
      dist: ['dist'],
      bower: ['dist/assets/bower'],
      html: ['dist/**/*.html', '!dist/assets/**/*'],
      css: ['dist/assets/css'],
      js: ['dist/assets/js'],
      img: ['dist/assets/img']
    },

    copy: {
      bower: {
        files: [
          {
            expand: true,
            cwd: '<%= bower.directory %>',
            src: ['**/*'],
            dest: 'dist/assets/bower'
          }
        ]
      },
      html: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/*.html'],
            dest: 'dist'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: 'src/assets/js',
            src: ['**/*.{js,css}', '!src/**/*'],
            dest: 'dist/assets/js'
          }
        ]
      },
      img: {
        files: [
          {
            expand: true,
            cwd: 'src/assets/img',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: 'dist/assets/img'
          }
        ]
      },
      iconfont: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['dist/assets/bower/mfglabs-iconset/css/font/*'],
            dest: 'dist/assets/css/font'
          }
        ]
      }
    }

  });

  // Default task
  grunt.registerTask('default', ['clean:dist', 'bower', 'html', 'sass', 'js', 'img', 'icons']);

  // Main tasks
  grunt.registerTask('dev',     ['default', 'w']);

  // Watch tasks
  grunt.registerTask('w',       ['connect:server', 'watch']);

  // Compile tasks (dev)
  grunt.registerTask('bower', ['copy:bower']);
  grunt.registerTask('html',  ['clean:html', 'copy:html']);
  grunt.registerTask('scss',  ['sass']);
  grunt.registerTask('js',    ['jshint:beforeconcat', 'concat', 'copy:js']);
  grunt.registerTask('img',   ['copy:img']);
  grunt.registerTask('icons', ['copy:iconfont']);

  // Plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
