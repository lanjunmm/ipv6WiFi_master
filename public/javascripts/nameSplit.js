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
function amplify(p) {
    for (let i=0;i<p.length;i++){
        p[i][2]=p[i][2]*20;
    }//为了使图表更加清晰，在这里对数据进行放大
    return p;
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
            jsonData.forEach(items=>{
                items.data=amplify(items.data);
            })
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

var sch=selectSch();


function setList() {
    let t=0;
    console.log("setList被调用");
    let liIds=["school","others"];
    let names=["校园网","其他"];
    for(let i=0;i<2;i++){
        let liId="li"+liIds[i];
        $("#accordion").append("<li id="+liId+"></li>");
        liId="#"+liId;
        let ulId=liIds[i];
        $(liId).append(" <div class=\"link\"><i class=\"fa fa-wifi\"></i>"+names[i]+"<i class=\"fa fa-chevron-down\"></i></div> <ul class=\"submenu\" id="+ulId+"></ul>");
    }
    jsonData.forEach(item=>{
        let temp=item.data;
        // temp=amplify(temp);
        points.push(temp);
        let flag=0;
        let s2=$.trim(item.name)+"";
        let SSIDli=$.trim(item.name)+"";
        SSIDli=SSIDli.replace(/=/g,'_');
        SSIDli=SSIDli.replace(/'/g,'__');
        SSIDli=SSIDli.replace(/ /g,'___');
        SSIDli=SSIDli.replace(/&/g,'____');
        SSIDli=SSIDli.replace(/@/g,'_____');
        SSIDli=SSIDli.replace(/\(/g,'1');
        SSIDli=SSIDli.replace(/\)/g,'11');
        SSIDli=SSIDli.replace(/\./g,'p');
        for(let i=0;i<sch.length;i++){
            let s1='';
            s1=$.trim(sch[i])+"";
            if (s1===s2){
                $("#school").append("<li><a  id="+SSIDli+">"+s1+"</a></li>");
                let s="#"+SSIDli;
                $(s).click(function () {
                   var newOp=myChart.getOption();
                   newOp.series[0].data=temp;
                   myChart.setOption(newOp);
                });
                flag=1;
            }
        }
        if(flag===0){

            if(SSIDli===''){
                SSIDli="null";
            }
            $('#others').append("<li><a  id="+SSIDli+">"+item.name+"</a></li>");
            let s="#"+SSIDli;
            $(s).click(function () {
                // console.log(temp);
                var newOp=myChart.getOption();
                newOp.series[0].data=temp;
                myChart.setOption(newOp);
            });
        }
        t++;
    });
    toogles();
}

init();
setList();
// addClick();