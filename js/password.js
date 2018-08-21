var pw = new Vue({
	el:"#pw",
	data:{
		mobile:'',
		code:'',
		passwrod:'',
		passwrods:'',
		cont:"短信验证"
	},
	methods:{
		zhuce:function(){
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/users/restpassword',

			{params:{
				mobile:this.mobile,
				code:this.code,
				password:this.passwrod,
				
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
			console.log(response);
			if(response.data.error_code > 0){
			mui.toast(response.data.error_msg);
			}
			}).catch(function(response){
			console.log(response.data);
			});
		},
		verify:function(){
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/code/sendcode',

			{params:{
				mobile:this.mobile,
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
			console.log(response);
			
			}).catch(function(response){
			console.log(response.data);
			});
		},
		home_page:function(){
			window.location.href ='index.html';
		},
	},
})
