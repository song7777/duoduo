 var myEva = new Vue({
	el:"#myEva",
	data:{
		lists:[],
		lists_length:0,
	},
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
				console.log(response.data.data)
				var data = response.data.data;
				myEva.lists = data;
				myEva.lists_length = data.length;
			}).catch(function(response){
				console.log(response);
			});
	},
	methods:{
		record:function(e){
			var order_id = e.target.dataset['id'];
			e.target.parentNode.parentNode.parentNode.parentNode.remove();
			console.log(e);
			console.log(e.target.dataset['id']);
			var order_id = e.target.dataset['id'];
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/order/removeorder',
				{params:{
					access_token:token,
					order_id:order_id,
				}},{
					headers:{
						'Content-Type':'application/x-www-from-urlenconded'
					}
				}).then(function(response){
					console.log(response);
				}).catch(function(){
					console.log(response);
				});
			}
		}
})
