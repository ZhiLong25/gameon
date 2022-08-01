$(document).ready(function () {
    
    $.ajax({
        url: "https://api.rawg.io/api/games?key=e382173a425b4fc5b302fab9e1dcf119&page_size=20&search=" + "Counter Strike", 
        type: 'get', 
        dataType: 'JSON', 
        success: function (output) {
            
            const length = output.results.length;

            for (var i = 0; i < length; i++) {
                const gameID = output.results[i].id;
                const gameName = output.results[i].name;
                const backgroundImage = output.results[i].background_image;

                $("#searchMainContent .output").append(`
                    <div class="singleGame shrink" id=${gameID}>
                        <img src="${backgroundImage}">
                        <label class='gameTitle'>${gameName}</label>
                    </div>
                `)
            }
        }
    })
    
    $("#gameSearchBar").on("keyup keydown change paste", function () {
        const searchValue = $(this).val();

        if (searchValue != "") {
            $.ajax({
                url: "https://api.rawg.io/api/games?key=e382173a425b4fc5b302fab9e1dcf119&page_size=20&search=" + searchValue, 
                type: 'get', 
                dataType: 'JSON', 
                success: function (output) {

                    $("#searchMainContent .output").html("");
                    const length = output.results.length;

                    for (var i = 0; i < length; i++) {
                        const gameID = output.results[i].id;
                        const gameName = output.results[i].name;
                        const backgroundImage = output.results[i].background_image;

                        $("#searchMainContent .output").append(`
                            <div class="singleGame shrink" id=${gameID}>
                                <img src="${backgroundImage}">
                                <label class='gameTitle'>${gameName}</label>
                            </div>
                        `)
                    }
                }
            })
        }

        else {
            $("#searchMainContent .output").html("");

        }
    })



    $(document).on("click", ".singleGame", function () { 
        const gameID = $(this).attr("id");
        window.location = "./Games.html?id=" + gameID;
    });
});
