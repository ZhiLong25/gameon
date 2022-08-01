$(document).ready(function () {
    const currentUser = window.localStorage.getItem("currentUser")
    const getUserProfilePic = window.localStorage.getItem(currentUser + "profilePic")

    if (getUserProfilePic != null) {
        $("#user-icon").attr("src", getUserProfilePic)
    }




    $("#editPhoto").click(function (e) { 
        $('#profilePic').click();
    });


    $("#profilePic").change(function (e) { 
        const newPic = document.getElementById('profilePic').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            $("#user-icon").attr("src", reader.result)
            localStorage.setItem(currentUser + 'profilePic', reader.result);
        }, false);
        
        reader.readAsDataURL(newPic);
    });
});