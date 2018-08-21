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
																		mui.toast(error_msg)
																		return;
																	}
																		var data = response.data.data
																		var access_token = data.access_token;//登录凭证
																		localStorage.setItem('token',JSON.stringify(access_token));
//																		location.reload();
																		window.location.href ='personal_center.html';
																		
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