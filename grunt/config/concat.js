
module.exports = {

  'home/index': {
    options: {
      separator: ';',
      banner: '/*! home/index.js v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %> */\n'
    },
    files: {
      '.grunt/home/index.js': [
        "src/common/lib/**/*.js",
        "src/common/data/**/*.js",
        "src/home/lib/**/*.js",
        "src/home/data/**/*.js",
        "src/home/controller/**/*.js",
        "src/home/router/**/*.js",
        "src/home/index.js"
      ]
    }
  },


  'server': {
    options: {
      separator: ';\n',
      banner: '/*! server/index.js v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %> */\n'
    },
    files: {
      '.grunt/server/index.js': [
        ".grunt/server/view/**/*.js",
        "src/server/conf/require.js",
        "src/server/conf/**/*.js",
        "src/server/lib/**/*.js",
        "src/server/model/**/*.js",
        "src/server/controller/**/*.js",
        "src/server/router/**/*.js",
        "src/server/index.js"
      ]
    }
  }

}