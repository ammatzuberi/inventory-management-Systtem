window.location.href="login.html"

let userName=localStorage.getItem('name')?localStorage.getItem('name'):''
console.log(userName);
if(userName!='')
{
  alert('Already Login ');
  window.location.href="product.html";
}