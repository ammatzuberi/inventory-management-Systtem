

function submitForm() {
    // encodeImageFileAsURL();
    if (!editFormData)
        addproduct(); // if the editFormData is undefined then call addUser()
    else updateproduct();
}



// document.getElementById('Addsubmit').addEventListener('click', function () {
//     document.querySelector('.bg-model').style.display = "none";
// })
// document.getElementById('submit').addEventListener('click', function () {
//   document.querySelector(".card").style.display="none"

//   })


// document.getElementById('CARD').addEventListener('click',function(){
//     document.getElementById("product").style.display = "";
//     document.getElementById("cards").style.display = "none";
// })
// document.getElementById('TABLE').addEventListener('click',function(){
//     document.getElementById("cards").style.display = "";
//     document.getElementById("product").style.display = "none";
// })

document.getElementById('showcard').addEventListener('click', function () {


    document.querySelector('.bg-model').style.display = "block";


},
    // document.getElementById("edit").addEventListener('click', function () {
    //     document.querySelector('.bg_model2').style.display = "block";

    // })
)
document.querySelector('.close').addEventListener("click", function () {
    document.querySelector('.bg-model').style.display = "none";

})
document.querySelector('.close_edit').addEventListener("click", function () {
    document.querySelector('.bg_model2').style.display = "none";

})


var img;
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        img = reader.result
        console.log('RESULT', img)
    }
    reader.readAsDataURL(file);
}


var globaluid;

var url = "http://localhost:5000/products/"


var userdata;

const itemPerPage=5;
let page=1;


function pages(index){

 
    const table= document.querySelector('.table');
    const rows= table.tBodies[0].rows;
    console.log(rows)
    // alert(rows.length);

    if(index<0){
        page= 0;
        // alert(1)
    }
    else if(index>table.rows.length-itemPerPage){
        page=rows.length/itemPerPage+1
        // alert(2)
        
    }
    else{
        // alert(3)
        page=index;
        console.log(page)
    }
    for (let i = 1; i < rows.length; i++) {
        if (i >= page && i < page + itemPerPage) {
          rows[i].style.display = 'table-row';
        }
        else {
          rows[i].style.display = 'none';    
        }
      }
    }

   
function productshow() {

    // toggleCheck();
    document.getElementById("cards").style.display = "none";

    document.querySelector('.bg-model').style.display = "none";
    document.querySelector('.bg_model2').style.display = "none";
    // document.querySelector(".ADD_PRoduct").style.display = "block";


    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            var formcard = "";
            var productdata = "";
            productdata +=
                `  
             
            <table class="table">
            <thread>
            <tr>
            <th> Product Name
            <th> Image</th>
            <th>Total Stock</th>
            <th>Price</th>
            <th>Manufacture</th>
            <th>Stock Left</th>
            <th>Date</th>
            <th>Area</th>
            <th>Serial Number</th>
            <th>Comments</th>
            <th>Summary</th>
         
   
     
            <th>Action</th>
       
            </tr>
            </thread>`
            response.forEach((user) => {


              
                userdata = [...response];
                console.log(userdata)

                    globaluid=user.uid
                console.log(user.uid)
                // .catch(error=> console.error("unable to get the Products"))
                
                
             

                    
                    
                    
                    
                    if( user.stock==0){
                        //  document.getElementById('product').style.display='none';
                productdata ==
                
                
                `
                <tbody>
                <tr   class=" tralign " onclick="setGuid('${user.uid}')"  id="myTable" >
                <a href="">
                <td     style=color:${user.stock < 20 ? "red" : "#000"}  >  ${user.name}
                </td> 
                <td>  
                <img   onclick="window.location='productDetail.html' " class ="image" src="${user.image}"/ >  </td> 
                <td > ${user.quantity} </td>
                <td >₹ ${user.price} </td>
                <td  > ${user.manufacturer} </td>
                <td  > ${user.stock} </td>
                
                <td >${user.date}</td>
                <td >${user.area}</td>
                <td >${user.serial}</td>
                <td >${user.comment}</td>
                
                <td>
                <i class="fa-solid fa-trash" onclick='deleteproduct("${user.uid}")'></i>
                <i class="fa-solid fa-pen" onclick='editDataCall("${user.uid}")'>
                </i>
                
                </td>
                
                
                
                </tr>
                </tbody>`
            }
            else {
                document.getElementById('product').style.display='';
                productdata +=
                
                
                `<tr   class="tralign" onclick="setGuid('${user.uid}')" >
                <a href="">
                <td     style=color:${user.stock < 20 ? "red" : "#000"}  >  ${user.name}
                </td> 
                <td>  
                <img   onclick="window.location='productDetail.html' " class ="image" src="${user.image}"/ >  </td> 
                <td > ${user.quantity} </td>
                <td >₹${user.price} </td>
                <td  > ${user.manufacturer} </td>
                <td  > ${user.stock} </td>
                
                <td >${user.date}</td>
                <td >${user.area}</td>
                <td >${user.serial}</td>
                <td >${user.comment}</td>
                <td >${user.summary}</td>
                
                
                <td>
                <i class="fa-solid fa-trash" onclick='deleteproduct("${user.uid}")'></i>
                <i class="fa-solid fa-pen" onclick='editDataCall("${user.uid}")'>
                </i>
                
                </td>
                </tr>`
            }   
        
            formcard +=
            
            ` <div class="card"  onclick="setGuid('${user.uid}')" >
             <div class="container">
             
             <img onclick="window.location='productDetail.html' " class ="cardimage" src="${user.image}">
             <div class=" text">
             <h4   class= "pheading mytext" style=color:${user.quantity < 20 ? "red" : "#000"};  > ${user.name}  </h4>
                 <p> Quantity:${user.quantity} </p>
               <p  > Price: ${user.price} </p>
             <p  >  Manufacturer:    ${user.manufacturer} </p>
    
        
                <p><button class='w3-button w3-red' onclick='deleteproduct("${user.uid}")'>Delete</button>
                <button class='w3-button w3-blue' onclick='editDataCall("${user.uid}")'>EDIT</button></p>
                </div>
                </div>
                </div>
                `


            });

            document.getElementById("product").innerHTML = productdata;
            pages(0);
            // document.getElementById("cards").innerHTML = formcard;

         
        })
       

}
// const setGuid = (uid) => {   
//     localStorage.setItem('ID', JSON.stringify(uid));;
// }

const setGuid = (uid) => {
    localStorage.setItem('ID', JSON.stringify(uid));;
}
productshow();
// function card() {
//     var cardobj

//     // var formtable = document.getElementById("product");
//     var formcard = " ";
//     //   var x = document.getElementById("Searchme").value;
//     //   var y = document.getElementById("data").value;
//     // var namesearch= document.getElementById('name').value;
//     console.log(data)
//     // if (x == "") {
//     //     alert("Please Enter Data In Search ");
//     //     return false;
//     // }


//     // console.log(userdata);
//     //   cardobj = userdata.filter(item => item[y].toLowerCase().includes(x.toLowerCase()))
//     // = userdata.filter(item => item[namesearch].toLowerCase().includes(x.toLowerCase()))




//     console.log(cardobj);

 



//     for (z = 0; z < cardobj.length; z++) {
//         formcard +=


//             `   <div class="card">
//                <div class="container">
//             <img class="cardimage" src="${cardobj[z].image}" > 
//           <td >${cardobj[z].name}</td>
//           <p style=color:${cardobj[z].quantity < 20 ? "red" : "000"}> ${cardobj[z].quantity}</p>
//           <p style=color:${cardobj[z].price < 200 ? "red" : "000"}> ${cardobj[z].price}</p>
//           <p> ${cardobj[z].manufacturer}</p>
    
      
//               s
//           <p><button class='w3-button w3-red' onclick='deleteproduct("${cardobj[z].uid}")'>Delete</button></p>
//           <p><button class='w3-button w3-yellow' onclick='editDataCall("${cardobj[z].uid}")'>EDIT</button></p>
//           </div>
//           </div>
//           `




//     }
//     document.getElementById("cards").innerHTML = formcard;









// }
// card();


// function card() {
//     var cardobj


//     var formcard = " ";
//     var x = document.getElementById("Searchme").value;
//     var y = document.getElementById("data").value;
//     // var namesearch= document.getElementById('name').value;
//     console.log(data)
//     // if (x == "") {
//     //     alert("Please Enter Data In Search ");
//     //     return false;
//     // }


//     cardobj = userdata.filter(item => item[y].toLowerCase().toString().includes(x.toLowerCase().toString()))
//     // = userdata.filter(item => item[namesearch].toLowerCase().includes(x.toLowerCase()))




//     console.log(cardobj);




//     for (z = 0; z < cardobj.length; z++) {
//         formcard +=


//             `   <div class="card">
//                      <div class="container">
//             <img class="cardimage" src="${cardobj[z].image}" > 
//             <div class=" text"> 
//           <h3 style=color:${cardobj[z].quantity < 20 ? "red" : "000"} > Name: ${cardobj[z].name}</h3>
          
//           <p >  Quantity: ${cardobj[z].quantity}</p>
//           <p style=color:${cardobj[z].price < 200 ? "red" : "000"}> Price: ${cardobj[z].price}</p>
//           <p>Manufacturer: ${cardobj[z].manufacturer}</p>
    
      
              
//           <p><button class='w3-button w3-red' onclick='deleteproduct("${cardobj[z].uid}")'>Delete</button>
//           <button class='w3-button w3-yellow' onclick='editDataCall("${cardobj[z].uid}")'>EDIT</button></p>
//           </div>
//           </div>
//           </div>    
//           `




//     }
//     document.getElementById("cards").innerHTML = formcard;

// }

function show_all(){

 show_allproducts ="";

show_allproducts =`

<table class="table2" id="showall">
<tr>
<th> Product Name
<th>    Image</th>
<th>Total Stock</th>
<th>Price</th>
<th>Manufacture</th>
<th>Stock Left</th>
<th>Date</th>
<th>Area</th>
<th>Serial Number</th>
<th>Comments</th>
<th>Summary</th>



<th>Action</th>
</tr>
</table>

 `
for(z=0;z<userdata.length;z++){
show_allproducts +=



            `<tr   class="tralign" onclick="setGuid('${userdata[z].uid}')"  id="myTable">
        <td  style=color:${userdata[z].stock < 20 ? "red" : "#000"} > ${userdata[z].name} </td>
        <td>     <img class ="image"  onclick="window.location='productDetail.html' " src="${userdata[z].image}"></td>
        <td > ${userdata[z].quantity} </td>
        <td > ${userdata[z].price} </td>
        <td  > ${userdata[z].manufacturer} </td>
        <td  > ${userdata[z].stock} </td>
        <td >${userdata[z].date}</td>
        <td >${userdata[z].area}</td>
        <td >${userdata[z].serial}</td>
        <td >${userdata[z].comment}</td>
        <td >${userdata[z].summary}</td>

        <td>
        <i class="fa-solid fa-trash" onclick='deleteproduct("${userdata[z].uid}")'></i>
        <i class="fa-solid fa-pen" onclick='editDataCall("${userdata[z].uid}")'>
        </i>
       
        </td>
        </tr>`
        document.getElementById("product").innerHTML= show_allproducts;

    }
}
 


function outofStock(){


var formcard= ''
QDATA= '';
QDATA =
`   
<table class="table">
<tr>
<th> Product Name
<th>    Image</th>
<th>Total Stock</th>
<th>Price</th>
<th>Manufacture</th>
<th>Stock Left</th>
<th>Date</th>
<th>Area</th>
<th>Serial Number</th>
<th>Comments</th>
<th>Summary</th>



<th>Action</th>
</tr>`






for (z = 0; z < userdata.length; z++) {
    var stock_data = userdata[z].stock

    //   console.log(quantity_data)
    if (stock_data <= 0) {
        console.log(stock_data)
        

        QDATA +=
            `<tr  onclick="setGuid('${userdata[z].uid}')">
        <td  style=color:${userdata[z].stock < 20 ? "red" : "#000"} > ${userdata[z].name} </td>
        <td>     <img class ="image"  onclick="window.location='productDetail.html' " src="${userdata[z].image}"></td>
        <td > ${userdata[z].quantity} </td>
        <td > ₹${userdata[z].price} </td>
        <td  > ${userdata[z].manufacturer} </td>
        <td  > ${userdata[z].stock} </td>
        <td >${userdata[z].date}</td>
        <td >${userdata[z].area}</td>
        <td >${userdata[z].serial}</td>
        <td >${userdata[z].comment}</td>
        <td >${userdata[z].summary}</td>

        <td>
        <i class="fa-solid fa-trash" onclick='deleteproduct("${userdata[z].uid}")'></i>
        <i class="fa-solid fa-pen" onclick='editDataCall("${userdata[z].uid}")'>
        </i>
       
        </td>
        </tr>`

/*

        formcard +=
            ` <div class="card">
         <div class="container">

        <img class ="cardimage"   onclick="window.location='productDetail.html' " src="${userdata[z].image}">
        <div class=" text">
        <h4  style=color:${userdata[z].quantity < 20 ? "red" : "#000"} > Name: ${userdata[z].name} </h4>
        <p> Quantity:${userdata[z].quantity} </p>
        <p  > Price: ${userdata[z].price} </p>
        <p  >  Manufacturer:    ${userdata[z].manufacturer} </p>
 
      <p><button class='w3-button w3-red' onclick='deleteproduct("${userdata[z].uid}")'>Delete</button>
      <button class='w3-button w3-yellow' onclick='editDataCall("${userdata[z].uid}")'>EDIT</button></p>

      </div>
      </div>
      </div>
      `



*/


    }
}

document.getElementById("product").innerHTML = QDATA;
    // document.getElementById("cards").innerHTML = formcard;
}


function quantity_filter() {

    var QDATA;
    var formcard = '';


    QDATA =
        `   
    <table class="table">
    <tr>
    <th> Product Name
    <th>    Image</th>
    <th>Total Stock</th>
    <th>Price</th>
    <th>Manufacture</th>
    <th>Stock Left</th>
    <th>Date</th>
    <th>Area</th>
    <th>Serial Number</th>
    <th>Comments</th>
    <th>Summary</th>
 


    <th>Action</th>
    </tr>`

    console.log(userdata);
    //   var =quantity_data=userdata
    for (z = 0; z < userdata.length; z++) {
        var stock_data = userdata[z].stock

        //   console.log(quantity_data)
        if (stock_data < 20 && stock_data>0) {
            console.log(stock_data)

            QDATA +=
                `<tr onclick="setGuid('${userdata[z].uid}')" >
            <td  style=color:${userdata[z].stock < 20 ? "red" : "#000"} > ${userdata[z].name} </td>
            <td>     <img class ="image"  onclick="window.location='productDetail.html' " src="${userdata[z].image}"></td>
            <td > ${userdata[z].quantity} </td>
            <td >₹${userdata[z].price} </td>
            <td  > ${userdata[z].manufacturer} </td>
            <td  > ${userdata[z].stock} </td>
            <td >${userdata[z].date}</td>
            <td >${userdata[z].area}</td>
            <td >${userdata[z].serial}</td>
            <td >${userdata[z].comment}</td>
            <td >${userdata[z].summary}</td>    

            <td>
            <i class="fa-solid fa-trash" onclick='deleteproduct("${userdata[z].uid}")'></i>
            <i class="fa-solid fa-pen" onclick='editDataCall("${userdata[z].uid}")'>
            </i>
           
            </td>
            </tr>`

/*

            formcard +=
                ` <div class="card"  onclick="setGuid('${userdata[z].uid}')" >
             <div class="container">

            <img class ="cardimage"   onclick="window.location='productDetail.html' " src="${userdata[z].image}">
            <div class=" text">
            <h4  style=color:${userdata[z].quantity < 20 ? "red" : "#000"} > Name: ${userdata[z].name} </h4>
            <p> Quantity:${userdata[z].quantity} </p>
            <p  > Price: ${userdata[z].price} </p>
            <p  >  Manufacturer:    ${userdata[z].manufacturer} </p>
     
          <p><button class='w3-button w3-red' onclick='deleteproduct("${userdata[z].uid}")'>Delete</button>
          <button class='w3-button w3-yellow' onclick='editDataCall("${userdata[z].uid}")'>EDIT</button></p>
    
          </div>
          </div>
          </div>
          `





*/
        }
    }
    document.getElementById("product").innerHTML = QDATA;
    // document.getElementById("cards").innerHTML = formcard;





}







function search() {

    // card();

    var newObj

    // var formtable = document.getElementById("product");
    var formtable = " ";

    var x = document.getElementById("Searchme").value;
    var y = document.getElementById("data").value;

    var noResult=document.getElementById('not_found')
    var tableheading= document.querySelector('.table');
    // noResult.innerHTML="DATA NOT FOUND";
   

    //  let searchshow= document.getElementById('product');

   
// if(y==''){
//    alert("please select the field you wanted to search")
   
// }
// if(x==[y]){

//     noResult.style.display='none';  
// }

// else{
 
//     noResult.style.display='';              
   
// }    

     
     newObj = userdata.filter(item =>
            item[y].toString().toLowerCase()
    .includes(x.toString().toLowerCase()) )
    console.log(newObj);

    if(newObj.length)
        {
        
            noResult.style.display='none';   
            tableheading.style.display='block'; 
        }
        else{
          
            noResult.style.display='';  
            tableheading.style.display='none';

        }
        

    // var namesearch= document.getElementById('name').value;
 
    // if (x == "") {
    //     alert("Please Enter Data In Search ");
    //     return false;
    // }

  // console.log(userdata);

    formtable=

        `   
        <table class="table">
        <tr>
        <th> Product Name
        <th>    Image</th>
        <th>Total Stock</th>
        <th>Price</th>
        <th>Manufacture</th>
        <th>Stock Left</th>
        <th>Date</th>
        <th>Area</th>
        <th>Serial Number</th>
        <th>Comments</th>
        <th>Summary</th>
     
    
    
        <th>Action</th>
        </tr>
   
      
        
        `
     

    for (z = 0; z < newObj.length; z++) {
        
        formtable += `
    

      <tr class="tabledata"> 
 

    
  
        <td >${newObj[z].name}</td>
        
        <td> <img class="image"   onclick="window.location='productDetail.html' "src="${newObj[z].image}" > </td>
        <td style=color:${newObj[z].quantity < 20 ? "red" : "000"}> ${newObj[z].quantity}</td>
        <td >₹ ${newObj[z].price}</td>
        <td> ${newObj[z].manufacturer}</td>
        <td  > ${userdata[z].stock} </td>
        <td> ${newObj[z].date}</td>
        <td >${userdata[z].area}</td>
        <td >${userdata[z].serial}</td>
        <td >${userdata[z].comment}</td>
        <td >${userdata[z].summary}</td>   
    <td> 
        <i class="fa-solid fa-trash" onclick='deleteproduct("${userdata[z].uid}")'></i>
        <i class="fa-solid fa-pen" onclick='editDataCall("${userdata[z].uid}")'></i>   </td>    
         </tr>`




    }

    document.getElementById("product").innerHTML = formtable;
   document.getElementById('not_found').innerHTML=" Sorry Product Not  Found"    ;

    



    



// 









}

function addproduct() {

    const nameinput = document.getElementById('Addname');
    const quantityinput = document.getElementById('Addquantity');
    const priceinput = document.getElementById('Addprice');
    const manufacturerinput = document.getElementById('Addmanufacture');
    const dateinput = document.getElementById('AddDate');
    const Commentsinput = document.getElementById('AddComments');
    const serialnumberinput = document.getElementById('Addserialnumber');
    const Summaryinput = document.getElementById('AddSummary');
    const areainput = document.getElementById('Addarea');
    const stockinput = document.getElementById('Addquantity');
    // const addstockinput=document.getElementById('addnewstock');


    const imageinput = img;




    const item = {
        name: nameinput.value.trim(),
        quantity: quantityinput.value.trim(),
        price: priceinput.value.trim(),
        manufacturer: manufacturerinput.value.trim(),
        image: imageinput.trim(),
        date: dateinput.value.trim(),
        summary: Summaryinput.value.trim(),
        comment: Commentsinput.value.trim(),
        area: areainput.value.trim(),
        serial: serialnumberinput.value.trim(),
        stock:stockinput.value.trim(),
        // Addstock:addstockinput.value.trim()

    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())

        .then((response) => {
            productshow();
            reset();
            nameinput.value = "";
            quantityinput.value = "";
            priceinput.value = "";
            manufacturerinput.value = "";
            // imageinput = " ";


        })
}

function deleteproduct(uid) {
    if (confirm('Do you want to delete this record?')) {
        if (alert("Delete SuccessFull")) {


        }
        fetch(`${url}/${uid}`, {

            method: "DELETE"

        })
            .then(() => productshow())
    }

}
function reset() {
    document.getElementById("image1").value = "";

}



var editFormData;




function editDataCall(guid) {
    document.querySelector('.bg_model2').style.display = "block";
    globaluid = guid;
    console.log(globaluid)
    // call get user details by id API
    
    fetch(url, {
        method: "GET"
    }).then((res) => res.json()).then((response) => {
        
        {

            editFormData = response.find(item => item.uid === guid);
            setFormData(editFormData.name, editFormData.quantity, editFormData.price, editFormData.stock  ,editFormData.Addstock)
            //
            
        }
        
    })
    
}
function updateproduct() {
    console.log(globaluid)

    const imageinput = img;
    // const area= document.getElementById('Addarea').value.trim();



    const item = {
        name: document.getElementById('Name').value.trim(),
   

        quantity: (parseInt(document.getElementById('quantity').innerHTML.trim()) ||0)
        +  parseInt(document.getElementById('newstock').value.trim()),
     
        price: document.getElementById('price').value.trim(),
        area: document.getElementById('area').value.trim(),
        manufacturer: document.getElementById('manufacture').value.trim() ,
        
        image: imageinput,
        stock: (parseInt(document.getElementById('stockedit').innerHTML) || 0 )+parseInt(document.getElementById('newstock').value.trim()),
        // totalstock:parseInt(document.getElementById('Addstock').value)+parseInt(document.getElementById('newstock').value.trim()),
        // +parseInt(document.getElementById('Addstock').value.trim()),
        Addstock:parseInt(document.getElementById('newstock').value.trim()),
        date:document.getElementById('Date').value.trim(),
        serial:document.getElementById('serialnumber').value.trim(),
        comment:document.getElementById('Comments').value.trim(),
            summary:document.getElementById('Summary').value.trim()
    };


    fetch(url + globaluid, {    
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(item)

    })
        .then(response => response.json())

        .then((response) => {
            console.log(response)
            productshow();
            reset();



        })
    return false;
}
function setFormData(name, quantity,  stock, area) {
    
    document.getElementById("Name").value = name;
    document.getElementById("quantity").innerHTML = quantity;
    // document.getElementById("price").value = price;
    // document.getElementById('area').value=area
    document.getElementById("stockedit").innerHTML= stock
    // document.getElementById('image').files=image

 
    // document.getElementById("image")=image



}



let name_logout = localStorage.getItem('name') ? localStorage.getItem('name') : ''

// console.log(name_logout)
if (name_logout == '') {
    alert("you need to login first ")
    window.location.href = "login.html"
}

function Logout() {


    if (confirm('Are Your Sure Logout?')) {
        window.location.href = "login.html"
        localStorage.removeItem('name')
        localStorage.removeItem('email')
    }
  

}

//Table To excel
function export_data(){
	let data=document.querySelector('.table222');
	var fp=XLSX.utils.table_to_book(data,{sheet:'All_Products'});
	XLSX.write(fp,{
		bookType:'xlsx',
		type:'base64'
	});
	XLSX.writeFile(fp, 'Product.xlsx');
}
// paging js 
