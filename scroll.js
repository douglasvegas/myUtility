//滑动到底部加载
	 $(window).scroll(function(){
		 if($(document).scrollTop()>=$(document).height()-$(window).height()){
            //从1开始计数
            var startSize = $(".list-pro").size();
            queryForProductList(startSize,limit);
 		}
        //顶部刷新加载
        if($(document).scrollTop()==0){
        	
       		$(".list-pro").remove();
        	queryForProductList(0,12);
        }
	 })
