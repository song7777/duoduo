///*昵称修改*/
//var name = new Vue({
//	el:"#name",
//	data:{
//		nickname:''
//	},
//		created:function(){
//		var that = this;
//		axios.post(
//			//'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist/access_token/1f9884d6266faf649a837ec38d8577c6/cate_id/3482/num/3/is_recommend/0/page/0',
//			'http://ddpointmall.wiwipu.com/index.php/api/users/changeuserinfo',
//
//			{params:{
//				access_token:token,
//			}}, {
//				headers: {
//					'Content-Type': 'application/x-www-form-urlencoded'
//					
//				}
//			}).then(function(user_data) {
////				console.log(user_data.data.nickname)
//				that.nickname = user_data.data.nickname;
//		}).catch(function(response){
//			console.log(response);
//		});
//	},
//})


/* 更换头像  */
//添加图片开始
    //选择图片，马上预览  
    var files_arr = [];
    function xmTanUploadImg(obj) {  
  
        var fl=obj.files.length;  
        for(var i=0;i<fl;i++){  
            var file=obj.files[i];  
            var reader = new FileReader();  
  
            //读取文件过程方法  
  
            reader.onloadstart = function (e) {  
                console.log("开始读取....");  
            }  
            reader.onprogress = function (e) {  
                console.log("正在读取中....");  
            }  
            reader.onabort = function (e) {  
                console.log("中断读取....");  
            }  
            reader.onerror = function (e) {  
                console.log("读取异常....");  
            }  
            reader.onload = function (e) {  
                console.log("成功读取....");  
  
                var imgstr='<img class="Slide_Show" src="'+e.target.result+'"/>'; 
                var Slide_Show = document.getElementsByClassName("Slide_Show");
//               console.log(Slide_Show[0].src)
                
                var oimgbox=document.getElementsByClassName("Evaluation_picture");  
                var ndiv=document.createElement("div");

                ndiv.innerHTML=imgstr;  
                ndiv.className="picture_img";  
                var ccc = document.getElementById("ccc");
                oimgbox[0].insertBefore(ndiv,ccc);
                 
            }  
            reader.readAsDataURL(file); 
            files_arr.push(file);
            console.log(files_arr);
//alert(1);  
        }  
  
    }  
    	//添加图片结束
 
/* 昵称 */
//var nickname = new Vue({
//	el:'#nickname',
//	data:{
//		nickname:""
//	},
//	created:function(){
//		var that = this;
//		axios.get(
//			//'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist/access_token/1f9884d6266faf649a837ec38d8577c6/cate_id/3482/num/3/is_recommend/0/page/0',
//			'http://ddpointmall.wiwipu.com/index.php/api/users/changeuserinfo',
//
//			{params:{
//				access_token:token,
//			}}, {
//				headers: {
//					'Content-Type': 'application/x-www-form-urlencoded'
//				}
//			}).then(function(user_data) {
////				console.log(res.data.data.nickname)
//				that.nickname = user_data.data.data.nickname;
//		}).catch(function(response){
//			console.log(response);
//		});
//	},
////		methods:{
////			nc:function(){
////				window.location.href = 'Personal_message.html';
////			}
////		}
//})
//
//
///* 保存按钮 */
var anniu = new Vue({
	el:"#anniu",
	data:{
		nickname:'',
		sex:''
	},
	methods:{
		annis:function(){
//			console.log(anniu.nickname)
			axios.post(
			//'http://ddpointmall.wiwipu.com/index.php/api/goods/getgoodslist/access_token/1f9884d6266faf649a837ec38d8577c6/cate_id/3482/num/3/is_recommend/0/page/0',
			'http://ddpointmall.wiwipu.com/index.php/api/users/changeuserinfo',

			{params:{
				access_token:token,
			}}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(user_data) {
			console.log(anniu.nickname)
		}).catch(function(response){
			console.log(response);
		});
		}
	},
	
})



var iMan = document.getElementsByClassName("man");
	for (var i = 0; i < iMan.length; i++) {
		iMan[i].index = i ;
		var j = 0;
		iMan[i].onclick = function(){
			iMan[j].src = "images/select-a.png";
			j = this.index;
			iMan[this.index].src = "images/select-b.png";
		}
	}