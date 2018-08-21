
var mySwiper2 = new Swiper('.swiper-container2', {
			slidesPerView: 'auto',
      		spaceBetween: 0,
     		 freeMode: true,
			  clickable: true,
	});



window.onload = function(){
	 var gotop = document.getElementsByClassName("gotop")[0]; //获取图片所在的div
	 var clientHeight = document.documentElement.clientHeight;
	 var head = document.getElementsByClassName("head")[0]; 
	 var timer = null;
	 var oTop = true;
	 window.onscroll = function(){
	 	 //获取滚动条的滚动高度
	 	var allTop = document.documentElement.scrollTop || document.body.scrollTop;
	 	if(allTop >= 100){//当距离顶部超过100px时，显示头部
			head.className = "head head_color";
	 		 
	 	}else {  //距离顶部小于100px，头部透明
			head.className = "head ";
			
		}
	 	
	 	if(allTop >= 300){
	 		 gotop.style.display = "block";
	 	}else { //距离顶部小于300px，隐藏返回
				  gotop.style.display = "none";
		}
	 	  //主要用于判断当 点击回到顶部按钮后 滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
	 	if(!oTop){
	 		clearInterval(timer);
	 		
	 	}
	 	oTop = false;
	 	
	 }
	 gotop.onclick = function(){
	 	timer = setInterval(function(){
	 	var allTop = document.documentElement.scrollTop || document.body.scrollTop;
	 	var speed = Math.floor(-allTop/10);
		document.documentElement.scrollTop = document.body.scrollTop =  allTop +speed;
		oTop = true;
		if(allTop == 0){
			clearInterval(timer);
			
		}
	 	 console.log(allTop)
	 	},30)
	 }
	 
	 
	 
	 
	 
	var oListsTitle = document.getElementsByClassName("lists_title");
	for (var i = 0; i < oListsTitle.length; i++){
			oListsTitle[i].addEventListener("click",function(){
		 for(var j = 0 ;j<oListsTitle.length; j++){
				 		oListsTitle[j].className = "lists_title";
				 		this.className = "lists_title lists_active";
			}
			})
	}
}
