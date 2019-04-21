(function() {
    var config = {
        apiKey: "AIzaSyBvPlLMs4diePZNleDq4LgM-8fMUazrgnI",
        authDomain: "fichable-dev.firebaseapp.com",
        databaseURL: "https://fichable-dev.firebaseio.com",
        projectId: "fichable-dev",
        storageBucket: "fichable-dev.appspot.com",
        messagingSenderId: "327394286391"
      };
    firebase.initializeApp(config);

    var txtEmail = document.getElementById('txtEmail');
    var txtPassword = document.getElementById('txtPassword');
    var btnLogin = document.getElementById('btnLogin');

    btnLogin.addEventListener('click', e => {
        console.log('caca');
    });


}());
console.log('index.js is working.');
