 var myGift = new Vue({
	el:"#myGift",
	data:{
		lists:[],
		lists_length:0,
		order_id:"",
	},
	created:function(){
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
				myGift.lists = data;
				myGift.lists_length = data.length;
			}).catch(function(response){
				console.log(response);
			});
	},
	methods:{
		payment:function(e){
			console.log(e);
			console.log(e.target.dataset['id']);
			var order_id = e.target.dataset['id'];
			e.target.parentNode.parentNode.parentNode.parentNode.remove();
			console.log(order_id)
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/order/immediatePayment',
			{params:{
				access_token:token,
				order_id:order_id,
			}},{
				headers:{
					'Content-Type':'application/x-www-from-urlenconded'
				}
			}).then(function(response){
				console.log(123123)
				console.log(response);
			}).catch(function(response){
				console.log(response);
			});
			}
		}
})
