$(document).ready(function () {

    // GET URL GAME ID
    const url =  new URL(window.location.href);
    var search_params = new URLSearchParams(url.search);
     
    console.log(search_params.has('id'))
    if (search_params.has('id') == false) {
           window.location = './search.html';
    }
    const queryString = window.location.search;
    
    const urlParams = new URLSearchParams(queryString);
    const gameID = urlParams.get('id')
    
    // API CALL
    $.ajax({
        url: "https://api.rawg.io/api/games/" + gameID + "?key=e382173a425b4fc5b302fab9e1dcf119",
        type: 'get',
        dataType: 'JSON',
        success: function (output) {
            console.log(output)
            const gameName = output.name;
            const gameDescription = output.description;
            const backgroundImage = output.background_image;
            const releaseDate = output.released;
            const website = output.website;

            $("#gameName").html(gameName);
            $("#gameDescription").html(gameDescription)
            $("#gameImage").css("background-image", "url(" + backgroundImage + ")")
            $("#gameReleaseDate").html(releaseDate)
            $("#websiteBtn").attr("link", website)
        },
        error: function() { 
            alert("No game found");

            window.location = "./Search.html";

        }
    })

    $.ajax({
        url: "https://api.rawg.io/api/games/" + gameID + "/screenshots?key=e382173a425b4fc5b302fab9e1dcf119",
        type: 'get',
        dataType: 'JSON',
        success: function (output) {
            console.log(output)

            const numOfRow = output.results.length;
            console.log(numOfRow)

            for (var i = 0; i < numOfRow; i++) {
                const image = output.results[i].image
                $(".screenshotSection .imageOutput").append("<img src=" + image + ">")
            }
        }
    })

    // NAVIGATION BUTTONS

    $("#websiteBtn").click(function () { 
        const websiteLink = $(this).attr("link")
        window.open(websiteLink)
    });


    $("#nextBtn").click(function () { 
        window.location = "./Games.html?id=" + (parseInt(gameID) + 1) 
        
    });


    $("#previousBtn").click(function () { 
        window.location = "./Games.html?id=" + (parseInt(gameID) - 1) 

    });
});
