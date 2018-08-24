var myCollection2 = new Vue({
	el:"#myCollection2",
	data:{
		lists:[{}],
		lists_length:0,
	},
	created:function(){
		axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/users/getcollectionlist',
			{
				params:{
					access_token:token,
					type:"商品",
					Num:"2",
				}},{
					headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(response){
					var data = response.data.data
					console.log(data)
					myCollection2.lists = data;
					myCollection2.lists_length = data.length;
					console.log(myCollection2.lists_length)
					
					myCollection2.$nextTick(function(){
						var collect_id = data[0].collect_id;
						console.log(collect_id)
						var del = document.getElementsByClassName("del");
						for(var i = del.length-1; i>= 0; i--){ 
							del[i].index = i;
							del[i].onclick = function(){
								var collect_id = data[this.index].collect_id;
								console.log(collect_id);
							axios.get(
								'http://ddpointmall.wiwipu.com/index.php/api/users/delcollection',
								{
									params:{
										access_token:token,
										collect_id:collect_id,
									}},{
										headers:{
											'Content-Type':'application/x-wwww-form-urlencoded'
										}
									}).then(function(bbs){
										console.log(bbs);
									}).catch(function(bbs){
										console.log(bbs);
									});
									del[this.index].parentNode.parentNode.removeChild(del[this.index].parentNode);
							}
							}
					})
				}).catch(function(response){
					console.log(response)
				});
	}
})