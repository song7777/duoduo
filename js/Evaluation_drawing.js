var goods_id = JSON.parse(localStorage.getItem('goods_id'));
var order_id = JSON.parse(localStorage.getItem('order_id'));
console.log(goods_id)
console.log(order_id)
var evaDra = new Vue({
	el:"#evaDra",
	data:{
		comment:"",
	},
	methods:{
		Sub:function(){
			console.log(this.comment)
//			console.log(files_arr)
			formdata = new FormData();
			for(i in files_arr){
				formdata.append('file'+i.toString(),files_arr[i]);
//				formdata.append('comm_pic',files_arr[i]);
			}
			formdata.append('access_token',token);
			formdata.append('goods_id',goods_id);
			console.log(pj)
			formdata.append('order_id',order_id)
			formdata.append('goods_grade',pj);
			formdata.append('content',this.comment);
			axios.post(
				'http://ddpointmall.wiwipu.com/index.php/api/goods/addComment',
//				'http://192.168.1.109/index.php/admin/index/uploade',

						formdata,
					{headers:{
						'Content-Type':'multipart/form-data'
					}}
				).then(function(response){
					console.log(response)
					console.log(response.data)
					console.log(response.data.error_msg)
					mui.toast(response.data.error_msg);
				}).catch(function(response){
					console.log(response)
				});
				setTimeout(function(){window.location.href='my_gift_Completed.html'},1000);
//			axios.post(
//			'http://ddpointmall.wiwipu.com/index.php/api/goods/addComment',
//			{params:{
//				access_token:"1f9884d6266faf649a837ec38d8577c6",
//				id:id,
//				goods_grade:pj,
//				content:123456,
//			}},{
//				headers:{
//					'Content-Type':'mulitpart/form-data'
//				}
//			}).then(function(response){
//				console.log(response)
//			}).catch(function(response){
//				console.log(response);
//			});
			
		}
	}
})

//{params:{
//					access_token:"1f9884d6266faf649a837ec38d8577c6",
//					id:id,
//					goods_grade:pj,
//					content:123456,
//				}}