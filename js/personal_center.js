setTimeout(function(){
    var gallery = mui('.mui-slider');
    gallery.slider({
         interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
    });
},200)


/* 获取数据 */
var personal_center = new Vue({
	el:'#personal_center',
	data:function(){
		return {
			points:0,
			balance:0,
			collect_id:0
		}		
	},
/* 账户积分数据获取  */	
	created:function(){
		var that = this;
		axios.get(
			//'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist/access_token/1f9884d6266faf649a837ec38d8577c6/cate_id/3482/num/3/is_recommend/0/page/0',
			'http://ddpointmall.wiwipu.com/index.php/api/users/getuserinfo',

			{params:{
				access_token:token,
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(res) {
//				console.log(res.data.data.points)
				that.points = res.data.data.points;
		}).catch(function(response){
			console.log(response);
		});
/* 可用余额数据获取 */
		axios.get(
			//'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist/access_token/1f9884d6266faf649a837ec38d8577c6/cate_id/3482/num/3/is_recommend/0/page/0',
			'http://ddpointmall.wiwipu.com/index.php/api/users/getuserinfo',

			{params:{
				access_token:token,
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(res) {
//				console.log(res.data.data.balance)
				that.balance = res.data.data.balance;
				console.log(res);
		}).catch(function(response){
//			console.log(response);
		});
		/* 已收藏数据获取 */
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/users/getcollectionlist',
			{
				params:{
					access_token:token,
					type:"礼品",
					Num:"2",
				}},{
					headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(response){
					var data = response.data.data
//					console.log(response)
//					console.log(response.data.data.length)
					that.collect_id = response.data.data.length;
				}).catch(function(response){
					console.log(response)
				});
	},
	methods:{
    	/* 账户积分点击事件 */
		jifen:function(){
			window.location.href = 'Account_information.html';
		},
		/* 可用余额点击事件 */
		yuE:function(){
			window.location.href = 'fine_balance.html';
		},
		/* 已收藏点击事件 */
		collect:function(){
			window.location.href ='my_Collection_Mind.html';
		}
	},
	
});


/* 用户昵称 */
var nickname = new Vue({
	el:'#nickname',
	data:{
		nickname:""
	},
	created:function(){
		var that = this;
		axios.get(
			//'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist/access_token/1f9884d6266faf649a837ec38d8577c6/cate_id/3482/num/3/is_recommend/0/page/0',
			'http://ddpointmall.wiwipu.com/index.php/api/users/getuserinfo',

			{params:{
				access_token:token,
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(res) {
//				console.log(res.data.data.nickname)
				that.nickname = res.data.data.nickname;
		}).catch(function(response){
			console.log(response);
		});
	},
		methods:{
			nc:function(){
				window.location.href = 'Personal_message.html';
			}
		}
})
/* 用户ID */
var mobile = new Vue({
	el:'#mobile',
	data:{
		mobile:""
	},
	created:function(){
		var that = this;
		axios.get(
			//'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist/access_token/1f9884d6266faf649a837ec38d8577c6/cate_id/3482/num/3/is_recommend/0/page/0',
			'http://ddpointmall.wiwipu.com/index.php/api/users/getuserinfo',

			{params:{
				access_token:token,
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(res) {
//				console.log(res.data.data.nickname)
				that.mobile = res.data.data.mobile;
		}).catch(function(response){
			console.log(response);
		});
	},
		methods:{
			nc:function(){
				window.location.href = 'Personal_message.html';
			}
		}
})





/*消息跳转*/
var xiaoxi = new Vue({
	el:'#xiaoxi',
	data:{
		
	},
	methods:{
		/* 消息点击事件 */
		order:function(){
			window.location.href = 'shoppingList.html';
		}
	}
})
/*我兑换的礼品*/
var present = new Vue({
	el: '#present',
	data:{
		lists_length:'',	/* 已完成*/
		lists_length1:'',	/* 待评价*/
		lists_length2:'',	/* 待收货*/
		lists_length3:''    /* 待支付 */
	},
	/* 待评价*/
	created:function(){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/order/getorderlist',
			{params:{
				access_token:token,
				order_status:"0",
				page:"1",
				num:"20",
			}},{
				headers:{
					'Content-Type':'application/x-www-from-urlenconded'
				}
			}).then(function(response){
				console.log(response.data)
				var data = response.data.data;
				present.lists = data;
				present.lists_length1 = data.length;
//				console.log(present.lists_length1)
				if(present.lists_length1 > 0){
					var daipingjia_num = document.getElementsByClassName("daipingjia_num");
					daipingjia_num[0].style.display = "block";
				}
			}).catch(function(response){
				console.log(response)
			});
			/* 待支付 */
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/order/getorderlist',
			{params:{
				access_token:token,
				order_status:"3",
				page:"1",
				num:"40",
			}},{
				headers:{
					'Content-Type':'application/x-www-from-urlenconded'
				}
			}).then(function(response){
				console.log(response.data.data)
				var data = response.data.data;
				present.lists = data;
				present.lists_length3 = data.length;
//				console.log(present.lists_length3)
//				present.lists_length3 = 0;
				if(present.lists_length3 > 0){
					var daizhifu_num = document.getElementsByClassName("daizhifu_num");
					daizhifu_num[0].style.display = "block";
				}
			}).catch(function(response){
				console.log(response);
			});
			/* 待收货 */
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/order/getorderlist',
			{params:{
				access_token:token,
				order_status:"2",
				page:"1",
				num:"20",
			}},{
				headers:{
					'Content-Type':'application/x-www-from-urlenconded'
				}
			}).then(function(response){
				console.log(response.data.data)
				var data = response.data.data;
				present.lists = data;
				present.lists_length2 = data.length;
//				console.log(present.lists_length2)
				if(present.lists_length2 > 0){
					var daishouhuo_num = document.getElementsByClassName("daishouhuo_num");
					daishouhuo_num[0].style.display = "block";
				}
			}).catch(function(response){
				console.log(response);
			});
			/* 已完成 */
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/order/getorderlist',
			{params:{
				access_token:token,
				order_status:"1",
				page:"1",
				num:"20",
			}},{
				headers:{
					'Content-Type':'application/x-www-from-urlenconded'
				}
			}).then(function(response){
				console.log(response.data.data)
				var data = response.data.data;
				present.lists = data;
				present.lists_length = data.length;
//				console.log(present.lists_length)
				if(present.lists_length > 0){
					var yiwancheng_num = document.getElementsByClassName("yiwancheng_num");
					yiwancheng_num[0].style.display = "block";
				}
			}).catch(function(response){
				console.log(response);
			});
	},
	/* 获取已完成数量显示圆点 */

	methods:{
		/* 待评价点击事件  */
		evaluate:function(){
			window.location.href = 'my_gift_evaluated.html';
		},
		/*待支付点击跳转*/
		unpaid:function(){
			window.location.href = 'my_gift_paid.html';
		},
		/* 待收货点击跳转 */
		cargo:function(){
			window.location.href = 'my_gift_received.html';
		},
		/* 已完成点击跳转 */
		done:function(){
			window.location.href = 'my_gift_Completed.html';
		},
	}
})
/*我的推广*/
var recommend = new Vue({
	el:"#recommend",
	data:{
		tan:'',
	},
	methods:{
		/* 退出登录 */
		usercenter:function(){
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/users/loginout',
				{params:{
					access_token:token
				}}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
				}).then(function(response) {
						console.log(response)
						token =null;
						localStorage.setItem('token',JSON.stringify(token));
						console.log(token)
						
							axios.get(
								'login.html',
								{params:{
									
								}}, {
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded'
									},
								}).then(function(rel) {
										console.log(rel)
										recommend.tan = rel.data;//页面数据加载
										recommend.$nextTick(function(){
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
															
																	if(error_code>0){
//															
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
							
						
					}).catch(function(response){
						console.log("数据请求失败")
			});
		},
		/*我的推广点击事件*/
		promote:function(){
			window.location.href = 'promotion.html';
		},
		/*商家合作点击事件*/
		cooperation:function(){
			window.location.href = 'Application.html';
		}
	
},})

var dizhi = new Vue({
	el:"#dizhi",
	data:{
	},
	methods:{
		/*收货地址管理点击*/
		manage:function(){
			window.location.href = 'Receiving_address.html';
		},
	}
})

var centre = new Vue({
	el:'#centre',
	data:{
		
	},
	methods:{
		/*商城首页点击事件*/
		home_page:function(){
			window.location.href = 'index.html';
		},
		/*客户服务点击事件*/
		serve:function(){
			window.location.href = 'about_us.html';
		},
	}
})
