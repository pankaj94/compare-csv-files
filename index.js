var obj1 = [];
var obj2 = [];
var myRows = [];
var parseCSV = function(){
myRows = [];
    var fileInput = document.querySelector('.fileInput');
        fileInput.addEventListener('change', function(){
            var newData = [];
            Papa.parse(fileInput.files[0], {
                download: true,
                header: true,
                keepEmptyRows: false,
                skipEmptyLines: true,
                step: function(row) {
                    //  push the row data into the array
                    newData.push(row.data);
                },
                complete: function(results) {
                    console.log(JSON.parse(JSON.stringify(newData)));
                    obj1 = newData;
                    return obj1;
                }
            });
            return obj1;
        });
    
    var fileInput1 = document.querySelector('.fileInput1');
    fileInput1.addEventListener('change', function(){
        var newData = [];
        Papa.parse(fileInput1.files[0], {
            download: true,
            header: true,
            keepEmptyRows: false,
            skipEmptyLines: true,
            step: function(row) {
                //  push the row data into the array
                newData.push(row.data);
            },
            complete: function(results) {
                console.log(JSON.parse(JSON.stringify(newData)));
                obj2 = newData;
                return obj2;
            }
        });
        return obj2;
    });

    obj1.forEach((item,index) => {
        var item2 = obj2[index];
        if(!Array.isArray(item) && !Array.isArray(item2) && item && item2){
            flag = true;
            flagList = [];
            for(key in item){
                if(item[key] == item2[key]){
                    flag = true;
                }else{
                    flag = false;
                    key == 'flagList' ? '' : flagList.push(key);
                }
            }
            if(flagList.length > 0){
                //item['flag'] = false;
                item['flagList'] = flagList;
                myRows.push(item);
            }else{
                myRows.push(item);
            }
        }
        
    })
    console.log(myRows);
    renderTable();
    // if(Object.keys(obj1).length==Object.keys(obj2).length){
    //     for(key in obj1) { 
    //         if(obj1[key] == obj2[key]) {
    //             myRows.push({key : obj1[key]});
    //             continue;
    //         }
    //         else {
    //             myRows.push({key : obj1[key],'flag' : false});
    //         }
    //     }
    // }
}
console.log(parseCSV());
function renderTable(){
    let tableHead = document.getElementById('renderTableHead');
    let innerTableHead = '';
    if(obj1 && obj1.length > 0 && Object.keys(obj1[0]).length > 0){
        for(key in obj1[0]){
            if(key != 'flagList')
                innerTableHead = innerTableHead + `<th>${key}</th>`;
        }
        tableHead.innerHTML = innerTableHead;

        if(myRows.length > 0){
            let tableBody = document.getElementById('renderTableBody')
            var innerTbody = '';
            myRows.forEach((item,index) => {
                innerTbody = innerTbody + `<tr>`;
                for(key in item){
                    if(item.flagList && item.flagList.indexOf(key)!=-1)
                        innerTbody = innerTbody + `<td class="red">${item[key]}</td>`;
                    else if(key == 'flagList'){
                        console.log('error keys');
                    }
                    else
                        innerTbody = innerTbody + `<td>${item[key]}</td>`;
                }
                innerTbody = innerTbody  + `</tr>`;
                
            })
            tableBody.innerHTML = innerTbody;
        }


    }

}
