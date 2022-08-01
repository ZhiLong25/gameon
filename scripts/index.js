
// REGISTER / LOGIN
function register() {

    var fName = document.getElementById("firstName").value;
    var lName = document.getElementById("lastName").value;
    
    var uName = document.getElementById("regUser").value;
    var pWord = document.getElementById("regPass").value;
    var email = document.getElementById("regEmail").value;

    var RegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (fName == "" || lName == "" || uName == "" || pWord == "" || email == "") {
        document.getElementById("regError").innerText = "* Please fill up all fields";
        setTimeout(regError, 2000);
    }
    else {
        if (!RegEx.test(email)) {
            document.getElementById("regError").innerText = "* Email must be valid";
            setTimeout(regError, 2000);
        }
        else {
            if (localStorage.getItem("userkey") === null) {
                var regArr = [];
        
                var reg = {"FirstName" : fName, "LastName" : lName, "Username": uName, "Password" : pWord, "Email" : email};
                regArr.push(reg);
                localStorage.setItem('userkey', JSON.stringify(regArr));
    
                alert("Account registered");
        
            }
            else {
                // CHECK IF USERNAME EXISTS
                var pass;
                let data = JSON.parse(localStorage.getItem('userkey'));
                var username = document.getElementById("regUser").value;
    
    
                for (var j=0; j<data.length; j++) {
                    if (username == data[j]["Username"]) {
    
                        pass = false
                        break;
                    }
                    else {
                        pass = true
                    }
                }
    
                if (pass == true) {
                    let regArr2 = JSON.parse(localStorage.getItem('userkey'));
        
                    var reg = {"FirstName" : fName, "LastName" : lName, "Username": uName, "Password" : pWord, "Email" : email};
                    regArr2.push(reg);
                    localStorage.setItem('userkey', JSON.stringify(regArr2));
                    alert("Account registered");
                }
                else {
                    alert("Username already Exists!");
                }
            }
        }


    }


}

function toLogin() {
    window.location.replace("Login.html")
}


function logError() {
    document.getElementById("logError").innerText = "";
}
function regError() {
    document.getElementById("regError").innerText = "";
}

function resetError() { 
    document.getElementById("resetErr").innerText = "";
}


function login() {

    localStorage.removeItem('currentUser');
    localStorage.removeItem('Fname');
    localStorage.removeItem('Lname');

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    let data = JSON.parse(localStorage.getItem('userkey'));

    // VALIDATE FIELDS
    if (username == "" || password == "") {

        document.getElementById("logError").innerText = "* Please fill up all fields";
        setTimeout(logError, 2000);

    }
    else {
        if (data == null) {
            document.getElementById("logError").innerText = "* Username does not exist";
            setTimeout(logError, 2000);
        }
        else {
            var contains;
            var valid;
            // CHECK STORAGE FOR USER
            for (var i=0; i<data.length; i++) {
                if (username == data[i]["Username"] && password == data[i]["Password"]) {
                    window.location.replace("User.html");
    
                    localStorage.setItem('currentUser', data[i]["Username"]);
                    localStorage.setItem('Fname' , data[i]["FirstName"]);
                    localStorage.setItem('Lname' , data[i]["LastName"]);
                    localStorage.setItem('Email', data[i]["Email"]);
    
                    // SHOW CURRENT USER
                    document.getElementById("current-user").style.display = "block";
                    contains = true;
                    valid = true;
    
                    break;
    
                }
                else {
                    contains = false;
                    valid = false;
                }
            }
    
            if (contains != true) {
                document.getElementById("logError").innerText = "* Username does not exist"; 
                setTimeout(logError, 2000);
            }
            
            if (valid != true) {
                 document.getElementById("logError").innerText = "* Wrong Username or Password"; 
                setTimeout(logError, 2000);
            }
        }
                
    }
}


function reset() { 
    var email = document.getElementById("reset-email").value;
    var username = document.getElementById("reset-user").value;
    var new_pass = document.getElementById("new-pass").value;
    var contains;
    var exist;

    let data = JSON.parse(localStorage.getItem('userkey'));

    if (data == null) {
        alert("Storage is empty");
    }
    else {
        for (var i=0; i<data.length; i++) {
            if (username == data[i]["Username"] && email == data[i]["Email"]) {
                data[i]["Password"] = new_pass;
    
                localStorage.setItem('userkey', JSON.stringify(data));
                alert("Password has been reset");
                contains = true
                break;
            }
            else {
                contains = false;
            }
            

        }

        // CHECK IF USERNAME EXISTS IN STORAGE
        for (var i=0; i<data.length; i++) {
            if (username == data[i]["Username"]) {
                exist = true;
                break;
            }
            else {
                exist = false;
            }
        }

        if (contains != true) {
            document.getElementById("resetErr").innerText = "* Email and Password do not match"; 
            setTimeout(resetError, 2000);
        }
        
        if (exist != true) {
            document.getElementById("resetErr").innerText = "* Username does not exist"; 
            setTimeout(resetError, 2000);
        }

    }
}


function user() {
    if (localStorage.getItem('currentUser') == null) {
        // DENY URL CHANGE ON USER PAGE
        alert("Please login to an account");
        window.location.replace("index.html");
    }
    else {

        var fName = localStorage.getItem('Fname');
        var lName = localStorage.getItem('Lname');
        document.getElementById("full-name").innerText = fName + " " + lName;
    }
}

function change() {
    document.querySelector("#user-change").style.display = "block";

    let data = JSON.parse(localStorage.getItem('userkey'));
    // CHANGE USER DETAILS
    console.log(data);
    var uName = localStorage.getItem('currentUser');

    for (var i=0; i<data.length; i++) {
        if (data[i]["Username"] == uName) {
            document.getElementById("user-fname").value = data[i]["FirstName"];
            document.getElementById("user-lname").value = data[i]["LastName"];
            document.getElementById("user-uname").value = data[i]["Username"];

            break;
        }
    }


}

function save() {
    document.querySelector("#user-change").style.display = "none";

    var uName = document.getElementById("user-uname").value; 
    // GET USER DICTIONARY INDEX
    let data = JSON.parse(localStorage.getItem('userkey'));
    console.log(data);
    for (var i=0; i<data.length; i++) {
        // CHECK DICTIONARY WHERE USERNAME IS uName

        if (data[i]["Username"] == uName) {
            
            var new_fName = document.getElementById("user-fname").value;
            var new_lName = document.getElementById("user-lname").value;
            
            data[i]["FirstName"] = new_fName;
            data[i]["LastName"] = new_lName;

            // SET DICTIONARY INDEX USERNAME WITH NEW DETAILS
            localStorage.setItem('userkey', JSON.stringify(data));
            localStorage.setItem('Fname', document.getElementById("user-fname").value);
            localStorage.setItem('Lname', document.getElementById("user-lname").value);

            alert("Details Saved");
            break;
        }
    }

    document.getElementById("full-name").innerText = new_fName + " " + new_lName;
}



function favourite() {

    if (window.localStorage.getItem("currentUser") == undefined) {
        // Please login to save game
        alert("Please Login to add to favourites");
    }
    else {

        const currentUser = window.localStorage.getItem("currentUser");

        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var gameID = urlParams.get('id');


        // CURRENT GAME PAGE ID
        var currentGame =  gameID;


        if (localStorage.getItem(currentUser + " favourite") === null) {

            var favourited = [];
            favourited.push(currentGame);
            localStorage.setItem(currentUser + " favourite" , JSON.stringify(favourited)); 

            alert("Game Saved");
        }
        else {


            var stored = JSON.parse(localStorage.getItem(currentUser + " favourite"));
            // IF ALREADY FAVOURITED

                if (stored.includes(currentGame)) {

                    alert("This game is already in your favourites");

                }
                else {
                    stored.push(currentGame);
                    localStorage.setItem(currentUser + " favourite", JSON.stringify(stored));
                    alert("Game Saved");
                }
            }

        }


    }

function goback() {
    document.getElementById("profile-favourite").style.display = "none";
    document.getElementById("profile-content").style.display = "block";
}


function removeFav(gameID) {
    var current = localStorage.getItem('currentUser')
    var favList = JSON.parse(localStorage.getItem(current + ' favourite'));    // GET FAVLIST

    let index = favList.indexOf(gameID.toString()); 
    favList.splice(index, 1); // REMOVE AT INDEX

        
    localStorage.removeItem(current + ' favourite');
    localStorage.setItem(current + ' favourite', JSON.stringify(favList));
    // UPDATE LOCALSTORAGE
    alert("Game has been removed");
    location.reload();
}


$(document).ready(function () {


if (localStorage.getItem('currentUser') != null ) {
    document.getElementById("current-user").innerText = "Welcome " + localStorage.getItem('currentUser') + "!";
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline";
    document.getElementById("account").style.display = "inline";
    document.getElementById("Faccount").style.display = "inline";
}
else {
    document.getElementById("current-user").style.display = "none";
    document.getElementById("account").style.display = "none";
    document.getElementById("Faccount").style.display = "none";
    
}

$("#logout-btn").click(function() {

    localStorage.removeItem('currentUser');
    $("#logout-btn").css("display", "none");
    $("#current-user").html("");
    $("#login-btn").css("display", "inline");

    window.location.replace("index.html");
})


$("#favourites").click(function () { 
    var currentUser = window.localStorage.getItem("currentUser");
    var favContent = JSON.parse(localStorage.getItem(currentUser + " favourite"));
    
    if (favContent == null || favContent.length == 0) {
        alert("You have no favourited content");
    }
    else {
        $("#profile-favourite").css("display", "block");
        $("#profile-content").css("display", "none");
     
     
         // Display favourited content
     
         $("#profile-favourite").html("");
     
         for (var i=0; i < favContent.length; i++) {
             $.ajax({
                 url: "https://api.rawg.io/api/games/" + favContent[i] + "?key=e382173a425b4fc5b302fab9e1dcf119",
                 type: 'get',
                 dataType: 'JSON',
                 success: function (output) {
                     const gameName = output.name;
                     const backgroundImage = output.background_image;
                     const gameID = output.id;


                     $("#profile-favourite").append(`
                     <div class="singleGame2">
                         <img src="${backgroundImage}">
                         <label class='gameTitle'>${gameName}</label>
                         <button class="removeFav" onclick="removeFav(${gameID})">Unfavourite</button>
                     </div>
                     
                     `)
                     
                 }
             })
         }
         $("#profile-favourite").append(`<button onclick="goback()" id="goback">Go back</button>`)
    }

    });

})


