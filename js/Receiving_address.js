var recAdd = new Vue({
	el:"#recAdd",
	data:{
		address:"",
		mobile:"",
		consignee:"",
	},
	created:function(){
		
	},
	methods:{
		preservation:function(){
			console.log(123564)
			var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(this.mobile)) {
                mui.toast("手机格式错误");
                return;
            }
            var region = document.getElementsByClassName("select")[0].innerText;
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/users/changeaddressinfo',
				{params:{
					access_token:token,
					area:region,
					detail_address:this.address,
					mobile:this.mobile,
					consignee:this.consignee,
				}},{
					headers:{
						'Content-Type':'application/x-www-from-urlenconded'
					}
				}).then(function(response){
					console.log(response)
					if(response.data.error_msg != ""){
						mui.toast(response.data.error_msg)
					}else{
						mui.toast("修改成功")
						
						setTimeout(function go()
						{
						window.history.go(-1);
						},2000);
					}
				}).catch(function(response){
					console.log(response)
				});
			}
		}
})