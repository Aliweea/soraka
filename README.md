# Soraka
KPI迁移项目

项目启动流程:
1. 安装Nodejs
2. npm install bower -g
3. npm install gulp -g
4. 更改bower_components/font-awesome/bower.json
	"main": [
		"css/font-awesome.min.css", // 开发需要,加上这一条!
		"less/font-awesome.less",
		"scss/font-awesome.scss"
	],
