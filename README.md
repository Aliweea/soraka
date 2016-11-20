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
		"css/font-awesome.min.css", // 开发需要,加上这一条!如果注释掉下面两行, 记得去掉这一行最后的逗号
		"less/font-awesome.less", // 注释掉这两行, 不然会报错, 不过并没有什么影响
		"scss/font-awesome.scss" // 注释掉这两行, 不然会报错, 不过并没有什么影响
	]
```

* 在项目根目录gulp serve即可将项目跑起来
test

###项目部署注意点
* 为了确保日期选择是中文的月份, 更改angular-datepicker.min.js中的j.months -> j.months=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
