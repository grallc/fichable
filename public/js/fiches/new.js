console.log('1234')


function submitFiche() {
    document.getElementById("#createFicheForm").addEventListener("submit", function(e){
        console.log('1235')
        alert("Hello! I am an alert box!!");
        if(!isValid){
            e.preventDefault();    //stop form from submitting
        }
    })
}
