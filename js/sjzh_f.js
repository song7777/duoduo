var  sjzh_f = new Vue({
	el:'#sjzh_f',
	data:{
		abstract_type:'',
		create_time:'',
		des:'',
		money:'',
		status:'',
		arr:[],
		arrs:'',
	},
	created:function(){
		 var self = this;
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/seller/sellerdetailed',

			{params:{
				access_token: token,
                type:'消费返点',				
				num: 4,
				page: 1,
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
			  self.arr  = response.data.data;
			  sjzh_f.abstract_type = self.arr[0].abstract_type;
			  sjzh_f.
			  console.log(self.arr);
		}).catch(function(response){
			console.log(response);
		});
}
	});