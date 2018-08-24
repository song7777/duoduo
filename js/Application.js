			//拿到select选择的值
		var selecttext = "餐饮食品";
		 function industry(){
			var  myselect=document.getElementsByClassName("linkaget_content");
			var x=myselect[0].selectedIndex; 
			 selecttext =  myselect[0].options[x].text;
			console.log(selecttext)
			}
	
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
                ndiv.className="picture_card";  
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


var application = new Vue({
	el:"#application",
	data:{
		realname:"",
		telephone:"",
		storename:"",
		variable :true,
	},
	created:function(){	 
	},
	methods:{
		Submission:function(){
			console.log(this.telephone)
			var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				console.log(this.telephone)
				  if (!myreg.test(this.telephone)) {
	              	var tc = document.getElementsByClassName("tc");
					console.log(tc[0])
					tc[0].innerHTML = "<div class='backgd'><div class='tcym'><p class='result'>电话号码格式错误</p><button class='Sure'>确定</button></div></div>";
					var Sure = document.getElementsByClassName("Sure");
					Sure[0].onclick = function(){
						var backgd = document.getElementsByClassName("backgd");
						backgd[0].parentNode.removeChild(backgd[0]);
					}
					return;
            	}
			 var sel = document.getElementsByClassName("select");
		 var detail_add = sel[0].innerText;
			console.log(detail_add)
			console.log(selecttext)
			console.log(this.realname)
			 formdata = new FormData();
			for(i in files_arr){
				formdata.append('file'+i.toString(),files_arr[i]);
					console.log('file'+i.toString(),files_arr[i])
			}
			formdata.append('access_token',token);
			formdata.append('name',this.realname);
			formdata.append('phone',this.telephone,);
			formdata.append('seller_name',this.storename);
			formdata.append('industry',selecttext);
			formdata.append('detail_add',detail_add);
			axios.post(
				'http://ddpointmall.wiwipu.com/index.php/api/seller/sellerApply',
				formdata,
				{
						headers:{
							'Content-Type':'multipart/form-data'
						}
					}).then(function(response) {
				console.log(response);
				if(response.data.error_code != 0){
					var tc = document.getElementsByClassName("tc");
					console.log(tc[0])
					tc[0].innerHTML = "<div class='backgd'><div class='tcym'><p class='result'>"+response.data.error_msg+"</p><button class='Sure'>确定</button></div></div>";
					var Sure = document.getElementsByClassName("Sure");
					Sure[0].onclick = function(){
						var backgd = document.getElementsByClassName("backgd");
						backgd[0].parentNode.removeChild(backgd[0]);
					}
				}else{
					var tc = document.getElementsByClassName("tc");
					console.log(tc[0])
					tc[0].innerHTML = "<div class='backgd'><div class='tcym'><p class='result'>修改成功</p><button class='Sure'>确定</button></div></div>";
					var Sure = document.getElementsByClassName("Sure");
					Sure[0].onclick = function(){
//						var backgd = document.getElementsByClassName("backgd");
//						backgd[0].parentNode.removeChild(backgd[0]);
						window.location.href='personal_center.html';
					}
				}
			}).catch(function(response){
				console.log(response);
			});
		},
		selectimga:function(){
			var sElect = document.getElementsByClassName("select1");
					if(application.variable){
		                    sElect[0].src = "images/select-b.png"
		                   application.variable = false;
		                    console.log(123)
	                   }else{
	                   	 sElect[0].src = "images/select-a.png"
		                   application.variable = true;
		                    console.log(3)
	                   }
		},
		
//          当身份证图片超过两张时添加按钮隐藏
		bbb:function(){
			var picture_card = document.getElementsByClassName("picture_card");
			var aaa = document.getElementsByClassName("aaa");
				console.log(picture_card.length)
				if(picture_card.length == 2){
					aaa[0].style.display="none";
				}
		}
	}
})


		 