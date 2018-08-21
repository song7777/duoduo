//评价单选按钮
		var pj = 0;
		var Evaluation_options = document.getElementsByClassName("Evaluation_options");
			var j = 0;
			 function change(i){
			    Evaluation_options[i].onclick = function(e){
			    	console.log(e.target.parentNode.innerText)
			    	 pj = e.target.parentNode.innerText;
				    Evaluation_options[j].style.backgroundImage = "url(images/select-a.png)";
				    Evaluation_options[i].style.backgroundImage = "url(images/select-b.png)";
				    j =  i;
	//			    console.log(j)
			    }
			}
			for( var i = 0; i < Evaluation_options.length;i++ ){
			                change(i);
			}
		//评价单选按钮结束			
			
//			 var Add_pictures = '<img class="Add_pictures" src="images/addpic.png" />';
//			 var bbb = document.getElementById("bbb");
//			 		bbb.innerHTML = Add_pictures;
			
			
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
