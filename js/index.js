var db = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $('#loginModal').modal('hide');
        $('#createModal').modal('hide');

        var uid = user.uid;
        console.log(uid);
        document.getElementById("btLogin").style.display = "none";
        document.getElementById("btCreateAcc").style.display = "none";
        document.getElementById("userIsLoged").style.display = "block";
        document.getElementById("btSignOut").style.display = "block";
        db.ref('users/' + uid).once('value').then(function(snapshot) {
            document.getElementById("userIsLoged").innerHTML = snapshot.child('username').val();
        })
    } else {
        // No user is signed in.
    }
    document.getElementById("inputMailLI").value = "";
    document.getElementById("inputPasswordLI").value = "";

    document.getElementById("inputMailNU").value = "";
    document.getElementById("inputPasswordNU").value = "";
    document.getElementById("inputRePasswordNU").value = "";
    document.getElementById("inputName").value = "";
    document.getElementById("inputLFName").value = "";
    document.getElementById("inputLMName").value = "";
});


function search() {
    //Búsqueda de empresa

}

function submitContactPetition() {
    let nombreCon = document.getElementById('conName').value;
    let emailCon  = document.getElementById('conMail').value;
    let asunto    = document.getElementById('conAsunto').value;
    let messCon   = document.getElementById('conMess').value;
    var contact = db.ref('contactRequest');
    contact.once('value').then(function (snapshot) {
        contact.child(snapshot.numChild()).set({
            nombre: nombreCon,
            email: emailCon,
            asunto: asunto,
            mensaje: messCon
        });
    });
    $('#contactUs').modal('hide');
}

function updateNews(){
    db.ref('news').once('value').then(function (snapshot) {
        console.log(snapshot.child('0').child('titulo').val());
        document.getElementById('noti1img').src = snapshot.child('0').child('imgUrl').val();
        document.getElementById('noti1Title').innerHTML = snapshot.child('0').child('titulo').val();
        document.getElementById('cardNoti1img').src = document.getElementById('noti1img').src;
        document.getElementById('cardNoti1Title').innerHTML = snapshot.child('0').child('titulo').val();
        document.getElementById('cardNoti1Body').innerHTML = snapshot.child('0').child('cuerpo').val();

        document.getElementById('noti2img').src = snapshot.child('1').child('imgUrl').val();
        document.getElementById('noti2Title').innerHTML = snapshot.child('1').child('titulo').val();
        document.getElementById('cardNoti2img').src = document.getElementById('noti2img').src;
        document.getElementById('cardNoti2Title').innerHTML = snapshot.child('1').child('titulo').val();
        document.getElementById('cardNoti2Body').innerHTML = snapshot.child('1').child('cuerpo').val();

        document.getElementById('noti3img').src = snapshot.child('2').child('imgUrl').val();
        document.getElementById('noti3Title').innerHTML = snapshot.child('2').child('titulo').val();
        document.getElementById('cardNoti3img').src = document.getElementById('noti3img').src;
        document.getElementById('cardNoti3Title').innerHTML = snapshot.child('2').child('titulo').val();
        document.getElementById('cardNoti3Body').innerHTML = snapshot.child('2').child('cuerpo').val();

        document.getElementById('noti4img').src = snapshot.child('3').child('imgUrl').val();
        document.getElementById('noti4Title').innerHTML = snapshot.child('3').child('titulo').val();
        document.getElementById('cardNoti4img').src = document.getElementById('noti4img').src;
        document.getElementById('cardNoti4Title').innerHTML = snapshot.child('3').child('titulo').val();
        document.getElementById('cardNoti4Body').innerHTML = snapshot.child('3').child('cuerpo').val();
    })
}


function signout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("saliste bien :D");
        document.getElementById("btLogin").style.display = "block";
        document.getElementById("btCreateAcc").style.display = "block";
        document.getElementById("userIsLoged").style.display = "none";
        document.getElementById("btSignOut").style.display = "none";
    }).catch(function(error) {
        // An error happened.
    });
}

function login() {
    let email = document.getElementById("inputMailLI").value;
    let password = document.getElementById("inputPasswordLI").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function createNewUser() {
    let email = document.getElementById("inputMailNU").value;
    let password = document.getElementById("inputPasswordNU").value;
    let name = document.getElementById("inputName").value;
    let Fname = document.getElementById("inputLFName").value;
    let Mname = document.getElementById("inputLMName").value;
    let rePassword = document.getElementById("inputRePasswordNU").value;
    if (password == rePassword) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            db.ref('users/' + firebase.auth().currentUser.uid).set({
                username: name,
                email: email,
                lastNPat: Fname,
                lastNMat: Mname
            }, function(error) {
                if (error) {
                    console.log('fallo :C');
                } else {
                    console.log('exito c:');
                }
            });
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            console.log(errorCode);
            // ...
        });
    } else {
        document.getElementById("inputPassword").style.borderColor = "#ff0300";
        document.getElementById("inputRePassword").style.borderColor = "#ff0300";
    }
}