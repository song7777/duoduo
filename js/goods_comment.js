//注册自定义过滤器
	Vue.filter('convTime', function(value) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面  
		var unixTimestamp = new Date(value * 1000);
			commonTime = unixTimestamp.toLocaleString('chinese',{hour12:false});   //转换为24小时制的时间格式
			return commonTime;
	})
var goodsComment = new Vue({
	el:"#goodsComment",
	data:{
		nickname:"",
		create_time:0,
		content:"",
		reply:"",
		face:"",
		comm_pic:"",
		comments:[],
		business:[],
		imgs:[],
		num:4,
	},
	created:function(){
		var self = this;
		axios.get("http://ddpointmall.wiwipu.com/index.php/api/goods/getComment",
		{params:{
		    goods_id:goods_id,
		    num:self.num
		}},{
			headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
		}).then(function(response){
			console.log(response);
			var noComment = document.getElementsByClassName("noComment")[0];
			if(response.data.error_code == 1){
				noComment.style.display = "flex";
				noComment.innerText=response.data.error_msg;
				console.log(response.data.error_code)
			}
			var data = response.data.data.goods_comment;
			self.comments = data;
			self.$nextTick(function(){
				var business = document.getElementsByClassName("shangjia-huifu");
				var comImg = document.getElementsByClassName("com-img")
				for(var i = 0;i < data.length; i++){
				if(data[i].reply == ""){
					business[i].style.display = "none";
				}
				if(data[i].comm_pic == ""){
					comImg[i].style.display = "none";
				}
			}
				          //获取滚动条当前的位置 
			})
			
		}).catch(function(response){
			console.log(response);
		});
	}
});
var num = 4;
          function getScrollTop() {
              var scrollTop = 0;
              if(document.documentElement && document.documentElement.scrollTop) {
                  scrollTop = document.documentElement.scrollTop;
              } else if(document.body) {
                  scrollTop = document.body.scrollTop;
              }
             return scrollTop;
         }
 
         //获取当前可视范围的高度 
         function getClientHeight() {
             var clientHeight = 0;
             if(document.body.clientHeight && document.documentElement.clientHeight) {
                 clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
             } else {
                 clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
             }
             return clientHeight;
         }
 
         //获取文档完整的高度 
         function getScrollHeight() {
             return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
         }
         
         //滚动事件触发
        window.onscroll = function() {
             if(getScrollTop() + getClientHeight() == getScrollHeight()) {
             	num = num + 4;
             	 goodsComment.num = num
//           	 console.log(num)
				jiazai();
                           }
             
            
         }
	function jiazai(){
		var self = goodsComment;
		axios.get("http://ddpointmall.wiwipu.com/index.php/api/goods/getComment",
		{params:{
		    goods_id:goods_id,
		    num:self.num
		}},{
			headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
		}).then(function(response){
			console.log(response);
			var noComment = document.getElementsByClassName("noComment")[0];
			if(response.data.error_code == 1){
				noComment.style.display = "flex";
				noComment.innerText=response.data.error_msg;
				console.log(response.data.error_code)
			}
			var data = response.data.data.goods_comment;
			self.comments = data;
			self.$nextTick(function(){
				var business = document.getElementsByClassName("shangjia-huifu");
				var comImg = document.getElementsByClassName("com-img")
				for(var i = 0;i < data.length; i++){
				if(data[i].reply == ""){
					business[i].style.display = "none";
				}
				if(data[i].comm_pic == ""){
					comImg[i].style.display = "none";
				}
			}
				          //获取滚动条当前的位置 
			})
			
		}).catch(function(response){
			console.log(response);
		});
	}
        