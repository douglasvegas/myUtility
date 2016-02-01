//环形图动画
    var buffer = [], canvasBuffer = [];
    function startDraw(t, index) {
        var target = t * 3.6;
        canvasBuffer[index].clearRect(0, 0, 70, 70);
        canvasBuffer[index].beginPath();
        canvasBuffer[index].lineWidth = 5;
        canvasBuffer[index].strokeStyle = "#3fb5ff";
        var circle = {
            x: 35,
            y: 35,
            r: 32
        };

        if ((Math.PI * 2) - (Math.PI / 180) * target - 0.5 * Math.PI < -1.570) {
            canvasBuffer[index].arc(circle.x, circle.y, circle.r, -0.5 * Math.PI, -1.570, true);
        } else {
            canvasBuffer[index].arc(circle.x, circle.y, circle.r, -0.5 * Math.PI, (Math.PI * 2) - (Math.PI / 180) * target - 0.5 * Math.PI, true);
        }
        //
        canvasBuffer[index].stroke();
    }

    function draw(canvas,index) {
        var target = parseInt(canvas.parent().parent().find('span').text()), start = 0;
        var  _num = target % 7;
        if(target>=7){
            target -= _num;
        }
        canvasBuffer[index] = canvas[0].getContext("2d");
        if(target==0){
            return;
        }
        window.clearInterval(buffer[index]);
        buffer[index] = setInterval(function () {
            start += 7;

            if (start <= target) {
                startDraw(start, index);
            }
            else {
                if(target>=7){
                    target += _num;
                }
                startDraw(target, index);
                clearInterval(buffer[index]);
            }
        }, 45);
    }

     function remainingTime(timeDel,btn){
        if(timeDel>0){
            var timeString="";
            var days=parseInt(timeDel/60/60/24);
            var hours=parseInt((timeDel/60/60)-days*24);
            var minute=parseInt((timeDel/60)-days*24*60-hours*60);
            var senconds=parseInt(timeDel-days*24*60*60-hours*60*60-minute*60);
            if(days>0){
                timeString=timeString+days+"天";
            }else
            {
             	timeString="00天";
            }
            if(hours>9){
                timeString=timeString+hours+"时";
            }else{
                timeString=timeString+"0"+hours+"时";
            }
            if(minute>9){
                timeString=timeString+minute+"分";
            }else{
                timeString=timeString+minute+"分";
            }
            if(senconds>9){
                timeString=timeString+senconds+"秒";
            }else{
                timeString=timeString+senconds+"秒";
            }
            btn.text(timeString+" 开售");

        }
        else{
            if(!btn.hasClass("btn-grab")){
                btn.removeClass("btn-wait");
                btn.addClass("btn-grab");
                btn.text("立即抢购");
            }
        }
    }
   
     function reflash() {
   	  //如果重新排序是ajax请求重新改变dom记得再次使用次循环
   			$(".btn-wait").each(function(index){
   				var endTime=Date.parse($(this).data("time"));
   				var now=Date.parse(new Date());
   				var timeDel=(endTime-now)/1000;
   				var btn=$(this);
   				remainingTime(timeDel,btn);
   				timeDel--;
   			   setInterval(function(){
   				   remainingTime(timeDel--,btn);
   			   },1000);
   			});
   			
   			
   			//每次加载或者选择的时候请再次执行这个动画
   			$(".canvasCircle.unslide").each(function (index, el) {
   				$(this).removeClass("unslide");
   				draw($(this),index);
   			});					
   	  }
      queryForProductList(start,limit);
