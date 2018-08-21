var QRcode = new Vue({
	el:"#QRcode",
	data:{
		code:"",
	},
	created:function(){	 
			self = this;
			console.log(self)
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/users/scerweima',
				{
					params:{
						data:'www.baidu.com'
					}},{
						headers:{
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(response) {
				console.log(response.data.data)
					QRcode.code = response.data.data;
			}).catch(function(response){
				console.log(response);
			});
			
	}
})
