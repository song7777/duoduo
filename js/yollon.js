var yollon = new Vue({
	el:'#yollon',
	data:{
		
	},
	created:function(){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/seller/addsellerapply',
		   {
		   	params:{
		   		access_token:token
		   	}},{
		   		headers:{
		   			'Content-Type': 'application/x-www-form-urlencoded',
		   		},
		   	}).then(function(reponse){
		   		console.log(reponse)
		   	}).catch(function(reponse){
		   		console.log(reponse)
		   	});
		}
	
	
});