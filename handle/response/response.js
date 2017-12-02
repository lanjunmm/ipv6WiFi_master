const fs=require('fs');
const Record = require('../../models/record');
var allData;
var temp=[];

function samePosFilter(dataList) { //过滤相同点???
	var map = {};
	var results = [];
	dataList.forEach(item => {
		let add=item.longitude + item.latitude;//经度加纬度
		if (map[add]) {
			map[add] = Math.floor((map[add]+Number(item.level))/2)
		} else {
			map[add] = Number(item.level);
			results.push([item.longitude,item.latitude, Number(item.level)]);
		}
	});
	results.forEach(item => {
		item[2] = map[item[0]+item[1]];
		item[2]=(+item[2]+100)/100;
		item[0] = Number(item[0])+0.011082;
		item[1] = Number(item[1])+0.003624;//定位位置目测是因为有偏差，加上一个常数之后把它挪回来？？
	});
	return results;
}


function formatData(dataList) {
	const list = dataList.map(item => {
		let array = [];
		array.push(Number(item.longitude));
		array.push(Number(item.latitude));
		array.push((+item.level+100)/100);
		return array;
	});
	return list;
}

function index(req ,res,next) {   //处理函数，调用record  参数：req ,res, next
  // Record.getListBySSID(ssid, (err, results) => { //'iFudan.1x'
	// 	if (err) {
	// 		return next (err);
	// 	}
  //     res.render('heatmap.html', { dataList: JSON.stringify(samePosFilter(results)) });
	// });
   res.render('heatmap.html', { dataList: JSON.stringify([]) });
}

function Filter(dataList) {
    var map = {};
    var results = [];
    dataList.forEach(item => {
        let add=item[0]+ item[1];//经度加纬度
        if (map[add]) {
            map[add] = Math.floor((map[add]+item[2])/2)
        } else {
            map[add] = Number(item[2]);
            results.push([item[0], item[1], item[2]]);
        }
    });
    results.forEach(item => {
        item[2] = map[item[0]+item[1]];
        item[2]=(+item[2]+100)/100;
        item[0] = Number(item[0])+0.011082;
        item[1] = Number(item[1])+0.003624;//定位位置目测是因为有偏差，加上一个常数之后把它挪回来？？
    });
    return results;
}
function classify(dataList) {
    let h={};
    let arr=[];
    let dataSet=[];
    let num=0;
    dataList.forEach(item=>{
        if(!h[item.SSID]){
            let obj={};
            obj.name='';
            obj.data=[];
            h[item.SSID]=true;
            arr.push(item.SSID);
            obj.name=item.SSID;
            obj.data.push([item.longitude,item.latitude, Number(item.level)]);
            dataSet.push(obj);
        }else{
            dataSet.forEach(da=>{
                if(da.name===item.SSID){
                    da.data.push([item.longitude,item.latitude, Number(item.level)]);
                }
            })
        }
        num=num+1;
    }); //所有种类的wifi名
    dataSet.forEach(itm=>{
      itm.data= Filter(itm.data);
      itm=JSON.stringify(itm);
    });
    return dataSet;
}

function allId(req ,res,next) {   //处理函数，调用record
    Record.getALL((err, results) => {
        if (err) {
            return next (err);
        }
        allData=results;
        var r=samePosFilter(results);
        var wifi=classify(results);
        // res.render('heatmap.html', { dataList: JSON.stringify(r) });
        // var sj=JSON.stringify(wifi);
        // console.log(sj);
        // res.set('Content-Type','application/json');
        res.json(wifi);

    });
}

module.exports = {
	index,
	allId,
};
