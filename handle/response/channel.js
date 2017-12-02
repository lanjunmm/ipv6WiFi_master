const fs=require('fs');
const Record = require('../../models/record');


function samePosFilter(dataList) {
    var map = {};
    var results = [];
    dataList.forEach(list => {
        let add=list[0]+list[1];//经度加纬度
        if (map[add]) {
            map[add] = Math.floor((map[add]+Number(list[2]))/2)
        } else {
            map[add] = Number(list[2]);
            results.push([list[0],list[1], Number(list[2])]);
        }
    });
    results.forEach(item => {
        item[2] = map[item[0]+item[1]];
        item[2]=(+item[2]+100)/5;
        item[0] = Number(item[0])+0.011082;
        item[1] = Number(item[1])+0.003624;//定位位置目测是因为有偏差，加上一个常数之后把它挪回来？？
    });
    return results;
}//过滤相同点???

function newObj(item) {
    let nObj={};
    nObj.name='';
    nObj.coor=[];
    nObj.name=item.SSID;
    nObj.coor.push([item.longitude,item.latitude, Number(item.level)]);
    return nObj;
}//

function channelClassify(chjsonData) {
    let h={},hName={};
    let dataSet=[];
    let num=0;
    chjsonData.forEach(item=>{//遍历每条数据
        let obj={};
        obj.data=[];
        obj.frequency=0;
        if(!h[item.frequency]){//按信道划分,如果该信道不存在则直接把它push
            h[item.frequency]=true;
            obj.frequency=item.frequency;
            hName[item.SSID]=true;
            let nObj=newObj(item);
            obj.data.push(nObj);
            dataSet.push(obj);
        } else{
            dataSet.forEach(da=>{
                if(da.frequency===item.frequency){//找到信道
                    if(!hName[item.SSID]){//如果该名字从未出现则直接push
                        hName[item.SSID]=true;
                        let nObj=newObj(item);
                        da.data.push(nObj);
                    }
                    else {
                        var flag=0;
                        for(let t=0;t<da.data.length;t++){//如果出现过且在该频道内存在
                            if(da.data[t].name===item.SSID){
                                da.data[t].coor.push([item.longitude,item.latitude, Number(item.level)]);
                                flag=1;
                            }
                        }
                        if (flag===0){
                            let nObj=newObj(item);
                            da.data.push(nObj);
                        }
                    }
                }
            })
        }

    }); //所有种类的wifi名
    dataSet.forEach(item=>{
        item.data.forEach(i=>{
            i.coor=samePosFilter(i.coor);
        })
    });
    return dataSet;
}//按照信道分数据

function channel(req ,res,next) {
    let ssid='hhhh';
    let chnData=[];
    Record.getListBySSID((err, results) => {
        if (err) {
            return next (err);
        }
        results.forEach(item=>{
            if(item.frequency===null){

            }else {
                chnData.push(item);
            }
        });
        let chDatas=channelClassify(results);
        res.json(chDatas);
        // res.render('channel.html', { ssidLists: JSON.stringify(chnData) });
    });
}

module.exports = {
    channel
};