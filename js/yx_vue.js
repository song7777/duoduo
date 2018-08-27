var mySwiper = new Swiper('.swiper-container4', {
	autoplay: false, //可选选项，自动滑动
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		observer: true,//修改swiper自己或子元素时，自动初始化swiper
		observeParents: true//修改swiper的父元素时，自动初始化swiper
	},
})

var mySwiper = new Swiper('.swiper-container1', {
	autoplay: true, //等同于以下设置
	autoplay: {
		delay: 2000,
		stopOnLastSlide: false,
		disableOnInteraction: true,
	},
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,

	},

});
//消息图标
var message = new Vue({
	el:"#message",
	data:{
		item:[],
		items:'',
	},
	created:function(){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/Notice/userNews',
			{params:{
				access_token:token
			}},{
				headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
				},
				
			}).then(function(response){
				
					console.log(response)
					var cirCular = document.getElementsByClassName("circular")[0];
					console.log(response.data)
					var data = response.data.data;
					message.item = data;
					message.items = data.length;
					for(var i = 0 ; i<message.items ; i++){

						if(message.items>0){
							cirCular.style.display ="block";
						}
						else{
							cirCular.style.display ="none";
						}
					}
			}).catch(function(response){
						console.log(response)
						console.log("未登录")
			});
		}
		
	
	
});




//底部跳转登录
var footer = new Vue({
	el:"#footer",
	data:{
		tan:'',
	    nums:'',
	},
	methods:{
		usercenter:function(){
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/users/getuserinfo',
				{params:{
					access_token:token
				}}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
				}).then(function(response) {
						console.log(response)
						console.log(token)
						if(token == null){
							axios.get(
								'login.html',
								{params:{
									
								}}, {
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded'
									},
								}).then(function(rel) {
										console.log(rel)
										footer.tan = rel.data;//页面数据加载
										
										footer.$nextTick(function(){
											var login = new Vue({
												el:"#login",
												data:{
													mobile:this.mobile,
													password:this.password
												},
												methods:{
													click_log:function(){
														axios.get(
															'http://ddpointmall.wiwipu.com/index.php/api/users/login',
															{params:{
																mobile:this.mobile,
																password:this.password,
															}}, {
																headers: {
																	'Content-Type': 'application/x-www-form-urlencoded'
																},
															}).then(function(response) {
																	console.log(response)
																	//error_code提示
																	var error_code = response.data.error_code;
																	var error_msg = response.data.error_msg;
																/*	if(!login.mobile || !login.password){
																		mui.toast("手机号码或密码不能为空");
																		return;
																	}
																	if(!/^1[3|4|5|7|8][0-9]{9}$/.test(login.mobile)){
																		mui.toast("请输入正确的手机号")
																		return;
																	}*/
																	if(error_code>0){
//																		mui.toast("帐号或密码错误")
																		mui.toast(error_msg)
																		return;
																	}
																		var data = response.data.data
																		var access_token = data.access_token;//登录凭证
																		localStorage.setItem('token',JSON.stringify(access_token));
																		location.reload();
	
																		console.log(error_code)
																		console.log(access_token)
																		
																		
																}).catch(function(response){
																	console.log("数据请求失败")
															});
														
													}
												}
											})
										})
									
									}).catch(function(response){
										console.log("数据请求失败")
							});
							
						} else if(token != null){
							window.location.href ='personal_center.html';
						}
					}).catch(function(response){
						console.log("数据请求失败")
			});
		}
	},
	
	created:function(){//已选礼品
		axios.get(
		'http://ddpointmall.wiwipu.com/index.php/api/cart/getshowcart',
		{params:{
			access_token:token,
			num:100,
		}},{
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded',
				
			},
		}).then(function(response){
			console.log(response)
			var buy = document.getElementsByClassName("buy_num")[0];
			var error_code = response.data.error_code;
			if(error_code>0){
				buy.style.display ="none";
				return
			};
			var data = response.data.data;	
			var buy = document.getElementsByClassName("buy_num")[0];
			footer.nums = data.length;
			
		}).catch(function(response){
			console.log(response)
			
		});
	
	}
	
	
});
//轮播图
var banner = new Vue({
	el: "#banner",
	data: {
		item: [],
		items: "",
	},
	created: function() {
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/adver/getadverinfo', {
				params: {
					type: 0,
				}
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}).then(function(response) {
			var data = response.data.data;
			banner.items = data.length;
			banner.item = data;
			banner.$nextTick(function() {
				var mySwiper = new Swiper('.swiper-container1', {
					/* autoplay:true,//等同于以下设置*/
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false, //滑动之后是否继续自动滑动
						observer: true,//修改swiper自己或子元素时，自动初始化swiper
						observeParents: true//修改swiper的父元素时，自动初始化swiper
					},
					loop: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
				});
			})
		}).catch(function(response) {
			console.log(response)
		});
	}
})

//商品分类
var product = new Vue({
	el:'#product',
	data:{
		arr:[],
		arrs:"", 
	},
	created:function(){
		var self = this;
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/categories/getCateList/',
			{
				params:{
					access_token:token,
					type:'商品',
					num:5,
				}},{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}).then(function(response){
					console.log(response);
					self.arr = response.data.data;
					console.log(self.arr);
				}).catch(function(response){
					console.log(response);
				})
	}
})
//购物单
var shoplist = new Vue({
	el: '#shoplist',
	data: {
		lenth: [],
	},
	methods: {
		shoplist: function() {
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/shoplist/getshoplistInfo', {
					params: {
						access_token: 'token',
					}
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}).then(function(response) {
				var data = response.data;
				console.log(data);
				shoplist.lenth = data;
				console.log(shoplist.lenth);
								console.log(shoplist.lenth);
							    var	lenth = data.length;
								console.log(lenth);
								window.location.href = 'shoppingList.html';
			}).catch(function(response) {
				console.log(response);
			});
		}
	}
});

//底部跳转登录
//商品推荐
var recom = new Vue({
	el:"#recom",
	data:{
		recom:[],
	},
	created:function(){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist',
			
			{params:{
				cate_id:0,
				num:5,
				is_recommend:1,
				page:2,
			}},{
				headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
				},
				
			}).then(function(response){
					console.log(response)
					var data = response.data.data;
					recom.recom = data;
					recom.$nextTick(function(){
						var mySwiper2 = new Swiper('.swiper-container2', {
								slidesPerView: 'auto',
					      		spaceBetween: 0,
					     		 freeMode: true,
								  clickable: true,
								observer: true,//修改swiper自己或子元素时，自动初始化swiper
								 observeParents: true//修改swiper的父元素时，自动初始化swiper
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
					console.log(reco.goods_id)
					localStorage.setItem('goods_id',JSON.stringify(reco.goods_id));
					window.location.href="gift_details.html"
			}).catch(function(response){
						console.log(response)
			});
		}
	},
});
//2
var recommend = new Vue({
	el:"#recomend",
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
						var mySwiper3 = new Swiper('.swiper-container3', {
								slidesPerView: 'auto',
					      		spaceBetween: 0,
					     		 freeMode: true,
								  clickable: true,
								  observer: true,//修改swiper自己或子元素时，自动初始化swiper
								  observeParents: true//修改swiper的父元素时，自动初始化swiper
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
					console.log(reco.goods_id)
					localStorage.setItem('goods_id',JSON.stringify(reco.goods_id));
					window.location.href="gift_details.html"
			
			}).catch(function(response){
						console.log(response)
			});
			
			
			
		}
	},
	
	
	
});
