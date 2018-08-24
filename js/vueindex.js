
//轮播图
var banner = new Vue({
	el:"#banner",
	data:{
		item:[],
	},
	created:function(){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/adver/getadverinfo',
			{params:{
				type:0,
			}},{
				headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
				},
				
			}).then(function(response){
						console.log(response)
						var data = response.data.data;
						banner.item = data;
						banner.$nextTick(function(){
							var mySwiper = new Swiper('.swiper-container1', {
								 /* autoplay:true,//等同于以下设置*/
								  autoplay: {
								    delay: 3000,
								    stopOnLastSlide: false,
								    disableOnInteraction: false,//滑动之后是否继续自动滑动
								    },
								     loop : true,
								     pagination: {
									     el: '.swiper-pagination',
									    clickable :true,
								      },
							});
						})
						
			}).catch(function(response){
						console.log(response)
			});
		
		
	}
	
	
});
//公告
var notice = new Vue({
	el:"#notice",
	data:{
		item:[],
		animate:false,
	},
	created:function(){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/notice/allnotice',
			{params:{
				num:6,
			}},{
				headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
				},
				
			}).then(function(response){
					console.log(response)
					var data = response.data;
					notice.item = data;
					setInterval(notice.showMarquee, 2000)
						
			}).catch(function(response){
						console.log(response)
			});
		
		
	},
	methods:{//公告动画
		 showMarquee: function () {
                this.animate = true;
                setTimeout(()=>{
                    this.item.push(this.item[0]);
                this.item.shift();
                this.animate = false;
            },500)},
  
	}
});



//商品推荐
var recommend = new Vue({
	el:"#recommend",
	data:{
		recom:[],
	},
	created:function(){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist',
			
			{params:{
				cate_id:0,
				num:4,
				is_recommend:1,
				page:1,
			}},{
				headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
				},
				
			}).then(function(response){
					console.log(response)
					var data = response.data.data;
					recommend.recom = data;
					recommend.$nextTick(function(){
						var mySwiper2 = new Swiper('.swiper-container2', {
								slidesPerView: 'auto',
					      		spaceBetween: 0,
					     		 freeMode: true,
								  clickable: true,
						});


					})
						
			}).catch(function(response){
						console.log(response)
			});
		
		
	},
	methods:{
		goods_click(reco){
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist',
			
			{params:{
				cate_id:0,
				num:4,
				is_recommend:0,
				page:1,
			}},{
				headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
				},
				
			}).then(function(response){
					console.log(response)
					var data = response.data.data;
					lists.lis = data;
					localStorage.setItem('goods_id',JSON.stringify(reco.goods_id));
					window.location.href="gift_details.html"
			
			}).catch(function(response){
						console.log(response)
			});
			
			
			
		}
	},
	
	
	
});



//商品详情
var lists = new Vue({
	el:"#lists",
	data:{
		lis:[],
		page:1,
		num:4,
		that:''
	},
	created:function(){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist',
			
			{params:{
				cate_id:0,
				num:4,
				is_recommend:0,
				page:1,
			}},{
				headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
				},
				
			}).then(function(response){
					console.log(response)
					var data = response.data.data;
					lists.lis = data;
					lists.$nextTick(function(){
						var mySwiper3 = new Swiper('.swiper-container3', {
								slidesPerView: 'auto',
					      		spaceBetween: 0,
					     		 freeMode: true,
								  clickable: true,
						});	

					})
				
			}).catch(function(response){
						console.log(response)
			});
		
		
	},
	methods:{
		//商品
		goods_click(li){
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist',
			
			{params:{
				cate_id:0,
				num:4,
				is_recommend:0,
				page:1,
			}},{
				headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
				},
				
			}).then(function(response){
					console.log(response)
					var data = response.data.data;
					lists.lis = data;
					localStorage.setItem('goods_id',JSON.stringify(li.goods_id));
					window.location.href="gift_details.html"
					
			}).catch(function(response){
						console.log(response)
			});
			
			
			
		},
		//更多
		go_lists(index){
		localStorage.setItem('num',JSON.stringify(index));
			
		},
	  // 加载更多的内容到列表中
		moregoods(index){
					     axios.get(
						'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist',
						{params:{
							cate_id:0,
							num:lists.lis[index].length+4,
							is_recommend:0,
							page:1,
							
						}},{
							headers:{
									'Content-Type': 'application/x-www-form-urlencoded',
							},
						}).then(function(response){
//								console.log(response)
							  	var data = response.data.data;
								lists.lis[index] = data[index];
							
					   
						}).catch(function(response){
								console.log(response)
								
						});
		}
			
			
	},
	
	
	
});
