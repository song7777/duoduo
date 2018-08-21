var account_inf = new Vue({
	el:"#account_inf",
	data:{
		point_type:"",
		points:"",
		balance:"",
		lists:[{}],
		lists_length:0,
		des:"",
	},
	created:function(){
		axios.get(
			//'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist/access_token/1f9884d6266faf649a837ec38d8577c6/cate_id/3482/num/3/is_recommend/0/page/0',
			'http://ddpointmall.wiwipu.com/index.php/api/users/getaccountinfolist',

			{params:{
				access_token: token,
				belongs:"礼品积分",
				num:"",
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
			console.log(response.data.data);
			var data = response.data.data;
			account_inf.points = data.points;
			account_inf.balance = data.balance;
			account_inf.lists = data;
//			account_inf.lists_length = data.length;
			var i = 0;
			for (x in data)
			{
			i++;
			}
			account_inf.lists_length = i-2;
			console.log(account_inf.lists_length)
		}).catch(function(response){
			console.log(response);
		});
	}
})
