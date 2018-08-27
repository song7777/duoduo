window.onload = function(){
   	var gotop = document.getElementsByClassName("gotop")[0]//获取图片所在div位置；
   	var contentHeight = document.documentElement.contentHeight;
   	var head = document.getElementsByClassName("head")[0];
   	var time = null;
   	Otop = true;
   	var  Cha = document.getElementsByClassName('cha')[0];
   	var  Tc = document.getElementsByClassName('tc')[0];
   	var Iput = document.getElementsByClassName('b_input')[0];
   	Cha.onclick = hide;
   	var checked1 = JSON.parse(localStorage.getItem('checked'));
   	function hide(){
		var checked= Iput.checked;
		localStorage.setItem("checked",JSON.stringify(checked));
		Tc.style.display = 'none';
		console.log(checked)
   	}
   	if(checked1){
   		Tc.style.display = 'none';
   	}
   	
   	
   	gotop.style.display = 'none';
   	window.onscroll = function(){
   		var alltop = document.documentElement.scrollTop || document.body.scrollTop;
   		if(alltop >= 90){
   			head.className = "head  head_color";
   		}else{
   			head.className = "head";
   		}
   		if(alltop >= 200){
   			gotop.style.display = 'block';
   		}else{
   			gotop.style.display = 'none';
   		}
   		
   		if(!Otop){
   			clearInterval(time);
   		}
   		Otop = false;
   	}
   	gotop.onclick = function(){
   		time = setInterval(function(){
   			var alltop = document.documentElement.scrollTop || document.body.scrollTop;
   			var speed = Math.floor(-alltop/10);
   			document.documentElement.scrollTop = document.body.scrollTop = alltop + speed;
   		    Otop = true;
   		    if(alltop == 0){
   		    	clearInterval(time);
   		    }
   		    console.log(alltop)
   		},30)
   	}

}
