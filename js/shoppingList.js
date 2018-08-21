	//广告
			var banner = document.getElementsByClassName("banner_content");
				setTimeout(function(){
					banner[0].style.marginTop=" -1.706666rem";
					
				},5000)
				setTimeout(function(){
				banner[0].style.display=" none";
					
				},6000)

	//弹窗
	window.onload = function(){
		var add = document.getElementsByClassName("add");
		var closed=  document.getElementsByClassName("closed");
		var dialog=  document.getElementsByClassName("dialog");
		
		add[0].addEventListener("click",function(){
			dialog[0].style.display="block"
			
			
		})
		add[1].addEventListener("click",function(){
			dialog[0].style.display="block"
			
			
		})
		add[2].addEventListener("click",function(){
			dialog[0].style.display="block"
			
			
		})
		closed[0].addEventListener("click",function(){
			dialog[0].style.display="none"
			
			
		})
		
		 var type= document.getElementsByClassName("type"); 
//		 console.log(type[0])
//		 console.log(typeHeight)
		 var capion = document.getElementsByClassName("capion_content")[0];
		 console.log(capion)
		 for(var i = 0; i <type.length ; i++){
		 	var typeHeight = type[i].offsetHeight;//内容的高度
		 console.log(typeHeight)

		 	 if( typeHeight >= 450) { //当距离顶部超过300px时，显示返回
				    capion.style.position = "static";
				  } 
				  else { //距离顶部小于300px，隐藏返回
				   capion.style.position = "fixed";
				  }
	
		 }
			 
		//内容切换
		var oTable = document.getElementById("table");
		var oUl = oTable.getElementsByTagName("ul")[0];
		var oLi = oUl.getElementsByTagName("li");
		var oDiv = oTable.getElementsByClassName("type");
		
		for(var j = 0; j<oLi.length; j++){
			oLi[j].index = j;
			oLi[j].addEventListener("click",function(){
				
				for(var k =0; k<oLi.length;k++){
					oLi[k].className ="list";
					oDiv[k].className = "hide type";
				}
				this.className = "list active";
				oDiv[this.index].className ="show type";
				
				
			})
		}
	

	
	}
	
	