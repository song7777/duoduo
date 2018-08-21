//滑动显示头部
var scroll = {
	oScroll: function() {
		var oTop = document.getElementsByClassName("gd-header2")[0];
		var iHeadr = document.getElementsByClassName("head_top")[0];
		var oImg = document.getElementsByClassName("top_img1")[0];
		var iMeun = document.getElementsByClassName("gd-goods-meun")[0];
		document.onscroll = function() {
			var t = document.documentElement.scrollTop || document.body.scrollTop;
			var floor = t / 300;
			var aa = floor.toFixed(2);
//			console.log(t)
			if(t > 0) {
				iHeadr.style.borderBottom = '1px solid rgba(220,33,76,' + aa + ')';
				iHeadr.style.background = 'rgba(220,33,76,' + aa + ')';
				oImg.src = "images/goback-a.png";
				oImg.classList.remove("gd_back")
				iMeun.style.display = "flex"
			} else{
				oImg.src = "images/goback-b.png";
				oImg.classList.add("gd_back");
				iMeun.style.display = "none";
				iHeadr.style.border = "none"
				iHeadr.style.background = "none";
			}
		}
//	头部选项卡
		var sHeader =document.getElementsByClassName("gd-goods-cutover");
		var gdContent =document.getElementsByClassName("gd_display");
		var j = 0;
		for (var i = 0; i < sHeader.length; i++) {
			sHeader[i].index = i;
			sHeader[i].onclick=function(){
				gdContent[j].style.display = "none"
				sHeader[j].classList.remove("gd-goods-active")
				j = this.index;
				gdContent[this.index].style.display="block"
				sHeader[this.index].classList.add("gd-goods-active")
			}
		}
	}
}
scroll.oScroll();
//选择商品颜色
var para ={
	iPara: function() {
		var iSelect = document.getElementsByClassName("pa-se-option1");
		var oSelect = document.getElementsByClassName("pa-se-option2");
		var j = 0;
		for(var i = 0; i < iSelect.length; i++) {
			iSelect[i].index = i;
			iSelect[i].onclick = function() {
				iSelect[j].style.borderColor = "#5F5E5C";
				iSelect[j].style.color = "#5F5E5C";
				j = this.index;
				iSelect[this.index].style.borderColor = "#DC214C";
				iSelect[this.index].style.color = "#DC214C";
			}
		}
	}
}
//选择商品大小
var para2 = {
	iPara2: function() {
		var oSelect = document.getElementsByClassName("pa-se-option2");
		var k = 0;
		for (var i = 0; i < oSelect.length; i++) {
			oSelect[i].index = i;
			oSelect[i].style.borderColor = "#5F5E5C";
			oSelect[i].style.color = "#5F5E5C";
			oSelect[i].onclick = function() {
				oSelect[k].style.borderColor = "#5F5E5C";
				oSelect[k].style.color = "#5F5E5C";
				k = this.index;
				oSelect[this.index].style.borderColor = "#DC214C";
				oSelect[this.index].style.color = "#DC214C";
			}
		}
	}
}
//登录功能
function login(){
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
										goodsBuy.tan = rel.data;//页面数据加载
										goodsBuy.$nextTick(function(){
											var login = new Vue({
												el:"#login",
												data:{
													mobile:this.mobile,
													password:this.password,
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
							
						} 
}
var gd_goods = new Vue({
	el: "#gd_goods",
	data: {
		banners:[],
		cover_img: "",
		goods_name:"",
		shop_price:"",
		collect_id:"",
		tan:'',
	},
	created: function() {
//		获取商品基础信息
		var self = this;
		axios.get(
			"http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodsdetailinfo", {
				params: {
					goods_id:goods_id,
				}
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
			var data = response.data.goods_info.data;
			console.log(response)
			self.banners = response.data.img.data;
			gd_goods.goods_name = data.goods_name;
			gd_goods.shop_price = data.shop_price;
			gd_goods.$nextTick(function() {
//				商品信息图片轮播
				var mySwiper = new Swiper('.swiper-container1', {
					loop: true,
					pagination: {
						el: '.swiper-pagination',
					},
					autoplay: true,
				})
			})
		}).catch(function(response) {
			console.log(response);
		});
//	确认商品的收藏状态
		axios.get(
			"http://ddpointmall.wiwipu.com/index.php/api/users/getcollectionlist", {
				params: {
					access_token:token,
					type:"礼品",
					Num:5
				}
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
				console.log(response)
				var data = response.data.data;
//						console.log(data)
					for(i in data){
						if(data[i].goods_id == goods_id){
							gd_goods.collect_id = data[i].collect_id;
							var delCollection = document.getElementById("delcollection");
							var collection = document.getElementById("collection");
							delCollection.style.display = "flex";
					        collection.style.display = "none";
						}
					}
		}).catch(function(response) {
			console.log(response);
		});
	},
	methods:{
//		收藏商品
		collection:function(){
			axios.get(
			"http://ddpointmall.wiwipu.com/index.php/api/users/addcollection", {
				params: {
					goods_id: goods_id,
				    access_token:token,
					type:"礼品"
				}
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
			console.log(response.data)
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
										gd_goods.tan = rel.data;//页面数据加载
										gd_goods.$nextTick(function(){
											var login = new Vue({
												el:"#login",
												data:{
													mobile:this.mobile,
																password:this.password,
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
							
						} 
			 var data = response.data;
			 gd_goods.collect_id = data.collect_id;
				console.log(gd_goods.collect_id)
            gd_goods.$nextTick(function(){
            	if(token == null){
            		
            	}else{
            		var delCollection = document.getElementById("delcollection");
                	var collection = document.getElementById("collection");
					delCollection.style.display = "flex";
					collection.style.display = "none";
            	}
				})
		    }).catch(function(response) {
			    console.log(response);
		    });
		},
//		取消收藏
		delcollection:function(){
						console.log(gd_goods.collect_id)
			axios.get(
			"http://ddpointmall.wiwipu.com/index.php/api/users/delcollection", {
				params: {
				    access_token:"1f9884d6266faf649a837ec38d8577c6",
					collect_id:gd_goods.collect_id
				}
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
			console.log(response)
				gd_goods.$nextTick(function(){
					var delCollection = document.getElementById("delcollection");
                    var collection = document.getElementById("collection");
					    delCollection.style.display = "none";
					    collection.style.display = "flex";
				})
		    }).catch(function(response) {
			    console.log(response);
		    });
		}
	}
})
var goodsParameter = new Vue({
	el:"#goodsParameter",
	data:{
		options:"",
		option2s:"",
		goodsAttr:[],
		goodsAttr2:[],
		attr_value: [],
		buyNumber:1,
		text:"",
		attr:[],
		stock: 0,
		price:"1",
		discount_price:"",
		hour:0,
		minuter:0,
		second:0,
		iText:"",
		cate_id:0,
		recommends:[],
		spec_id:0,
	},
	created:function(){
//	获取商品属性信息
		self = this;
		axios.get(
			"http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodsdetailinfo", {
			params:{
				goods_id:goods_id,
			}
			},{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response){
				self.attr_value = response.data.specs.data
				var dData = response.data.goods_info.data;
				self.cate_id = dData.cateid;
				var iData = response.data.specs;
				var iArr = [];
				var iArry = [];
				for(var i in iData.spec_2){
					iArr.push(iData.spec_2[i])	
				}
				for(var i in iData.spec_3){
					iArry.push(iData.spec_3[i])	
				}
				console.log(iData);
				console.log(response)
				goodsParameter.options = iArr.length;
				goodsParameter.goodsAttr = iArr;
				goodsParameter.goodsAttr2 = iArry;
				self.discount_price = dData.discount_price;
//	限时优惠
				var nowDate = new Date();
				var nowTime = parseInt(nowDate.getTime()/1000);
				console.log(nowTime)
				var date = dData.discount_end - nowTime;
				function countDown(date) {
					var timer = null;
					timer = setInterval(function() {
						var day = 0;
						if(date > 0) {
							self.hour = Math.floor(date / (60 * 60));
							self.minuter = Math.floor(date / 60) - (self.hour * 60);
							self.second = Math.floor(date) - (self.hour * 60 * 60) - (self.minuter * 60);
						}
						if(self.hour <= 9) self.hour = "0" + self.hour;
						if(self.minuter <= 9) self.minuter = "0" + self.minuter;
						if(self.second <= 9) self.second = "0" + self.second;
						date--;
					}, 1000)
					if(date < 0){
						clearInterval(timer)
						self.hour = "0" + self.hour;
						self.minuter = "0" + self.minuter;
						self.second = "0" + self.second;
					}
				}
				if(nowTime > dData.discount_start){
					countDown(date);
				}
				self.$nextTick(function(){
					var mySwiper2 = new Swiper('.swiper-container2', {
						slidesPerView: 'auto',
						spaceBetween: 0,
						freeMode: true,
						clickable: true,
					});
				    para.iPara();
				})
			}).catch(function(response){
				
			});
//			相关商品
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist',
			{params:{
				cate_id:self.cate_id,
				num:10,
				is_recommend:1,
				page:1,
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
			console.log(response);
			var data = response.data.data;
			self.recommends = data;
		}).catch(function(response){
			console.log(response);
		});
		},
//		选择商品颜色
		methods:{
			testclick : function(e){
				console.log(this.goodsAttr2);
				this.text = event.target.innerText;//获取点击的值
				console.log(this.text)
				this.attr = this.attr_value;
				console.log(this.attr)
				this.buyNumber = 1;
				this.iText = "";
				var weight = [];
				this.spec_id = null;
				for(i in goodsParameter.attr){
//					用已获取的值与数据对比
					if(goodsParameter.attr[i].spec_2 == goodsParameter.text){
						weight.push({'name' : goodsParameter.attr[i].spec_3});//获取商品大小
					}
				}
				console.log(weight);
				this.goodsAttr2 = weight;
				
				goodsParameter.$nextTick(function(){   
					para2.iPara2();
					
				})
			},
//			选择商品大小
			sizeClick :function(e){
						this.iText = event.target.innerText;
						var iStock = 0;
						if (this.text == "") {
							mui.toast("请选择商品颜色")
						}
						for(x in this.attr){
//					用已获取的值与数据对比
							if (this.attr[x].spec_2 == this.text && this.attr[x].spec_3 == this.iText) {
									this.stock = this.attr[x].stock;//获取库存
									this.price = this.attr[x].price;//获取价格
									this.spec_id =this.attr[x].spec_id;//获取商品属性ID
									gd_goods.shop_price = this.price;//将价格传到页面
							}
					}
			},
//			添加商品数量
			iAdd : function(e){
//				console.log(this.buyNumber);
				this.buyNumber++;
				if(this.buyNumber>this.stock && this.stock != 0){
					this.buyNumber = this.stock;
					mui.toast("库存不足")
				}
				if (this.text == "" || this.iText == "") {
					this.buyNumber = 1;
					gd_goods.shop_price = gd_goods.shop_price;
				}else{
					gd_goods.shop_price = (this.price*this.buyNumber).toFixed(2);
				}

			},
//			减少商品数量
			iLess : function(e){
				this.buyNumber--;
				this.buyNumber < 1 ? (this.buyNumber = 1) : this.buyNumber;
				if (this.text == "" || this.iText == "") {
					this.buyNumber = 1;
					gd_goods.shop_price = gd_goods.shop_price;
				}else{
					gd_goods.shop_price = (this.price*this.buyNumber).toFixed(2);
				}
			},
			goodsClick:function(event){
				var goodsId = parseInt(event.target.dataset.goodsid);
				console.log(goodsId)
			localStorage.setItem('goods_id',JSON.stringify(goodsId));
			}
		}
});
//加入购物车
var goodsBuy = new Vue({
	el:"#goodsBuy",
	data:{
		tan:'',
	},
	methods:{
//		加入礼品车
		addCart:function(){
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/cart/addCart',
			{params:{
				access_token:token,
				goods_id:goods_id,
				spec_id:goodsParameter.spec_id,
				num:goodsParameter.buyNumber,
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
			console.log(response);
			login();
			if (goodsParameter.text == "") {
							mui.toast("请选择商品颜色")
						}
			if (goodsParameter.iText == "" && goodsParameter.text != "") {
							mui.toast("请选择商品大小")
						}
			if(response.data.error_code == 0){
				mui.toast("加入成功")
			}
			if(response.data.error_code == 2){
				mui.toast(response.data.error_msg)
			}
		}).catch(function(response){
			console.log(response);
		});
		},
//		立即兑换
		imCon:function(){
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/order/orderconfirm',
			{params:{
				access_token:token,
				goods_ids:[goods_id],
				spec_ids:[goodsParameter.spec_id],
				price:[(goodsParameter.price*goodsParameter.buyNumber)],
				nums:[goodsParameter.buyNumber],
				status:3
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response){
			console.log(response);
			login();
			var order_id = response.data.order_id;
			console.log(order_id)
			localStorage.setItem('orderid',JSON.stringify(order_id));
			if(response.data.error_code == 1 || response.data.error_code == 2){
				
			}else{
				window.location.href = "orderConfirmation.html"
			}
			if (goodsParameter.text == "") {
							mui.toast("请选择商品颜色")
						}
			if (goodsParameter.iText == "" && goodsParameter.text != ""){
							mui.toast("请选择商品大小")
					}
		}).catch(function(response){
			console.log(response);
		});
		}
	}
});
