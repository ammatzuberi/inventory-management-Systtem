// let userName=localStorage.getItem('name')?localStorage.getItem('name'):''
// console.log(userName);
// if(userName!='')
// {
//   alert('Already Login ');
//   window.location.href="product.html";
// }

// const logindata="localhost://localhost//:5000/login/"
// const logindata = "http://localhost:5000/login/";

// var alldata;
// function getlogindata(){

//  fetch(logindata)
//  .then(response=> response.json())
//  .then(response=>{
//     // console.log(response)
//     response.forEach(user => {
//         alldata = [...response];
//         console.log(alldata)
//     });
   
//  })
//  alldata=[...response];

    
// }




function NEWDATA() {
    console.log(alldata)
    const name =document.getElementById("loginname").value;

    const email =document.getElementById("loginemail").value;
    const password= document.getElementById("loginpassword").value;
    let Organisation= document.getElementById("loginOrganisation").value;
    // let namedata= document.getElementById('namedata').value;
// // console.log(namedata)
// // namedata




// const data={

//     // Organisation:Organisationinput.value,
//     name:nameinput,
//     email:emailinput,
//     password:passwordnput,
//     Organisation:Organisationinput,
   


// };
// console.log(data)
// fetch(logindata,{
//     method:"POST",
//     headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//     },
//     body:JSON.stringify(data)

// })
// .then(response=> response.json())
// .then(response=>{
//     console.log(response)
// })




    let users = new Array();
    alldata = JSON.parse(localStorage.getItem("logindata")) ? JSON.parse(localStorage.getItem("logindata")) : []
    if (alldata.some((v) => { return v.email == email }
    )) {
        alert(" User Already Found")


    }
    else {
        users.push({
            "name": name,
            "password": password,
            "email": email,
            "Organisation": Organisation,




        })
        localStorage.setItem("logindata", JSON.stringify(users));
        alert('Data Saved');
        window.location.href = "login.html"

    }


}

// }   



function login() {

    let password, email;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;


    let user_record = new Array();
    user_record = JSON.parse(localStorage.getItem('logindata')) ? JSON.parse(localStorage.getItem('logindata')) : []

    if (user_record.some((v) => { return v.email == email && v.password == password })) {
        alert("login Successfull...")

        let = current_user = user_record.filter((v) => { return v.email == email && password == password })[0]
        localStorage.setItem('name', current_user.name);
        localStorage.setItem('email', current_user.name);
        window.location.href = "product.html"
    }
    else {

        alert("login Fails....")
    }
}
// getlogindata();
