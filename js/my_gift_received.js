 var myRec = new Vue({
	el:"#myRec",
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
				myRec.lists = data;
				myRec.lists_length = data.length;
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
			
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/order/confirm',
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
				if(response.data.error_code == 0){
					mui.toast("确认收货成功");
				}else{
					mui.toast("确认收货失败");
				}
			}).catch(function(response){
				console.log(response);
			});
			}
		}
})
