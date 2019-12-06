var obj1 = [];
var obj2 = [];
var myRows = [];
function parseFile(file){
    newData = [];
    Papa.parse(file.files[0], {
        download: true,
        header: true,
        keepEmptyRows: false,
        skipEmptyLines: true,
        step: function(row) {
            //  push the row data into the array
            newData.push(row.data);
        },
        complete: function(results) {
            return newData;
        }
    });
    return newData;
}
var parseCSV = function(){
    myRows = [];
    var fileInput = document.querySelector('.fileInput');
        fileInput.addEventListener('change', function(){
            obj1 = [];
           obj1 =  parseFile(fileInput)
        });
    
    var fileInput1 = document.querySelector('.fileInput1');
    fileInput1.addEventListener('change', function(){
        obj2 = [];
        obj2 = parseFile(fileInput1);
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
    renderTable();
}
parseCSV();
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
