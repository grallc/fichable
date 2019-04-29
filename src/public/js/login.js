(function () {

    const config = {
        apiKey: "AIzaSyBvPlLMs4diePZNleDq4LgM-8fMUazrgnI",
        authDomain: "fichable-dev.firebaseapp.com",
        databaseURL: "https://fichable-dev.firebaseio.com",
        projectId: "fichable-dev",
        storageBucket: "fichable-dev.appspot.com",
        messagingSenderId: "327394286391"
    };
    firebase.initializeApp(config);

    const btnNavbarProfile = document.getElementById('navbarProfile');
    btnNavbarProfile.addEventListener('click', e => {
        console.log('debug');
    });

    const loginUser = document.getElementById('loginUser');
    const loginPassword = document.getElementById('loginPassword');
    const btnLogin = document.getElementById('btnLogin');

    btnLogin.addEventListener('click', e => {
        const email = loginUser.value;
        const password = loginPassword.value;
        const auth = firebase.auth();

        auth.signInWithEmailAndPassword(email, password).catch(e => {
            console.log(e.message);
        });
    });

    const registerEmail = document.getElementById('registerEmail');
    const registerPassword = document.getElementById('registerPassword');
    const registerConfirmPassword = document.getElementById('registerConfirmPassword');
    const btnRegister = document.getElementById('btnRegister');

    btnRegister.addEventListener('click', e => {
        const email = registerEmail.value;
        const password = registerPassword.value;
        const auth = firebase.auth();

        auth.createUserWithEmailAndPassword(email, password).catch(e => {
            console.log(e.message);
        });
    });

    // Test
    // firebase.auth().onAuthStateChanged(firebaseUser => {
    //     if (firebaseUser) {
    //         var newPostKey = firebase.database().ref().child('fiches').push().key;
    //         const post = {
    //             userId: firebaseUser.uid,
    //             content: 'dzedzedz's
    //         }
        
    //         firebase.database().ref('/fiches/' + newPostKey).set(post);
        
    //     }
    // })
}());