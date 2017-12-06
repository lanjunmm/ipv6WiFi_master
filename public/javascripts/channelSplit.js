var channelData;


function toogles() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var links = this.el.find('.link');
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    };

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
        $this = $(this);
        $next = $this.next();
        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        }
    };

    var accordion = new Accordion($('#accordion'), false);
    $('.submenu li').click(function () {
        $(this).addClass('current').siblings('li').removeClass('current');
    });
}

function getChannelData() {  //取得数据对数据初始化
$.ajax({
    url:'./channel',
    type:'GET',
    async: false,
    dataType: 'json',
    success(data) {
        console.log('fetchChannelSuccess');
        // chjsonData=data;
        channelData=data;
        // console.log(channelData);//注释
    }
});
}//获取数据
getChannelData();

// function samePosFilter(dataList) {
//     var map = {};
//     var results = [];
//     dataList.forEach(list => {
//         let add=list[0]+list[1];//经度加纬度
//         if (map[add]) {
//             map[add] = Math.floor((map[add]+Number(list[2]))/2)
//         } else {
//             map[add] = Number(list[2]);
//             results.push([list[0],list[1], Number(list[2])]);
//         }
//     });
//     results.forEach(item => {
//         item[2] = map[item[0]+item[1]];
//         item[2]=(+item[2]+100)/5;
//         item[0] = Number(item[0])+0.011082;
//         item[1] = Number(item[1])+0.003624;//定位位置目测是因为有偏差，加上一个常数之后把它挪回来？？
//     });
//     return results;
// }//过滤相同点???
//
// function newObj(item) {
//     let nObj={};
//     nObj.name='';
//     nObj.coor=[];
//     nObj.name=item.SSID;
//     nObj.coor.push([item.longitude,item.latitude, Number(item.level)]);
//     return nObj;
// }//
//
// function channelClassify() {
//     let h={},hName={};
//     let dataSet=[];
//     let num=0;
//     chjsonData.forEach(item=>{//遍历每条数据
//         let obj={};
//         obj.data=[];
//         obj.frequency=0;
//         if(!h[item.frequency]){//按信道划分,如果该信道不存在则直接把它push
//             console.log("信道第一次出现");
//             h[item.frequency]=true;
//             obj.frequency=item.frequency;
//             hName[item.SSID]=true;
//             let nObj=newObj(item);
//             obj.data.push(nObj);
//             dataSet.push(obj);
//         } else{
//             dataSet.forEach(da=>{
//                 if(da.frequency===item.frequency){//找到信道
//                     if(!hName[item.SSID]){//如果该名字从未出现则直接push
//                         hName[item.SSID]=true;
//                         let nObj=newObj(item);
//                         da.data.push(nObj);
//                     }
//                     else {
//                         var flag=0;
//                         for(let t=0;t<da.data.length;t++){//如果出现过且在该频道内存在
//                             if(da.data[t].name===item.SSID){
//                                 da.data[t].coor.push([item.longitude,item.latitude, Number(item.level)]);
//                                 flag=1;
//                             }
//                         }
//                         if (flag===0){
//                             let nObj=newObj(item);
//                             da.data.push(nObj);
//                         }
//                     }
//                 }
//             })
//         }
//
//     }); //所有种类的wifi名
//     dataSet.forEach(item=>{
//         item.data.forEach(i=>{
//             i.coor=samePosFilter(i.coor);
//         })
//     });
//     finalData=dataSet;
//     console.log(finalData);
// }//按照信道分数据
// channelClassify();

function addClicks(id,points) {
    let ID="#"+id;
    $(ID).click(function () {
        let newOp= myChart.getOption();
        newOp.series[0].data=points;
        myChart.setOption(newOp);
    });
}

function view() {
    let count=3000;//标记频率下的wifi名
    channelData.forEach(item=>{
        let liId="li"+item.frequency;
        $("#accordion").append("<li id="+liId+"></li>");
        liId="#"+liId;
        let divId="div"+item.frequency;
        $(liId).append(" <div class=\"link\" id="+divId+"><i class=\"fa \"></i>"+item.frequency+"<i class=\"fa fa-chevron-down\"></i></div> <ul class=\"submenu\" id="+item.frequency+"></ul>");
        let freId="#"+item.frequency;
        let allCoordinate=[];
        item.data.forEach(i=>{
            let aId=count;
            $(freId).append("<li><a id="+aId+">"+i.name+"</a></li>");
            addClicks(aId,i.coor);
            i.coor.forEach(everyPo=>{
                allCoordinate.push(everyPo);
            });
            count++;
        });
        addClicks(divId,allCoordinate);
    });
    toogles();
}
// view();

// toogles();