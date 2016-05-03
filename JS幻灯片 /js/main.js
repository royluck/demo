//1.数据定义（实际生产环境中，应由后台给出）

var data=[
		{img:1,h1:'Creative',h2:'DUET'},
		{img:2,h1:'Friendly',h2:'DEVIL'},
		{img:3,h1:'Loving',h2:'HUSSLER'},
		{img:4,h1:'Crzay',h2:'REBEL'},
		{img:5,h1:'Passionate',h2:'SEEKER'},
		{img:6,h1:'Tranquilent',h2:'FRIEND'},
		{img:7,h1:'Insecure',h2:'COMPATRIOT'}
];

//2.通用函数
var g = function (id){
	if(id.substr(0,1)=='.'){
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}
//3.添加幻灯片的操作(所有幻灯片&对应的按钮)
function addSlider(){
	//3.1获取模板
	var tpl_main=g('template_main').innerHTML
			.replace(/^\s*/,'')
			.replace(/\s*$/,'');
	var tpl_ctrl=g('template_ctrl').innerHTML
			.replace(/^\s*/,'')
			.replace(/\s*$/,'');

	//3.2定义最终输出HTML的变量
	var out_main=[];
	var out_ctrl=[];
	//3.3遍历所有数据，构建最终输出的HTML
	for(i in data){			   	  //data是自己定义的数组
		var _html_main=tpl_main 	 //临时变量用下划线表示 _
			.replace(/{{index}}/g,data[i].img)
			.replace(/{{h2}}/g,data[i].h1)
			.replace(/{{h3}}/g,data[i].h2);
		var _html_ctrl=tpl_ctrl
			.replace(/{{index}}/g,data[i].img);

		out_main.push(_html_main);
		out_ctrl.push(_html_ctrl);
	//3.4把HTML回写到对应的DOM里面
	g('template_main').innerHTML=out_main.join('');
	g('template_ctrl').innerHTML=out_ctrl.join('');
	}
	//7增加背景图片#background
	g('template_main').innerHTML+=tpl_main
			.replace(/{{index}}/g,'{{index}}')
			.replace(/{{h2}}/g,data[i].h1)
			.replace(/{{h3}}/g,data[i].h2);
	g('main_{{index}}').id='main_background';
}
//5.幻灯片切换
var swichSlider=function(n){　
//5.1获得要展现的幻灯片&控制按钮　DOM
	var main=g('main_'+n);
	var ctrl=g('ctrl_'+n);
//5.2获得所有的幻灯片&所有控制按钮
	var clear_main=g('.main-i');
	var clear_ctrl=g('.ctrl-i');
//5.3清除他们的active样式　注：不能用for(in)
	for(i=0;i<clear_ctrl.length;i++){
		clear_ctrl[i].className=clear_ctrl[i].className
			.replace('ctrl-i_active','');
		clear_main[i].className=clear_main[i].className
			.replace('main-i_active','');
	}
//5.4为当前控制按钮和幻灯片附加样式
	main.className += ' main-i_active';
	ctrl.className += ' ctrl-i_active';
	setTimeout(function(){
		g('main_background').innerHTML=main.innerHTML;/*??*/
	},1000);
}

//6.动态调整图片的margin-top以使其垂直居中
//js获得Height,设置margin-top:-1*Height/2;
//然后配合样式top:50%;
function movePicture(){
	var pictures=g('.picture');
	for(i=0;i<pictures.length;i++){
		pictures[i].style.marginTop=(-1*pictures[i].clientHeight/2)+'px';
	}
}


//4.定义何时出现幻灯片输出
window.onload = function (){
	addSlider();
	swichSlider(1);
	setTimeout(function(){
		movePicture();// 存在时间差，必须添加延时，因为照片是动态添加的
	},1000)
}
//+=可以换成=吗？
