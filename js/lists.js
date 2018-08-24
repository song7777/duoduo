
//商品详情
var lists = new Vue({
	el:"#lists",
	data:{
		lis:[],
		goods:[],
		goodsName:"",
		num :num,
		
	},
	created:function(index){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist',
			
			{params:{
				cate_id:0,
				num:10,
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
					var iii= [];
					for(i in lists.lis){
						iii.push(i);
					}
//					//初次显示商品详情
					if(num ==null){
						lists.goodsName =iii[0];	
						lists.goods =lists.lis[iii[0]];//显示内容
					}
					else{
						lists.goodsName =lists.num;//显示标题
						lists.goods =lists.lis[lists.num];//显示内容
					}
					//商品列表标题滑动
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
		goods_click(li){//获取点击商品id
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
					console.log(goods_id)
					localStorage.setItem('goods_id',JSON.stringify(li.goods_id));
					window.location.href="gift_details.html"
			}).catch(function(response){
						console.log(response)
			});
		},
		look_click(index){//获取点击分类id
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
					console.log(index)
					localStorage.setItem('num',JSON.stringify(index));
					var data = response.data.data[index];
					lists.goods = data;
					lists.goodsName = index;
					location.reload();
			
			}).catch(function(response){
						console.log(response)
			});
		}
			
	},
});



//下拉加载
var loadMore = function(pullRefresh) {
	    // 加载更多的内容到列表中
	     axios.get(
		'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist',
		{params:{
			cate_id:0,
			num:4,
			is_recommend:0,
			page:page,
			
		}},{
			headers:{
					'Content-Type': 'application/x-www-form-urlencoded',
			},
			
		}).then(function(response){
//								console.log(response)
			  	var data = response.data.data;
				lists.lis = data;
				if(lists.lis[num].length ==0){
	    			// 如果没有更多数据了，则关闭上拉加载
				    pullRefresh.endPullupToRefresh(true);
				}
				else{
				    // 如果有更多数据，则继续
				    pullRefresh.endPullupToRefresh(false);
						
				}
				for(var j = 0;j<4;j++){
					lists.goods.push(data[num][j])
				}
				page = page+1;
		}).catch(function(response){
				console.log(response)
		});
	};