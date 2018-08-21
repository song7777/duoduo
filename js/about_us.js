var about_us = new Vue({
	el:"#user_feedback",
	data:{
		content:"",
	},
	methods:{
		submit:function(){
			axios.get(
			"http://ddpointmall.wiwipu.com/index.php/api/users/feedback", {
				params: {
				    access_token:"1f9884d6266faf649a837ec38d8577c6",
					content:this.content
				}
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
			console.log(response)
				
		    }).catch(function(response) {
			    console.log(response);
		    });
		}
	}
})