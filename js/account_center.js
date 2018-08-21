var count_center = new  Vue({
	el:'#count_center',
	data:{
		
	},
	created:function(){
	
	 axios.get(
	 	'http://ddpointmall.wiwipu.com/index.php/api/seller/sellerdetailed',
	 	{
	 		params:{
	 	    access_token:'1f9884d6266faf649a837ec38d8577c6'	,	
	 	}},{
	 		headers:{
	 			'Content-Type': 'application/x-www-form-urlencoded'
	 		}
	 	}).then(function(response){
	 		console.log(response);
	 	}).catch(function(response){
	 		
	 	});
	}
});