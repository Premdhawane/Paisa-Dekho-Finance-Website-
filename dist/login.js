
const form = document.querySelector('#form');
const passwdError = document.querySelector("#passwd-error");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            location.replace('./index.html');
        }else{
            passwdError.innerHTML = "Wrong Password";
        }
    });
});

// const auth = getAuth();

function login(){
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;  
    firebase.auth().signInWithEmailAndPassword(email, password).then((UserCredential)=>{
        var user = UserCredential.user;
    });
}

function forgotPassword(){
    const email = document.querySelector('#email').value; 
    firebase.auth().sendPasswordResetEmail(email).then(()=>{
        alert(`Reset link has been send to ${email}`);
    }); 
}