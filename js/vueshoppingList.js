//注册自定义过滤器
Vue.filter('convTime', function(value) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
		var unixTimestamp = new Date(value * 1000);
			commonTime = unixTimestamp.toLocaleString('chinese',{hour12:false});   //转换为24小时制的时间格式
			return commonTime;
	})
//待赠送
var thridpage = new Vue({
	el:"#thridpage",
	data:{
		item:[],
		items:"",
		arrId:[],
		
	},
	created:function(){
		axios.get(
		'http://ddpointmall.wiwipu.com/index.php/api/shoplist/getshoplistInfo',
		{params:{
			access_token:token,
			status:'待返积分',
			page:'1',
		}},{
			headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
			},
		}).then(function(response){
			console.log(response)
			var data  = response.data.data;
			thridpage.item = data;
			thridpage.items = data.length;

		}).catch(function(response){
			console.log(response)
		})
	
	},
	 computed:{
                // 是否全选
                isAllSelected(){
                	if(this.item == null)return;
                    return this.item.every((el) => {
                        return el.checked;
                    })
                },
                // 选中商品的id
                checkedGoodIds(){
                    let filterArr = this.item.filter((el) => {
                        return el.checked;
                    });
                    return filterArr.map((el) => {
                        return el.id;
                    })
                }
            },
            methods: {
                // 全选、全不选
                allSelect(item) {
                    let checked = true;
                    // 全选
                    if(this.isAllSelected){
                        checked = false;
                        
                    }
                    
                    this.item = this.item.map(el => {
                        el.checked = checked;
                        return el;
                    })
                    //清空数组
                    if(checked ){
                  		thridpage.arrId =[];
	                    for(var i = 0; i<item.length ; i++){
	                    	thridpage.arrId.push(item[i].id)
	                  	}
                    }else{
                    	thridpage.arrId =[];
                    }
                  	  console.log(thridpage.arrId)

                },
                // 单选
                singleSelect(goods, index) {
                    goods.checked = !goods.checked;
                    this.item.splice(index, 1, goods);
                    if(goods.checked){
                   	 thridpage.arrId.push(goods.id);

                    }
                    else {
                   	 var i = thridpage.arrId.indexOf(goods.id);
                  	  this.arrId.splice(i, 1);
                    }
                    console.log(thridpage.arrId)
                    
                },
                isDelete:function(arrId){
                	axios.get(
						'http://ddpointmall.wiwipu.com/index.php/api/shoplist/delshoplistinfo',
						{params:{
							access_token:token,
							id:thridpage.arrId,
						}},{
							headers:{
										'Content-Type': 'application/x-www-form-urlencoded',
							},
						}).then(function(response){
							console.log(response)
							location.reload();
							
	

						}).catch(function(response){
							console.log(response)
						})
                	
                }
            },
	
	
}).$mount('#thridpage');

//已赠送
var secondPage = new Vue({
	el:"#secondPage",
	data:{
		item:[],
		items:"",
		arrId:[],
		
	},
	created:function(){
		axios.get(
		'http://ddpointmall.wiwipu.com/index.php/api/shoplist/getshoplistInfo',
		{params:{
			access_token:token,
			status:'已返积分',
			page:'1',
		}},{
			headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
			},
		}).then(function(response){
			console.log(response)
			var data  = response.data.data;
			secondPage.item = data;
			secondPage.items = data.length;
			
		}).catch(function(response){
			console.log(response)
		})
	
	},
	 computed:{
                // 是否全选
                isAllSelected(){
                	if(this.item == null)return;
                    return this.item.every((el) => {
                        return el.checked;
                    })
                },
                // 选中商品的id
                checkedGoodIds(){
                    let filterArr = this.item.filter((el) => {
                        return el.checked;
                    });
                    return filterArr.map((el) => {
                        return el.id;
                    })
                }
            },
            methods: {
                // 全选、全不选
                allSelect(item) {
                    let checked = true;
                    
                    // 全选
                    if(this.isAllSelected){
                        checked = false;
                        
                    }
                    
                    this.item = this.item.map(el => {
                        el.checked = checked;
                        return el;
                    })
                    //清空数组
                    if(checked ){
                  		secondPage.arrId =[];
	                    for(var i = 0; i<item.length ; i++){
	                    	secondPage.arrId.push(item[i].id)
	                  	}
                    }else{
                    	secondPage.arrId =[];
                    }
                  	  console.log(secondPage.arrId)

                },
                // 单选
                singleSelect(goods, index) {
                    goods.checked = !goods.checked;
                    this.item.splice(index, 1, goods);
                    if(goods.checked){
                   	 secondPage.arrId.push(goods.id);

                    }
                    else {
                   	 var i = secondPage.arrId.indexOf(goods.id);
                  	  this.arrId.splice(i, 1);
                    }
                    console.log(secondPage.arrId)
                    
                },
                isDelete:function(arrId){
                	axios.get(
						'http://ddpointmall.wiwipu.com/index.php/api/shoplist/delshoplistinfo',
						{params:{
							access_token:token,
							id:secondPage.arrId,
						}},{
							headers:{
										'Content-Type': 'application/x-www-form-urlencoded',
							},
						}).then(function(response){
							console.log(response)
							location.reload();
							
				
						}).catch(function(response){
							console.log(response)
						})
                	
                }
            },
	
	
}).$mount('#secondPage');

//所有
var fristPage = new Vue({
	el:"#fristPage",
	data:{
		data:"",
		item:[],
		items:"",
		arrId:[],
	},
	created:function(){
		axios.get(
		'http://ddpointmall.wiwipu.com/index.php/api/shoplist/getshoplistInfo',
		{params:{
			access_token:token,
			page:'1',
		}},{
			headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
			},
		}).then(function(response){
			console.log(response)
			data  = response.data.data;
			fristPage.item = data;
			fristPage.items = data.length;
		}).catch(function(response){
			console.log(response)
		})
	
	},
	 computed:{
                // 是否全选
                isAllSelected(){
                	if(this.item == null)return;
                    return this.item.every((el) => {
                        return el.checked;
                    })
                },
                // 选中商品的id
                checkedGoodIds(){
                    let filterArr = this.item.filter((el) => {
                        return el.checked;
                    });
                    return filterArr.map((el) => {
                        return el.id;
                    })
                }
            },
            methods: {
                // 全选、全不选
                allSelect(item) {
                    let checked = true;
                    
                    // 全选
                    if(this.isAllSelected){
                        checked = false;
                        
                    }
                    
                    this.item = this.item.map(el => {
                        el.checked = checked;
                        return el;
                    })
                    //清空数组
                    if(checked ){
                  		fristPage.arrId =[];
	                    for(var i = 0; i<item.length ; i++){
	                    	fristPage.arrId.push(item[i].id)
	                  	}
                    }else{
                    	fristPage.arrId =[];
                    }
                  	  console.log(fristPage.arrId)

                },
                // 单选
                singleSelect(goods, index ) {
                    goods.checked = !goods.checked;
                    this.item.splice(index, 1, goods);
                    if(goods.checked){
                   	 fristPage.arrId.push(goods.id);
                   	 
                    }
                    else {
                    var i = fristPage.arrId.indexOf(goods.id);
                  	 this.arrId.splice(i, 1);
                    }
                    console.log(fristPage.arrId)

                },
               
                isDelete:function(arrId){
                	/*if(fristPage.arrId.length == 0) return;
                	for(var i = 0; i< fristPage.arrId.length;i++){
                		var del = document.getElementsByName(fristPage.arrId[i]);
                		del[i].style.display= "none";
                		
                	}

                	*/

                		
                	axios.get(
						'http://ddpointmall.wiwipu.com/index.php/api/shoplist/delshoplistinfo',
						{params:{
							access_token:token,
							id:fristPage.arrId,
						}},{
							headers:{
								'Content-Type': 'application/x-www-form-urlencoded',
							},
						}).then(function(response){
							console.log(response)
							location.reload();
						
						}).catch(function(response){
							console.log(response)
						})
                	
               },
              
            },
            
}).$mount('#fristPage');

//添加购物订单
var addshoplist = new Vue({
	el:"#addshoplist",
	data:{
		item:[],
		items:"",
		shoplist:"",
	},
	methods:{
		sure_click:function(){
			axios.get(
				'http://ddpointmall.wiwipu.com/index.php/api/shoplist/addshoplist',
				{params:{
					access_token:token,
					shoplist_sn:this.shoplist,
				}},{
					headers:{
								'Content-Type': 'application/x-www-form-urlencoded',
					},
				}).then(function(response){
					console.log(response)
					var data  = response.data.data;
					var error_code = response.data.error_code;
					var error_msg = response.data.error_msg;
					if(error_code ==0){
						mui.toast(error_msg);
						location.reload();
						return;
					}
					if(error_code ==1){
						mui.toast(error_msg);
						return;
					}
					if(error_code ==2){
						mui.toast(error_msg);
						return;
					}
				}).catch(function(response){
					console.log(response)
			})
		}
	}
	
});
