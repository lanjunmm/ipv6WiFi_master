function submitSSID(id) {
    var localstroage = window.localStorage;
    localstroage.setItem(id,id);
    // $('#others').append("<li><a  id="+s2+">"+jsonData[t].name+"</a></li>");
    let delId="#"+id;
    $(delId).remove();
    $("#school").append("<li><a  id="+id+">"+id+"</a></li>");
}

function deleteRow(btn)
{
    var i=btn.parentNode.parentNode.rowIndex;
    var localstroage = window.localStorage;
    document.getElementById("showSSID").deleteRow(i);
    let item=btn.className;
    localstroage.removeItem(item);
    let delId="#"+item;
    $(delId).remove();
    $("#others").append("<li><a  id="+item+">"+item+"</a></li>");
}
function show() { //为弹窗添加列表
    var localstroage = window.localStorage;
    let len = localstroage.length;
    let arr=[];
    for (let i=0;i<len;i++){//遍历所有的ssid
        let t=localstroage.key(i);
        if(t.length<15){
            arr.push(t);
        }
    }
    // alert(arr);
    arr.forEach(name=>{
        $('#showSSID').append('<tr><td>'+name+'</td> <td><input type="button" class='+name+' value="删除" onclick="deleteRow(this)" /></td></tr>');
        let btnId='#'+name;
    });
}

$(function() {
    $("#right").click(function () {
        $('#dialog').fadeIn();
    });
    //关闭弹窗
    $('.claseDialogBtn').click(function () {
        $('#dialog').fadeOut();
    });
    show();//添加ssid列表
    //提交数据
    $('#submitBtn').click(function () {
        let ssid=$('#SSID').val();
        submitSSID(ssid);
    });
});
