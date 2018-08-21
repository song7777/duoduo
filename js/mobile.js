window.onload = function() {
	var
		oImg = document.getElementById('img2'),
		Picture = ['images/select-a.png', 'images/select-b.png'],
		Index = 0;
	oImg.onclick = function() {
		++Index
		Index < Picture.length || (Index = 0)
		oImg.src = Picture[Index]
	}
}

var pinless = new Vue({
	el:"#pinless",
	data:{
		Access_token:'',
		mobile:'',
		password:'',
		passwords:'',
		code:'',
		cont:"短信验证"
	},
	methods:{
		zhuce:function(){
			axios.get(
			'http://ddpointmall.wiwipu.com/index.php/api/users/bindPhone',

			{params:{
				access_token:"1f9884d6266faf649a837ec38d8577c6",
				mobile:this.mobile,
				code:this.code,
				password:this.password,
				
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