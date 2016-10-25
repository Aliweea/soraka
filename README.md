# Soraka
KPI迁移项目

###项目启动流程:
* 安装Nodejs
* npm install bower -g
* npm install gulp -g
* 在项目根目录npm install
* 在项目根目录bower install
* 更改bower_components/font-awesome/bower.json
```javascript
    "main": [
		"css/font-awesome.min.css", // 开发需要,加上这一条!
		"less/font-awesome.less",
		"scss/font-awesome.scss"
	]
```

* 在项目根目录gulp serve即可将项目跑起来

