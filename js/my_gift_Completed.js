 var myCom = new Vue({
	el:"#myCom",
	data:{
		lists:[],
		lists_length:0,
	},
	created:function(){
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
				console.log(response.data)
				var data = response.data.data;
				myCom.lists = data;
				myCom.lists_length = data.length;
			}).catch(function(response){
				console.log(response)
			});
	},
	methods:{
		payment:function(e){
			console.log(e);
			console.log(e.target.dataset['id']);
			console.log(123123)
			console.log(e.target.dataset['idd']);
			var order_id = e.target.dataset['idd'];
			console.log(order_id)
			var goods_id = e.target.dataset['id'];
			localStorage.setItem('order_id',JSON.stringify(order_id))
			localStorage.setItem('goods_id',JSON.stringify(goods_id))
			window.location.href ='Evaluation_drawing.html';
		},
		del:function(e){
			console.log(e)
			console.log(e.target.dataset['id']);
			var del_order_id = e.target.dataset['id'];
			var button1 = document.getElementsByClassName("order_button1");
			var Com = document.getElementsByClassName("Commodity_details");
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/order/removeorder',
				{params:{
					access_token:token,
					order_id:del_order_id,
				}},{
					headers:{
						'Content-Type':'application/x-www-from-urlenconded'
					}
				}).then(function(response){
					console.log(response);
				}).catch(function(){
					console.log(response);
				});
			e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);
		}
	}
})
