module.exports = function(grunt){
    grunt.initConfig({
        //Oackage containing our Node modules
        pkg: grunt.file.readJSON('package.json'),

        //Tasks
        //Copy Task - copies contents of src directory to destination directory
        copy: {
            //Targets/Contexts
            t1: {
                src: '',
                dest: ''
            }
        },
        //Concat Task - Takes js or css files and merges into one file.
        concat: {
            js: {
                src:'src/js/*',
                dest: 'build/js/scripts.js'
            },
            css: {
                src:'src/css/*',
                dest: 'build/css/styles.css'
            }
        },
        // uglify: {
        //     options: {
        //         // the banner is inserted at the top of the output
        //         banner: '/*! <%=pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        //     },
        //     dist: {
        //         files: {
        //             'dist/ <%= pkg.name %>.min.css': ['<%= concat.css.dest %> ']
        //         }
        //     }
        // },
        cssmin: {
            dist: {
                files: {
                    'dist/main.css': ['<%= concat.css.dest %> ']
                }
            }
        },
        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            //configure JSHint (documented at http://www.jshint.com/docs)
            options: {
                //more options here if you want to override JSHint defaults
                'esversion': 6,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('build', ['concat', 'cssmin', 'jshint']);
};