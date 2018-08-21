var  sjzh = new Vue({
	el:'#sjzh',
	data:{
		
	},
	created:function(){
		
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/seller/sellerdetailed',

			{params:{
				access_token: token,
                type:'消费金额',				
				num: 4,
				page: 1,
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
			console.log(response);
		}).catch(function(response){
			console.log(response);
		});
}
	});