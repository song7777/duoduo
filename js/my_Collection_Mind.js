var myCollection1 = new Vue({
	el:"#myCollection1",
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
					type:"礼品",
					Num:"2",
				}},{
					headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(response){
					var data = response.data.data
					console.log(data)
					myCollection1.lists = data;
					myCollection1.lists_length = data.length;
					console.log(myCollection1.lists_length)
					
					myCollection1.$nextTick(function(){
						var collect_id = data[0].collect_id;
						console.log(collect_id)
						var del = document.getElementsByClassName("del");
						for(var i = del.length-1; i>= 0; i--){ 
							del[i].index = i;
							del[i].onclick = function(){
								var collect_id = data[this.index].collect_id;
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


////从购物车删除
//					shopCart2.$nextTick(function(){
//						var CartDel = document.getElementsByClassName("CartDel");
//						for(var i = CartDel.length-1; i>= 0; i--){ 
//							CartDel[i].index = i;
//							CartDel[i].onclick = function(){
//
//								cart_id = Array[this.index].id;
//								console.log(this.index)
//								console.log(cart_id)
//								$.ajax({
//									type:"post",
//									url:"http://xiaoer.yuncentry.com/index.php/api/cart/CartDel",
//									data:{
//										id:cart_id,
//										access_token:token,
//									},
//									dataType:"json",
//									success:function(data){
//										console.log(data)
//										
//									}
//								});	
//								$(this).parent().remove(); //  parents()返祖   返回任意一级父元素。     parent()返回上一级  
////								$(this).parent().css("display","none")
//							}
//						}
//						
//					})
