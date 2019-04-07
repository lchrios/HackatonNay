function search() {
    //Búsqueda de empresa

}

function submitContactPetition() {

}

function createNewUser(){
    let email = document.getElementById("inputMail").value;
    let password = document.getElementById("inputPassword").value;
    let rePassword = document.getElementById("inputRePassword").value;
    if (password === rePassword) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    } else {
        document.getElementById("inputPassword").style.borderColor = "#ff0300";
        document.getElementById("inputRePassword").style.borderColor = "#ff0300";
    }
}