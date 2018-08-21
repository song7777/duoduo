var footer = new Vue({
	el:"#footer",
	data:{
		tan:'',
	    nums:'',
	},
	methods:{
		usercenter:function(){
			console.log(hhh)
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/users/getuserinfo',
				{params:{
					access_token:'446b14ffdd68e61d4ec47d6df9fbc50d',
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
													mobile:'15608479672',
													password:'123456'
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




var search = new Vue({
	el: '#search',
	data: {
		shop_price: '',
		sale_num: '',
		goods_name: '',
		arr: [],
		cover_img: '',
		search_sr: '',
		type: 0,
		tmp_data : [],
		num:1,
	},
	methods: {
		search_click: function() {
			var self = this;
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/search/searchgoods', {
					params: {
						name: this.search_sr,
						type: self.type,
						order: "",
					}
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(response) {
				console.log(response);
//              if(!search.search_sr || search_sr != )

                self.arr = response.data.data;
				self.tmp_data = response.data.data;
				var error_code =response.data.error_code;
				var error_msg =response.data.error_msg;
				if(error_code >0){
					mui.toast(error_msg);
					return;
				}
				console.log(error_code)
			}).catch(function(response) {});
		},
		type_click: function() {
			if(this.type == 0) {
				this.type = 1;
				console.log(this.type)
			} else {
				this.type = 0;
				console.log(this.type)
			}
		},
		gc_click: function() {

			console.log('up')
   			var a = this.tmp_data;
			var tmp = '';
			var len = a.length;
			for(var i = 0; i < len; i++) {
				for(var j = 0; j < len-1; j++) {

						if(a[j].sale_num > a[j+1].sale_num) {
							tmp = a[j];
							a[j] = a[j+1];
							a[j+1] = tmp;
						}

				}
			}
			console.log(a);
			Vue.set(this.arr, a);
			this.num += 1;
		},
		gd_click: function() {
			console.log('down')
   			var b = this.tmp_data;
			var tmp = '';
			var len = b.length;
			for(var i = 0; i < len; i++) {
				for(var j = 0; j < len-1; j++) {

						if(b[j].sale_num < b[j+1].sale_num) {
							tmp = b[j];
							b[j] = b[j+1];
							b[j+1] = tmp;
						}
//						
				}
			}
			Vue.set(this.arr, b);
			console.log(this.arr)
			this.num -=1;
		},
	    ga_click: function(){
	    	console.log(123);
	    	var price_up = this.arr;
	    	var temp = '';
	    	var p_len = price_up.length;
	    	  for (var i = 0; i < p_len; i++) {
	    	  	 for (var j = 0; j < p_len-1; j++) {
	    	  	    if(price_up[j].price > price_up[j+1].price){
	    	  	    	temp = price_up[j];
	    	  	    	price_up[j] = price_up[j+1];
	    	  	    	price_up[j+1] = temp;
	    	  	    }
	    	  	 }
	    	  }
	    	  console.log(price_up);
	    	console.log(temp);
	    },
	    gb_click:function(){
	    	console.log(456);
	    	var price_down = this.arr;
	    	var temp = '';
	    	var p_len = price_down.length;
	    	  for (var i = 0; i < p_len; i++) {
	    	  	 for (var j = 0; j < p_len-1; j++) {
	    	  	    if(price_down[j].price < price_down[j+1].price){
	    	  	    	temp = price_up[j];
	    	  	    	price_down[j] = price_down[j+1];
	    	  	    	price_down[j+1] = temp;
	    	  	    }
	    	  	 }
	    	  }
	    	    console.log(price_down);
	    	console.log(temp);
	    }
	}
});
window.onload = function(){
 setTimeout( function(){
  try{
    var t = document.getElementsByClassName('search_sr')[0];
    t.focus();
    t.select();
  } catch(e){}
}, 200);
}
var Ga = document.getElementById('goa');
var Gb = document.getElementById('gob');
var Gc = document.getElementById('goc');
var Gd = document.getElementById('god');
var Sb = document.getElementsByClassName('t_b')[0]
var Sa = document.getElementsByClassName('t_a')[0]
Sb.onclick = function() {
	Sa.style.color = '#8a8685'
	Sb.style.color = '#cd4664';
}
Sa.onclick = function() {
	Sb.style.color = '#8a8685'
	Sa.style.color = '#cd4664';
}
Gc.onclick = function() {
	Gc.src = 'images/goup-b.png';
	Gd.src = 'images/godown-a.png';
}
Gd.onclick = function() {
	Gc.src = 'images/goup-a.png';
	Gd.src = 'images/godown-b.png';
}
Gb.onclick = function() {
	Ga.src = 'images/godown-a.png';
	Gb.src = 'images/goup-b.png';
}
Ga.onclick = function() {
	Gb.src = 'images/goup-a.png';
	Ga.src = 'images/godown-b.png';
}