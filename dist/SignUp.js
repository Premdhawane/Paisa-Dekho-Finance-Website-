const signupform=document.querySelector('#form');
signupform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=document.getElementById('email').value;
    const pass=document.getElementById('password').value;  
    const cpass=document.getElementById('cpassword').value;  
    if(cpass==pass)
    {
        firebase.auth().createUserWithEmailAndPassword(email,pass).then(x=>{
            console.log(x);
            location.replace('login.html');
        })  
    }
    else{
        pass.value=""; cpass.value="";  
        alert('password does not match!');
    }
});
