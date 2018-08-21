var messages = new Vue({
	el:"#messages",
	data:{
		content:"",
		item:[],
		items:"",
	},
	
	created:function(){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/Notice/userNews',
			{params:{
				access_token:token
			}},{
				header:{
						'Content-Type': 'application/x-www-form-urlencoded',
				},
			}).then(function(response){
				console.log(response)
				var data = response.data.data;
				var error_code = response.data.error_code;
				var error_msg  = response.data.error_msg ;
				if(error_code > 0){
					mui.toast("无消息");
					return;
				};
				messages.item = data;
				messages.items = data.length;
				
				
				
			}).catch(function(response){
				console.log(response)

			})
	},
	//倒序输出
	computed:{

			reitem(){
			return this.item.reverse();

		}
		
	}
	
	
	
	
})

