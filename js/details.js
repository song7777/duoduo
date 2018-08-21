var gd_details = new Vue({
	el:"#gd_details",
	data:{
		details:[],
	},
	created:function(){
		var self =this;
		axios.get("http://ddpointmall.wiwipu.com/index.php/api/adver/getadverinfo",
		{params:{
		    type:2,	
		}},{
			headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
		}).then(function(response){
			var data = response.data.data
			self.details = data;
		}).catch(function(response){
			console.log(response);
		});
	}
})