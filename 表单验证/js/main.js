//计算字符个数－函数
function getLength(str){
	return str.replace(/[^\x00-xff]/g,"xx").length;/*replace regexp \x00-xff三者问题？*/
}
//判断字符是否一样
function findStr(str,n){
	var tmp=0;
	for(var i=0;i<str.length;i++){
		if(str.charAt(i)==n){
			tmp++;
		}
	}
	return tmp;
}

window.onload=function(){
	var aInput=document.getElementsByTagName('input');
	var oName=aInput[0];
	var pwd=aInput[1];
	var pwd2=aInput[2];
	var aP=document.getElementsByTagName('p');
	var name_msg=aP[0];
	var pwd_msg=aP[1];
	var pwd2_msg=aP[2];
	var count=document.getElementById('count');
	var aEm=document.getElementsByTagName('em');
	var name_length=0;
	/**正则表达式测试小代码**/
	/**var str="adag";
	var re=/(a[d-g]){2}/i;
	alert(re.test(str));**/
//1.数字、字母(不分大小写)、汉字、下划线
//2.5-25字符，推荐使用中文会员名
//\u4e00-\u9fa5
	var re=/[^\w\u4e00-\u9fa5]/g;/*\u4e00-\u9fa5问题？*/

	/*会员名*/

	oName.onfocus=function(){
		name_msg.style.display='block';
		/*'block'此处使用""和''都可以*/
		name_msg.innerHTML='<i class="ati"></i>５－２５个字符，一个汉字为两个字符，推荐使用中文会员名';
		/*'<i class="ati"></i>５－２５个字符，一个汉字为两个字符，推荐使用中文会员名'此处使用""和''有区别，使用""出不来效果*/
	}

	oName.onkeyup=function(){
		count.style.visibility='visible';
		name_length=getLength(this.value);/*this.value问题？*/
		count.innerHTML=name_length+"个字符;"
		if(name_length==0){
			count.style.visibility='hidden';
		}
	}

	oName.onblur=function(){
		//含有非法字符
		if(re.test(this.value)){
			name_msg.innerHTML='<i class="er"></i>含有非法字符!'
		}
		//不能为空
		else if(this.value==""){
			name_msg.innerHTML='<i class="er"></i>不能为空!'

		}
		//长度少于６个字符
		else if(name_length<6){
			name_msg.innerHTML='<i class="er"></i>长度少于６个字符!'
		}
		//OK
		else{
			name_msg.innerHTML='OK!'
		}
	}
	/*第一次设置密码*/
	pwd.onfocus=function(){
		pwd_msg.style.display="block";
		pwd_msg.innerHTML='<i class="ati"></i>6-16个字符，请使用字母加数字或符号的组合密码，不能单独使用字母、数字或符号';
	}
	pwd.onkeyup=function(){
//大于５字符"中"
		if(this.value.length>5){
			aEm[1].className="active";/*.className问题？*/
			pwd2.removeAttribute("disabled");
			pwd2_msg.style.display="block";
		}
		else {
			aEm[1].className="";
			pwd2_msg.style.display="none";
			pwd2.setAttribute("disabled","");/*.setAttribute( , );的参数是两个，只写一个是不可以的，removeAttribute可以写一个，正确写法为pwd2.setAttribute("disabled","");*/
		}
//大于１０字符"强"
		if(this.value.length>10){
			aEm[2].className="active";
		}
		else{
			aEm[2].className="";
		}
	}
	pwd.onblur=function(){
		var m=findStr(pwd.value,pwd.value[0]);/*使用this.value也可以*/
		var re_n=/[^\d]/g;
		var re_a=/[^a-zA-Z]/g;
//不能为空
		if(this.value==""){
			pwd_msg.innerHTML='不能为空';
		}
//不能用相同字符
		else if(m==this.value.length){
			pwd_msg.innerHTML='不能用相同字符';
		}
//长度应为6-16个字符
		else if(this.value.length<6 || this.value.length>16){
			pwd_msg.innerHTML='长度应为6-16个字符';
		}
//不能全为数字
		else if(!re_n.test(this.value)){
			pwd_msg.innerHTML='不能全为数字';
		}
//不能全为字母
		else if(!re_a.test(this.value)){
			pwd_msg.innerHTML='不能全为数字';
		}
//OK
		else{
			pwd_msg.innerHTML='OK!';
		}
	}
	/*确认密码*/
	pwd2.onblur=function(){
		if(pwd.value!=this.value){
			pwd2_msg.innerHTML='两次输入密码不一致!';
		}
		else{
			pwd2_msg.innerHTML='OK!';
		}
	}
}
