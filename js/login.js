var login = new Vue({
	el:"#login",
	data:{
		mobile:'',
		password:''
	},
	methods:{
		click_log:function(){
			axios.post(
			'http://ddpointmall.wiwipu.com/index.php/api/users/login',

			{params:{
				access_token: "1f9884d6266faf649a837ec38d8577c6",
				mobile:this.mobile,
				password:this.password
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
	},
})