var selected = {
	iselected: function() {
		var oIcon = document.getElementsByClassName("sg-select");
		var allIcon = document.getElementById("sg-selectAll");
		var select = true;
		allIcon.onclick = function(){
			if (allIcon.checked) {
				for (var i = 0; i < oIcon.length; i++) {
					oIcon[i].checked = true;
				}
			} else{
				for (var i = 0; i < oIcon.length; i++) {
					oIcon[i].checked = false;
				}
			}
				
			}
		
	}
}
function amount(){
	gift_car.sNumber = 0;
	gift_car.amount = 0;
	gift_car.a = [];
	gift_car.sNum = [];
			for(var i=0; i<gift_car.ids.length;i++){
				for(var x=0;x<gift_car.giftNum.length;x++){
					if (gift_car.ids[i] == gift_car.giftNum[x].id) {
						gift_car.a.push(gift_car.giftNum[x].price*gift_car.giftNum[x].buy_num);
						gift_car.sNum.push(gift_car.giftNum[x].buy_num);
					}
				}
			}
//			console.log(a)
			for (var i = 0; i < gift_car.a.length; i++) {
			    gift_car.amount += gift_car.a[i];
			}
			for (var i = 0; i < gift_car.sNum.length; i++) {
				gift_car.sNumber += gift_car.sNum[i];
			}
}
function delSelect(){
	for(var i=0; i<self.ids.length;i++){
					var ida = document.getElementById(self.ids[i]);
					ida.style.display="none";
			}
			var allSel = document.getElementsByClassName("sg-selectAll")[0];
			allSel.checked = false;
}
var gift_car = new Vue({
	el:"#gift_car",
	data:{
		giftNum:[],
		ids:[],
		sNum:[],
		a:[],
		amount:0,
		sNumber:0,
		buy_num:0,
		checked:true,
		num:6
	},
	created:function(){
		self = this;
		console.log(token)
		axios.get("http://ddpointmall.wiwipu.com/index.php/api/cart/getshowcart",{
			params: {
					access_token:token,
					num:self.num,
			        }
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
		}).then(function(response){
			console.log(response);
			var data = response.data.data;
			self.giftNum = data;
			var page = document.getElementsByClassName("gift")[0];
//				var page2 = document.getElementsByClassName("sg-content")[0];
				if (data == [] || token == null || response.data.error_code == "1") {
					page.style.display = "block";
				}else{
					page.style.display = "none";
				}
			gift_car.$nextTick(function(){
				selected.iselected();
			})
		}).catch(function(response) {
			console.log(response);
			
		});
	},
	methods:{
		singleSelect:function(e){
			var allSel = document.getElementsByClassName("sg-selectAll")[0];
			allSel.checked = false;
			var id = parseInt(event.target.dataset.id);
			if (event.target.checked == true) {
				this.ids.push(id)
			} else{
				var index = this.ids.indexOf(id)
				this.ids.splice(index,1)
			}
			amount();
		},
		allSelect:function(e){
			if(event.target.checked == true) {
				this.ids=[];
				for (var i = 0; i < this.giftNum.length; i++) {
					this.ids.push(this.giftNum[i].id)
				}
			} else{
				this.ids=[];
			}
			amount();
		},
		sDelete:function(){
			delSelect();
			axios.get("http://ddpointmall.wiwipu.com/index.php/api/cart/removecartgoods",{
			params: {
					access_token:token,
					id:self.ids
			        }
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
		}).then(function(response){
			console.log(response);
			gift_car.ids=[];
			gift_car.sNumber = 0;
			gift_car.amount = 0;
			gift_car.a = [];
			gift_car.sNum = [];
			console.log(gift_car.sNumber)
			console.log(gift_car.amount)
			window.location.reload();
		}).catch(function(response) {
			console.log(response);
		});
		},
		lessGift:function(e){
			var id = parseInt(event.target.dataset.id);
			for(i in this.giftNum){
				if (this.giftNum[i].id == id) {
					this.giftNum[i].buy_num--;
					if (this.giftNum[i].buy_num < 1) {
						this.giftNum[i].buy_num = 1;
					}
			amount();
				}
			}

		},
		addGift:function(e){
			var id = parseInt(event.target.dataset.id);
			for(i in this.giftNum){
				if (this.giftNum[i].id == id) {
					this.giftNum[i].buy_num++;
					if (this.giftNum[i].buy_num > this.giftNum[i].stock) {
						this.giftNum[i].buy_num = this.giftNum[i].stock;
					}
			amount();
				}
			}
		},
		buy:function(){
			var giftId = [],
				specId = [];
			for(var i=0; i<this.ids.length;i++){
				for(var x=0;x<this.giftNum.length;x++){
					if (this.ids[i] == this.giftNum[x].id) {
						giftId.push(this.giftNum[x].goods_id);
						specId.push(this.giftNum[x].spec_id)
					}
				}
			}
//			console.log(giftId)
//			console.log(specId)
//			console.log(self.amount)
//			console.log(this.sNum)
//			delSelect();
            var allSel = document.getElementsByClassName("sg-selectAll")[0];
            var oIcon = document.getElementsByClassName("sg-select");
				allSel.checked = false;
				if (allSel.checked) {
				for (var i = 0; i < oIcon.length; i++) {
					oIcon[i].checked = true;
				}
			} else{
				for (var i = 0; i < oIcon.length; i++) {
					oIcon[i].checked = false;
				}
			}
				axios.get("http://ddpointmall.wiwipu.com/index.php/api/order/orderconfirm",{
			params: {
					access_token:token,
					goods_ids:giftId,
					spec_ids:specId,
					price:self.amount,
					nums:self.sNum,
			        }
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
		}).then(function(response){
			console.log(response);	
			var order_id = response.data.order_id;
				console.log(order_id)
			localStorage.setItem('orderid',JSON.stringify(order_id));
			if(response.data.error_code == 1 || response.data.error_code == 2){
				
			}else{
				window.location.href = "orderConfirmation.html"
			}
		}).catch(function(response) {
			console.log(response);
		});
		}
	}
})
var num = 6;
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
             	num = num + 6;
             	 gift_car.num = num
//           	 console.log(num)
				jiazai();
                           }
             
            
         }
        function jiazai(){
        	var self = gift_car;
        	axios.get("http://ddpointmall.wiwipu.com/index.php/api/cart/getshowcart",{
			params: {
					access_token:token,
					num:self.num,
			        }
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
		}).then(function(response){
			console.log(response);
			var data = response.data.data;
			self.giftNum = data;
			if (data == [] || token == null || response.data.error_code == "1") {
					page.style.display = "block";
				}else{
					page.style.display = "none";
				}
				
			gift_car.$nextTick(function(){
				selected.iselected();
				var page = document.getElementsByClassName("gift")[0];
//				var page2 = document.getElementsByClassName("sg-content")[0];
			})
		}).catch(function(response) {
			console.log(response);
			
		});
        }
