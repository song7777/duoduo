	//地址
	var address = new Vue({
		el: "#address",
		data: {
			items: '',
		},
		created: function() {
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/users/getaddresslist', {
					params: {
						access_token: token,
					}
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
	
					},
				}).then(function(response) {
				console.log(response)
				var data = response.data.data;
				address.items = data[0];
				
			}).catch(function(response) {
				console.log(response)
			});
	
		}
	
	})
	//订单商品
	var goods = new Vue({
		el: "#goods",
		data: {
			list: [],
			lists: '',
			count: [],
			counts:'',
	
		},
		created: function(index) {
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/order/orderlist', {
					params: {
						access_token: token,
						order_id:order_id,
	
					}
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
	
					},
				}).then(function(response) {
				console.log(response)
				var data = response.data.data;
				goods.list = data;
				goods.lists =  Object.keys(data).length-2;
				console.log(data)
				
				
			}).catch(function(response) {
				console.log(response)
			});
	
		},
	
	})
	
	//结算
	var payment = new Vue({
		el: "#payment",
		data: {
	
		},
		methods: {
			payment: function() {
				axios.get(
	
					'http://ddpointmall.wiwipu.com/index.php/api/order/immediatePayment', {
						params: {
							access_token: token,
							order_id: order_id,
						}
					}, {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
	
						},
					}).then(function(response) {
					console.log(response)
					var error_code = response.data.error_code;
					var error_msg = response.data.error_msg;
					if(error_code ===0){
						mui.toast("支付成功");
						setTimeout(function go()
						{
						window.history.go(-1);
						},2000);
						
					}
					else if(error_code !=0 ){
						mui.toast("支付失败");
					}
				}).catch(function(response) {
					console.log(response)
	
				})
			}
		}
	})