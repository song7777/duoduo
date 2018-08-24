var goods_id = JSON.parse(localStorage.getItem('goods_classid'));
console.log(token)
console.log(goods_id)
var Taobao = new Vue({
	el:'#Taobao',
	data:{
		imgs:"",
		data:"",
		shop_price:0,
		collection:[],
//		collection2:[],
		collection3:[],
	},
	created:function(){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodsdetailinfo',
			{params:{
				goods_id:goods_id,
			}},{
				headers:{
					'Content-Type':'application/x-www-form-urlencoded'
				}
			}).then(function(response){
				console.log(response)
				console.log(response.data.goods_info.data.cover_img)
				Taobao.imgs = response.data.goods_info.data.cover_img;
				Taobao.data = response.data.goods_info.data.goods_name;
				Taobao.shop_price = response.data.goods_info.data.shop_price;
			}).catch(function(response){
				console.log(response)
			});
			
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/users/getcollectionlist',
			{params:{
				access_token:token,
				type:"礼品",
				Num:40,
				
			}},{
				headers:{
					'Content-Type':'application/x-www-form-urlencoded'
				}
			}).then(function(response){
				Taobao.collection = response.data.data;
				console.log(Taobao.collection)
				for(x in Taobao.collection){
					console.log(Taobao.collection[x].goods_id)
					var like = document.getElementsByClassName("like");
					if(goods_id == Taobao.collection[x].goods_id){
						console.log(goods_id)
						like[0].src ="images/Collection-b.png";
					}
				}
			}).catch(function(response){
				console.log(response)
			});
	},
	methods:{
		voucher:function(){
			mui.toast("该商品暂无优惠卷");
		},
		whether:function(){
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/users/getcollectionlist',
			{params:{
				access_token:token,
				type:"礼品",
				Num:40,
			}},{
				headers:{
					'Content-Type':'application/x-www-form-urlencoded'
				}
			}).then(function(response){
				console.log(response)
				var like = document.getElementsByClassName("like");
				Taobao.collection = response.data.data;
				console.log(Taobao.collection)
				Taobao.collection3 = [];
				for(x in Taobao.collection){
					Taobao.collection3.push(Taobao.collection[x]);
				}
				console.log(Taobao.collection3)
				var collection3_length = Taobao.collection3.length
				console.log(collection3_length)
				for(var i = 0; i<collection3_length;i++){
					console.log(Taobao.collection3[i])
					if(goods_id == Taobao.collection3[i].goods_id){
						var collect_id = Taobao.collection3[i].collect_id;
						console.log(collect_id)
						axios.get(
								'http://ddpointmall.wiwipu.com/index.php/api/users/delcollection',
								{params:{
									access_token:token,
									collect_id:collect_id,
								}},{
									headers:{
										'Content-Type':'application/x-www-form-urlencoded'
									}
								}).then(function(response){
									console.log(response)
									like[0].src ="images/Collection-a.png";
								}).catch(function(response){
									console.log(response)
								});
								console.log(like[0])
									return;
					}else if(goods_id !== Taobao.collection3[i].goods_id){
						axios.get(
								'http://ddpointmall.wiwipu.com/index.php/api/users/addcollection',
								{params:{
									access_token:token,
									type:"礼品",
									goods_id:goods_id,
									
								}},{
									headers:{
										'Content-Type':'application/x-www-form-urlencoded'
									}
								}).then(function(response){
									console.log(response)
									like[0].src ="images/Collection-b.png";
								}).catch(function(response){
									console.log(response)
								});
								return;
					}
					
				}
			}).catch(function(response){
				console.log(response)
			});
		
		}
	}
})