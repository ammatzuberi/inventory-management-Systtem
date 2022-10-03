function submit() {
  // encodeImageFileAsURL();
  // if (!Detail_product)
  // userinput(); // if the editFormData is undefined then call addUser()
  // else updateproduct();
}





document.querySelector(".formproduct").addEventListener("click", function () {
  document.querySelector(".bg-model").style.display = "block";
});
document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".bg-model").style.display = "none";
});
document.querySelector(".Returnform").addEventListener("click", function () {
  document.querySelector(".Returndata").style.display = "block";
});
document.querySelector(".closeReturn").addEventListener("click", function () {
  document.querySelector(".Returndata").style.display = "none";
});

document.querySelector(".Returnsave").addEventListener("click", function () {
  document.querySelector(".Returndata").style.display = "none";
});



let name_logout = localStorage.getItem('name') ? localStorage.getItem('name') : ''

// console.log(name_logout)
if (name_logout == '') {
    alert("you need to login first ")
    window.location.href = "login.html"
}
// document.querySelector('.container').display.style="none";

var uid;
var newuid;
var Detail_product;
var Detail_productReturn;
var tableid;
const url = "http://localhost:5000/products/";
const userdata = "http://localhost:5000/userdata/";
// console.log(window.guid);

function product_detail() {
  document.querySelector(".bg-model").style.display = "none";
  // console.log(globaluid)
  var dataid = new Array();
  // console.log(localStorage.getItem('ID'));
  dataid = JSON.parse(localStorage.getItem("ID"))
    ? JSON.parse(localStorage.getItem("ID"))
    : [];

  newuid = dataid;
  //  console.log(dataid)
  // call get user details by id API

  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      // response.forEach((data) => {s

      {
        Detail_product = response.find((item) => item.uid === dataid);

        console.log(Detail_product);
        showDataCard(
          // [...Detail_product,name,quantity, price ,manufacturer ,area ,serial ,image,stock]
          Detail_product.name,
          Detail_product.quantity,
          Detail_product.price,
          Detail_product.manufacturer,
          Detail_product.area,
          Detail_product.serial,
          Detail_product.image,
          Detail_product.stock,
          Detail_product.damagedstock
        );
        editdata(Detail_product.name, Detail_product.uid, Detail_product.stock);

        //
      }
    });
}
// }

function showDataCard(
  name,
  quantity,
  price,
  manufacturer,
  area,
  serial,
  image,
  stock,
  damagedstock=0
) {
  document.getElementById("Namecard").innerHTML = name;
  document.getElementById("quantitycard").innerHTML = quantity;

  document.getElementById("Pricecard").innerHTML = price;
  document.getElementById("Manufacturecard").innerHTML = manufacturer;
  document.getElementById("areacard").innerHTML = area;
  document.getElementById("Serialcard").innerHTML = serial;
  document.getElementById("imagecard").src = image;
  document.getElementById("Stockcard").innerHTML = stock;
  document.getElementById("DamageditemCard").innerHTML = damagedstock;
}

function editdata(name, uid, stock) {
  //  document.getElementById('Quantity').value =quantity;
  document.getElementById("productname").innerHTML = name;
  document.getElementById("productnameReturn").innerHTML = name;
  document.getElementById("productid").innerHTML = uid;
  document.getElementById("productidReturn").innerHTML = uid;
  // document.getElementById("stockleft").innerHTML = stock;

  
  // document.getElementById('stockleft').innerHTML=stock
}

function saveData() {
  let productname, employeename, quantityout, date, uid, stockleft;
  productname = document.getElementById("productname").innerHTML;
  employeename = document.getElementById("Employeename").value;
  quantityout = document.getElementById("Quantity").value;
  // date=  new Date().toISOString().slice(0, 10);
  date = document.getElementById("outDate").value;
  uid = document.getElementById("productid").innerHTML;
  // stockleft = document.getElementById("stockleft").innerHTML;
  department = document.getElementById("department").value;
  console.log(date);

  console.log(date);
  if (date == "") {
    date = new Date().toISOString().slice(0, 10);
    console.log(date);
  } else {
    date = document.getElementById("outDate").value;
  }

  user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  console.log(user_records);

  if (user_records.stock < 0) {
    alert("stock not avilable");
  } else {
    user_records.push({
      productname: productname,
      employeename: employeename,
      date: date,
      quantityout: quantityout,
      uid: uid,
      stockleft: stockleft,
      department: department,
    });
    alert("Quantity Out Successfully");
    localStorage.setItem("users", JSON.stringify(user_records));
  }
  showData();
}

function returnstock() {
  window.location.href = "productDetail.html";
  if (document.getElementById("brokenproduct").checked) {
    // alert(parseInt(Detail_product.damagedstock) || 0)
    var item = {
      damagedstock: (
        (parseInt(Detail_product.damagedstock) || 0) +
        parseInt(document.getElementById("Returnquantity_in").value.trim())
      ).toString(),
    }
  }
   else {
    var item = {
      stock: (
        parseInt(Detail_product.stock) +
        parseInt(document.getElementById("Returnquantity_in").value.trim())
      ).toString(),
      // quantity: (
      //   parseInt(Detail_product.quantity) +
      //   parseInt(document.getElementById("Returnquantity_in").value.trim())
      // ).toString(),
   
    };
  };
  var valid ={
    quantity:document.getElementById("Returnquantity_in").value,
    name:document.getElementById("ReturnName").value,
    department: document.getElementById('returnDepartmanet').value
  }
 if(valid.quantity==''){
  alert("Please Enter Quantity IN Field")

 }
 else if(valid.name=='')
 {
  alert("please enter name ")
 }
 else if(valid.quantity> Detail_product.quantity){
  alert("Cannot Enter False Data")
 }

  

                           
 
else{
  fetch(url + newuid, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())

    .then((response) => {});
  userinput();
  return false;
}
}



function updateproduct() {
  document.querySelector(".bg-model").style.display = "none";
  window.location.href = "productDetail.html";

  const quantity = {
    quantity: document.getElementById("Quantity").value,
  };

  const item = {
    stock: (
      parseInt(Detail_product.stock) -
      parseInt(document.getElementById("Quantity").value.trim())
    ).toString(),
    department: document.getElementById("department").value,
    employeename: document.getElementById("Employeename").value,
  };
  console.log(item);
  if (item.stock < 0) {
    alert("data is stock out..");
  } else if (item.department == "") alert("Please Enter Department Field  ");
  else if (quantity.quantity == "") alert("Please Enter  Quantity Out.?");
  else if (quantity.quantity < 0) {
    alert("Please Enter Correct Quantity Out.");
  } else if (item.employeename == "") {
    alert("Please Enter Employee Name");
  } else {
    fetch(url + newuid, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())

      .then((response) => {});
    saveData();
    return false;
  }
}

var user_records;
showData();

function showData() {
  dataid = JSON.parse(localStorage.getItem("ID"))
    ? JSON.parse(localStorage.getItem("ID"))
    : [];
  console.log(dataid);
  var formcards = document.getElementById("showUsers");
  var drawTable = "";
  formcards.innerHTML = " ";

  // = document.getElementById("showUsers").innerHTML="";
  user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  // console.log(user_records[0].uid)

  var drawTable = "";

  drawTable = `
<table class="table ">
<tr >

<th class="thtable1" > Product Name</th>
<th>Employee Name </th>
<th>Stock Out  </th>  
<th>Department  </th>  
<th>Date </th>

    
    </tr>`;
  if (user_records) {
    for (let i = 0; i < user_records.length; i++) {
      if (dataid == user_records[i].uid) {
        drawTable += `   
            <tr class="tabledata"> 
   
            <td>${user_records[i].productname}</td>
            <td>${user_records[i].employeename}</td>
            <td >${user_records[i].quantityout}</td>
            <td >${user_records[i].department}</td>
            <td> ${user_records[i].date}</td>
         
           
            </td>
    
            <!--<td>
            <input type="button" id="buttoncard"  onclick="showcard()" class="cardbutton" value="Show Card">  
            </td>-->


                </tr>`;
      }
    }
  }
  //   document.getElementById('showUsers').innerHTML=drawTable;
  drawTable += `</table>`;
  formcards.innerHTML = drawTable;
  return false;
}

function showData() {
  dataid = JSON.parse(localStorage.getItem("ID"))
    ? JSON.parse(localStorage.getItem("ID"))
    : [];
  console.log(dataid);
  var formcards = document.getElementById("showUsers");
  var drawTable = "";
  formcards.innerHTML = " ";

  // = document.getElementById("showUsers").innerHTML="";
  user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  // console.log(user_records[0].uid)

  var drawTable = "";

  drawTable = `
<table class="table "  id ="Outtable">
<tr>

<th> Product Name</th>
<th>Employee Name </th>
<th>Stock Out  </th>  
<th>Department  </th>  
<th>Date </th>

    
    </tr>`;
  if (user_records) {
    for (let i = 0; i < user_records.length; i++) {
      if (dataid == user_records[i].uid) {
        drawTable += `   
            <tr class="tabledata"> 
   
            <td>${user_records[i].productname}</td>
            <td>${user_records[i].employeename}</td>
            <td >${user_records[i].quantityout}</td>
            <td >${user_records[i].department}</td>
            <td> ${user_records[i].date}</td>
         
           
            </td>
    
            <!--<td>
            <input type="button" id="buttoncard"  onclick="showcard()" class="cardbutton" value="Show Card">  
            </td>-->


                </tr>`;
      }
    }
  }
  //   document.getElementById('showUsers').innerHTML=drawTable;
  drawTable += `</table>`;
  formcards.innerHTML = drawTable;
  return false;
}

function returntable_search() {
  dataid = JSON.parse(localStorage.getItem("ID"))
    ? JSON.parse(localStorage.getItem("ID"))
    : [];
  var table_Return = document.getElementById("ShowReturnUsers");  

  table_Return.innerHTML = "";
  var drow_return_table = "";
  returntable_records = new Array();
  returntable_records = JSON.parse(localStorage.getItem("ReturnData"))
    ? JSON.parse(localStorage.getItem("ReturnData"))
    : [];
  // console.log(returntable_records)

  var dropdown_return = document.getElementById("ReturntableSearch").value;
  var search_return_table = document.getElementById("Searchreturntable").value;
  var searchnotfound= document.getElementById('searchnotfound');
  var stockIn= document.getElementById('StockIN').value;
//   if(ReturntableSearch=='StockIN'){
//     returntable_records=returntable_records.filter(item=>
//       item[stockIn]==[search_return_table])
//   }
// else{

  returntable_records = returntable_records.filter((item) =>
    item[dropdown_return]
      .toUpperCase()
      .toString()
      .includes(search_return_table.toUpperCase().toString())
  );
// }
if(returntable_records.length){

searchnotfound.style.display='none'

}
else{
  searchnotfound.style.display=""
}
  drow_return_table = `<table class ="table" id="returnTable">
<th> Product Name</th>
<th  > Employee Name </th>
<th> Stock In</th>
<th>Department</th>
<th >Date</th>
<th>Action</th>
  </tr>`;

  for (z = 0; z < returntable_records.length; z++) {
    if (dataid == returntable_records[z].uid) {
      console.log(returntable_records);

      drow_return_table += `   
         <tr class="tabledata"> 
              
   
            <td >  ${returntable_records[z].ProductName}</td>
           <td>${returntable_records[z].CustomerName}</td>
            <td>${returntable_records[z].QuantityIN}</td>
            <td>${returntable_records[z].ReturnDepartment}</td>
            <td>${returntable_records[z].datealloted}</td>
            <td style=color:${
              returntable_records[z].brokenquality ? "red" : "green"
            }>${returntable_records[z].brokenquality ? "BROKEN" : "FINE"}</td>
    
            </td>
            
            
            
            </tr>`;
    }
  }

  drow_return_table += `</table>`;
  table_Return.innerHTML = drow_return_table;
  searchnotfound.innerHTML= "Search not Found";

//   var StockIN = document.getElementById("StockIN").value;
//   var search_return_table = document.getElementById("Searchreturntable").value;

//   returntable_records = returntable_records.filter(
//     (item) =>
//       item[StockIN].toUpperCase().toString() ==
//       search_return_table.toUpperCase().toString()
//   );

//   drow_return_table = `<table class ="table" id="returnTable">
// <th> Product Name</th>
// <th  > Employee Name </th>
// <th> Stock In</th>
// <th>Department</th>
// <th >Date</th>
// <th>Action</th>
//   </tr>`;

//   for (z = 0; z < returntable_records.length; z++) {
//     if (dataid == returntable_records[z].uid) {
//       console.log(returntable_records);

//       drow_return_table += `   
//          <tr class="tabledata"> 
              
   
//             <td >  ${returntable_records[z].ProductName}</td>
//            <td>${returntable_records[z].CustomerName}</td>
//             <td>${returntable_records[z].QuantityIN}</td>
//             <td>${returntable_records[z].ReturnDepartment}</td>
//             <td>${returntable_records[z].datealloted}</td>
//             <td style=color:${
//               returntable_records[z].brokenquality ? "red" : "green"
//             }>${returntable_records[z].brokenquality ? "BROKEN" : "FINE"}</td>
    
//             </td>
            
            
            
//             </tr>`;
//     }
//   }
}

function search() {
  dataid = JSON.parse(localStorage.getItem("ID"))
    ? JSON.parse(localStorage.getItem("ID"))
    : [];
  var formcards = document.getElementById("showUsers");
  var drawTable = "";
  formcards.innerHTML = "";
  // var searchdata;
  user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  // user_records

  var dropdown = document.getElementById("searchtable").value;
  var search = document.getElementById("Searchme").value;
  var searchresult= document.getElementById('productassign');
  var  stockout= document.getElementById('quantityout').value

console.log(stockout,dropdown)

  // if(stockout==dropdown){

  //   user_records=user_records.filter(item=>
  //     item[stockout]==[search])
  // }
  // else if(stockout=''&& dropdown==stockout )
  // {
  //   user_records = user_records.filter((item) =>
  //     item[dropdown].toString()
  //       .toUpperCase()
     
  //       .includes(search.toString().toUpperCase())
  //   );
  // }
  // else{
    user_records = user_records.filter((item) =>
      item[dropdown].toString()
        .toUpperCase()
     
        .includes(search.toString().toUpperCase())
    );

  // }

  if(user_records.length){
    searchresult.style.display="none";

  }
  else{
    searchresult.style.display=" ";
  }
  drawTable = `
  <table class="table " id="Outtable">
  <tr>
  
  <th> Product Name</th>
  <th>Employee Name </th>
  <th>Stock Out  </th>  
  <th>Department</th>

  <th>Date </th>
  
      
      </tr>`;

  for (i = 0; i < user_records.length; i++) {
    // console.log(user_records);
    if (dataid == user_records[i].uid) {
      console.log(user_records[i]);
      drawTable += `   
              <tr class="tabledata"> 
     
              <td>${user_records[i].productname}</td>
              <td>${user_records[i].employeename}</td>
              <td >${user_records[i].quantityout}</td>
              <td >${user_records[i].department}</td>
              <td> ${user_records[i].date}</td>
           
             
              </td>
      
            
  
                  </tr>`;
    }
  }
  drawTable += `</table>`;
  formcards.innerHTML = drawTable;
  searchresult.innerHTML="Search Result Not Found ";

  // return false;
}

function userinput() {
  let productname, customername, QuantityIN, date, uid, brokenquality;
  productname = document.getElementById("productnameReturn").innerHTML;
  customername = document.getElementById("ReturnName").value;
  QuantityIN = document.getElementById("Returnquantity_in").value;
  date = document.getElementById("returnDate").value;
  ReturnDepartment = document.getElementById("returnDepartmanet").value;
  uid = document.getElementById("productidReturn").innerHTML;
  // fineQuality = document.getElementById("fineproduct").checked;
  brokenquality = document.getElementById("brokenproduct").checked;
  uid = document.getElementById("productid").innerHTML;
  if (date == "") {
    date = new Date().toISOString().slice(0, 10);
    console.log(date);
  } else {
    date = document.getElementById("returnDate").value;
  }

  let userinput = new Array();
  userinput = JSON.parse(localStorage.getItem("ReturnData"))
    ? JSON.parse(localStorage.getItem("ReturnData"))
    : [];

  userinput.push({
    ProductName: productname,
    CustomerName: customername,
    QuantityIN: QuantityIN,
    datealloted: date,
    ReturnDepartment: ReturnDepartment,
    // fineQuality: fineQuality,
    brokenquality: brokenquality,
    uid: uid,
  });
  alert("REturn table ADDED Successfully");
  localStorage.setItem("ReturnData", JSON.stringify(userinput));
}

// function returnandupdate() {
//   const item = {
//     stock: (
//       parseInt(Detail_product.stock) +
//       parseInt(document.getElementById("Returnquantity_in").value.trim())
//     ).toString(),
//   };

//   fetch(url + newuid, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//     body: JSON.stringify(item),
//   })
//     .then((response) => response.json())

//     .then((response) => {});
//   userinput();
//   return false;
// }

// function showReturnData() {
//   dataid = JSON.parse(localStorage.getItem("ID"))
//     ? JSON.parse(localStorage.getItem("ID"))
//     : [];
//   console.log(dataid);
//   var formcards = document.getElementById("ShowReturnUsers");
//   var drawTable2 = "";
//   // formcardsReturn.innerHTML = " ";

//   // = document.getElementById("showUsers").innerHTML="";
//   user_records = new Array();
//   user_records = JSON.parse(localStorage.getItem("ReturnData"))
//     ? JSON.parse(localStorage.getItem("ReturnData"))
//     : [];
//   // console.log(user_records[0].uid)

//   var drawTable2 = "";

//   drawTable2 = `
//   <table class="table ">
//   <tr>

//   <th> Product Name</th>
//   <th>Employee Name </th>
//   <th>Quantity IN </th>
//   <th>Department  </th>
//   <th>Action </th>
//   <th>broken Product </th>

//     </tr>`;
//     if (user_records) {
//         for (let i = 0; i < user_records.length; i++) {
//         if(dataid==user_records[i].uid){
//           drawTable2 += `
//           <tr class="tabledata">

//           <td>${user_records[i].ProductName}</td>
//           <td>${user_records[i].CustomerName}</td>
//                 <td>${user_records[i].QuantityIN}</td>
//                 <td>${user_records[i].ReturnDepartment}</td>
//                 <td>${user_records[i].fineQuality}</td>
//                 <td>${user_records[i].brokenquality}</td>

//                 </td>

//                 </tr>`;
//             }

//     }
//   }
//   //   document.getElementById('showUsers').innerHTML=drawTable;
//   drawTable2 += `</table>`;
//   formcards.innerHTML = drawTable2;
//   return false;

// };

function showReturnData() {
  dataid = JSON.parse(localStorage.getItem("ID"))
    ? JSON.parse(localStorage.getItem("ID"))
    : [];
  console.log(dataid);
  var Returndata = document.getElementById("ShowReturnUsers");
  // console.log(Returndata)
  var drawTable = "";
  Returndata.innerHTML = " ";

  // = document.getElementById("showUsers").innerHTML="";
  user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("ReturnData"))
    ? JSON.parse(localStorage.getItem("ReturnData"))
    : [];
  // console.log(user_records[0].uid)

  var drawTable = "";

  drawTable = `
<table class="tableout " id="returnTable">
<tr>

<th> Product Name</th>
<th>Employee Name </th>
<th>Stock IN  </th>  
<th>Department  </th>  
<th>Date </th>

<th>Action </th>

    
    </tr>`;
  if (user_records) {
    for (let i = 0; i < user_records.length; i++) {
      if (dataid == user_records[i].uid) {
        // console.log(user_records)
        drawTable += `   
         <tr class="tabledata"> 
              
   
            <td >  ${user_records[i].ProductName}</td>
           <td>${user_records[i].CustomerName}</td>
            <td>${user_records[i].QuantityIN}</td>
            <td>${user_records[i].ReturnDepartment}</td>
            <td>${user_records[i].datealloted}</td>
            <td style=color:${
              user_records[i].brokenquality ? "red" : "green"
            }>${user_records[i].brokenquality ? "BROKEN" : "FINE"}</td>
    
            </td>
            
            
            
            </tr>`;
      }
    }
    drawTable += `</table>`;
    Returndata.innerHTML = drawTable;
    return false;
  }
}

showReturnData();
product_detail();

// table to csv?
// Quick and simple export target #table_id into a csv
function download_table_as_csv(table_id, separator = ",") {
  // Select rows from table_id
  var rows = document.querySelectorAll("table#" + table_id + " tr");
  // Construct csv
  var csv = [];
  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length; j++) {
      // Clean innertext to remove multiple spaces and jumpline (break csv)
      var data = cols[j].innerText
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/(\s\s)/gm, " ");
      // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
      data = data.replace(/"/g, '""');
      // Push escaped string
      row.push('"' + data + '"');
    }
    csv.push(row.join(separator));
  }
  var csv_string = csv.join("\n");
  // Download it
  var filename =
    "export_" + table_id + "_" + new Date().toLocaleDateString() + ".csv";
  var link = document.createElement("a");
  link.style.display = "none";
  link.setAttribute("target", "_blank");
  link.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURIComponent(csv_string)
  );
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function OUt_table_CSV(table_id, separator = ",") {
  // Select rows from table_id
  var rows = document.querySelectorAll("table#" + table_id + " tr");
  // Construct csv
  var csv = [];
  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length; j++) {
      // Clean innertext to remove multiple spaces and jumpline (break csv)
      var data = cols[j].innerText
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/(\s\s)/gm, " ");
      // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
      data = data.replace(/"/g, '""');
      // Push escaped string
      row.push('"' + data + '"');
    }
    csv.push(row.join(separator));
  }
  var csv_string = csv.join("\n");
  // Download it
  var filename =
    "export_" + table_id + "_" + new Date().toLocaleDateString() + ".csv";
  var link = document.createElement("a");
  link.style.display = "none";
  link.setAttribute("target", "_blank");
  link.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURIComponent(csv_string)
  );
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // confirm("Click ok to Download ");
}
function Logout() {


  if (confirm('Are Your Sure Logout?')) {
      window.location.href = "login.html"
      localStorage.removeItem('name')
      localStorage.removeItem('email')
  }
else{
  window.location.href="productDetail.html"
}
}
