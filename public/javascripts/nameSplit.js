var points=[];
var jsonData=null;

function toogles() {//list展开收起
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link');
        // Evento
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

function init() {  //取得数据对数据初始化
    $.ajax({
        url:'./name',
        type:'GET',
        async: false,
        dataType: 'json',
        success(data) {
            console.log('fetchDataSuccess');
//                       const datas = String(data);
//                       obj = eval('(' + datas + ')');
            jsonData=data;
        }
    });
}

function addClick() {
    for(let t=0;t<points.length;t++){//给按钮添加点击事件
//        list[t].onclick=change(points[t]);
        let s="#"+t;
        $(s).click(function () {
            var newOp= myChart.getOption();
            newOp.series[0].data=points[t];
            myChart.setOption(newOp);
        });
    }
}

function selectSch() {
    var localstroage = window.localStorage;
    let len = localstroage.length;
    let arr=[];
    for (let i=0;i<len;i++){//遍历所有的ssid
        let t=localstroage.key(i);
        if(t.length<15){
            arr.push(t);
        }
    }
//            arr.forEach(name=>{
//                $("#school").append("<li><a  id="+name+"></a></li>");
//                let s="#"+name;
//                $(s).append(name);
//            });
    return arr;
}
function amplify(p) {
    for (let i=0;i<p.length;i++){
        p[i][2]=p[i][2]*20;
    }//为了使图表更加清晰，在这里对数据进行放大
    return p;
}
let sch=selectSch();

function setList() {
    let t=0;
    console.log("setList被调用");
    let id=0;
    for(let i=0;i<3;i++){
        let liId="li"+id;
        $("#accordion").append("<li id="+liId+"></li>");
        liId="#"+liId;
        let divId="div"+id;
        $(liId).append(" <div class=\"link\" id="+divId+"><i class=\"fa fa-signal\"></i>>"+id+"<i class=\"fa fa-chevron-down\"></i></div> <ul class=\"submenu\" id="+id+"></ul>");
        id=id+20;
    }
    jsonData.forEach(item=>{
        let temp=item.data;
        points.push(item.data);
        if(temp.length>=40){
            let id="#"+40;
            $(id).append("<li><a  id="+t+"></a></li>");
            let s="#"+t;
            $(s).append(item.name);
        }
        else if(temp.length>=20){
            let id="#"+20;
            $(id).append("<li><a  id="+t+"></a></li>");
            let s="#"+t;
            $(s).append(item.name);
        }
        else {
            let id="#"+0;
            $(id).append("<li><a  id="+t+"></a></li>");
            let s="#"+t;
            $(s).append(item.name);
        }
        t++;
    });
//     for(let t=0;t<jsonData.length;t++){
//         points[t]=jsonData[t].data;
//         points[t]=amplify(points[t]);
//         let flag=0;
//         let s2 = $.trim(jsonData[t].name) + "";
//         for(let i=0;i<sch.length;i++){
//             let s1='';
//             s1 = $.trim(sch[i]) + "";
//             if(s1===s2){
//                 $("#school").append("<li><a  id="+s1+"></a></li>");
//                 let s="#"+s1;
//                 $(s).append(s1);
//                 $(s).click(function () {
//                     var newOp= myChart.getOption();
//                     newOp.series[0].data=points[t];
//                     myChart.setOption(newOp);
//                 });
//                 flag=1;
//             }
//         }
//         if(flag===0){
//             s2=s2.replace(/=/g,'_');
//             s2=s2.replace(/'/g,'_');
//             s2=s2.replace(/ /g,'_');
//             $('#others').append("<li><a  id="+s2+">"+jsonData[t].name+"</a></li>");
//             let s="#"+s2;
//             $(s).click(function () {
//                 var newOp=myChart.getOption();
//                 newOp.series[0].data=points[t];
//                 myChart.setOption(newOp);
//             });
// ////            $("#uList").append("<li id="+t+">");
// ////            let lid="li"+t;
// ////            $("#accordion").append("<li id="+lid+"></li>");
// ////            let  slid="#"+lid;
// ////            $(slid).append("<div class="+"link"+"><i class="+"fa fa-signal"+"></i>统计管<i class="+"fa fa-chevron-down"+"></i></div>");
// ////            let u="u"+t;
// ////            $(slid).append("<ul class='submenu' id="+u+"></ul>");
// ////            let su="#"+u;
// ////            $(su).append("<li><a  id="+t+"></a></li>");
// ////            let s="#"+t;
// ////            $(s).append(jsonData[t].name);//别删
// //                if(points[t].length>=30){
// //                    $("#thirty").append("<li><a  id="+t+"></a></li>");
// //                    let s="#"+t;
// //                    $(s).append(jsonData[t].name);
// //                }
// //                else if(points[t].length>=10){
// //                    $("#ten").append("<li><a  id="+t+"></a></li>");
// //                    let s="#"+t;
// //                    $(s).append(jsonData[t].name);
// //                }else {
// //                    $("#one").append("<li><a  id="+t+"></a></li>");
// //                    let s="#"+t;
// //                    $(s).append(jsonData[t].name);
// //                }
//         }
//
//
//     }


//     for(let t=0;t<jsonData.length;t++){
//         points[t]=jsonData[t].data;
// //            $("#uList").append("<li id="+t+">");
// //            let lid="li"+t;
// //            $("#accordion").append("<li id="+lid+"></li>");
// //            let  slid="#"+lid;
// //            $(slid).append("<div class="+"link"+"><i class="+"fa fa-signal"+"></i>统计管<i class="+"fa fa-chevron-down"+"></i></div>");
// //            let u="u"+t;
// //            $(slid).append("<ul class='submenu' id="+u+"></ul>");
// //            let su="#"+u;
// //            $(su).append("<li><a  id="+t+"></a></li>");
// //            let s="#"+t;
// //            $(s).append(jsonData[t].name);//别删
//         if(points[t].length>=50){
//             $("#fifty").append("<li><a  id="+t+"></a></li>");
//             let s="#"+t;
//             $(s).append(jsonData[t].name);
//         }
//         else if(points[t].length>=30){
//             $("#thirty").append("<li><a  id="+t+"></a></li>");
//             let s="#"+t;
//             $(s).append(jsonData[t].name);
//         }
//         else if(points[t].length>=10){
//             $("#ten").append("<li><a  id="+t+"></a></li>");
//             let s="#"+t;
//             $(s).append(jsonData[t].name);
//         }else {
//             $("#one").append("<li><a  id="+t+"></a></li>");
//             let s="#"+t;
//             $(s).append(jsonData[t].name);
//         }
//
//     }
    for(let j=0;j<points.length;j++){
        for (let i=0;i<points[j].length;i++){
            points[j][i][2]=points[j][i][2]*20;
        }//为了使图表更加清晰，在这里对数据进行放大
    }
    addClick();
    toogles();
}

init();
setList();
addClick();