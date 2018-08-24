var cLas = new Vue({
	el:"#cLas",
	data:{
		item:"",
		items:[],
		lists:[],
		lists_length:0,
		lists2:[],
		lists2_length:0,
		lists3:[],
		lists4:[],
//		lists3_length:0,
	},
	created:function(){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/categories/getCateList/',
		{params:{
			type:"礼品",
			num:40,
		}},{
			headers:{
				'Content-Type':'application/x-www-from-urlenconded'
			}
		}).then(function(response){
			console.log(response)
				console.log(response.data)
				console.log(123456)
				cLas.lists = response.data.cate_info;
				cLas.lists_length = response.data.cate_info.length;
				console.log(cLas.lists_length)
				cLas.lists2 = response.data.goods_info;
				console.log(cLas.lists2)
			
			for(x in cLas.lists2){
				cLas.lists4.push(x);
			}
			console.log(cLas.lists4)
			var first = cLas.lists4[0];
			for(x in cLas.lists2){
			if (first=== x) {
				cLas.lists3.push(cLas.lists2[x])
			}	
			}
				
			}).catch(function(response){
				console.log(response);
			});
			
			
			
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/adver/getadverinfo',
		{params:{
			type:"3",
		}},{
			headers:{
				'Content-Type':'application/x-www-from-urlenconded'
			}
		}).then(function(response){
			console.log(response);
			if(response.data.error_msg == "无广告"){
					var sWiper = document.getElementsByClassName("swiper-container");
					console.log(sWiper)
					 sWiper[0].parentNode.removeChild(sWiper[0])
			}else{
					var Array = response.data.data;
				cLas.items = Array.length;
				cLas.item = Array;
				
				cLas.$nextTick(function(){
					
					var mySwiper = new Swiper('.swiper-container', {
							autoplay: {
						    delay: 1000,
						    stopOnLastSlide: false,
						    disableOnInteraction: false,
						    },//可选选项，自动滑动//可选选项，自动滑动
						loop:true,
						pagination: {
						    el: '.swiper-pagination',
						},
					})
				
				})
			}
			}).catch(function(response){
				console.log(response);
			});
			
	},
	methods:{
		fenlei:function(e){
			cLas.lists3 = [];
		var text = event.target.innerHTML;
		console.log(text);
		for(x in cLas.lists2){
			if (text === x) {
				cLas.lists3.push(cLas.lists2[x])
			}		
		}
		console.log(cLas.lists3)
	},
		ceshi:function(e){
			console.log(e)
			console.log(e.target.offsetParent.dataset.id)
			var goods_classid = e.target.offsetParent.dataset.id;
			console.log(goods_classid)
			localStorage.setItem('goods_classid',JSON.stringify(goods_classid));
		}
	}
})

