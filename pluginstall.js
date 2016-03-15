/**
 * node 自动安装插件
 * @author lowin
 * @example 
 * var install = require('./install.js');
 * install(globalPlugins,localPlugins,function(msg){
    JSlog.log(aa);
 });
 */
var process = require('child_process');

//is install plugin
function npmls(name) {
  var isInstall = true;
  try {
      var plug = require(name);
    } catch(e) {
       isInstall = false;
    }
    return isInstall;
}

//安装插件
function installPlugins(globalPlugins,localPlugins,logfn){
	logfn('\n开始安装插件，请稍后...');
	var plugins = globalPlugins.concat(localPlugins);
	var len = plugins.length;
	var globalCmd = 'npm i --g ';
	var localCmd = 'npm i --save-dev ';
	//mac平台
	if(/^darwin/gi.test(process.platform)){
	    globalCmd = 'sudo ' + globalCmd;
	    localCmd = 'sudo ' + localCmd;
	}
	function install(i){
		if(npmls(plugins[i])){
			logfn('插件' + plugins[i] + '已安装！');
			if(++i < len){
                install(i);
            }else {
                logfn('\n恭喜，所有插件安装完毕...');
            }
			return;
		}
		var cmd = localCmd + plugins[i];
		var tip = '本地';
		if(i < globalPlugins.length){
			cmd = globalCmd + plugins[i];
			tip = '全局';
		}
		logfn('\n正在安装' + tip + '插件' + plugins[i] + '...');
		process.exec(cmd, function(err,stdout,stderr){
			if(err){
				logfn('\n' + tip + '插件' + plugins[i] + '安装失败...');
				logfn('error=>' + err);
			}else {
				logfn('\n' + tip + '插件' + plugins[i] + '安装完毕...，剩余' + (len-i-1) + '个安装插件...');
			}
			if(++i < len){
			 	install(i);
			}else {
				logfn('\n恭喜，所有插件安装完毕...');
			}
		});
	};
	install(0);
}
//exports对象实际上只是对module.exports的引用
module.exports = installPlugins;
