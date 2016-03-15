# pluginInstaller
node插件自动安装

-----
#使用说明
var installPlugins = require("./pluginstall.js");
installPlugins(["gulp","gulp-uglify"],["gulp","gulp-uglify"],function(msg){

consoel.log(msg);

});