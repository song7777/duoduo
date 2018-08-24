var about_us = new Vue({
	el:"#about_us",
	data:{
		content:"",
	},
	methods:{
		submit:function(){
		var self = this;
			axios.get(
			"http://ddpointmall.wiwipu.com/index.php/api/users/feedback", {
				params: {
				    access_token:token,
					content:self.content
				}
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
			console.log(response)
				mui.toast("提交成功")
				console.log(1213)
		    }).catch(function(response) {
			    console.log(response);
		    });
		}
	}
})