let userName=localStorage.getItem('name')?localStorage.getItem('name'):''
console.log(userName);
if(userName!='')
{
  alert('Already Login ');
  window.location.href="product.html";
}


function NEWDATA() {

    let name, password, email, Organisation;
    name = document.getElementById("name").value;


    Organisation = document.getElementById("Organisation").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    let users = new Array();
    users = JSON.parse(localStorage.getItem("logindata")) ? JSON.parse(localStorage.getItem("logindata")) : []
    if (users.some((v) => { return v.email == email }
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
