var selectedCharacter = null;

function loadCharacters(charString) {
    $("#charselect").fadeIn(400);

    // var charString = JSON.stringify({1: {name: "Luke_Lost"}, 2: {name: "John_Doe"}});
    let chars = charString;

    var tbody = $("#tbody-characters");

    for (var i in chars) {
        char = chars[i];
        let string = "<tr>" +
            `<td>${char.identifier}</td>` +
            `<td>${char.name}</td>` + 
            "<td>$" + char.money + "</td>" + 
            `<td><a href="#" class="btn btn-simple btn-primary select-character" style="cursor:pointer" data-id="${char.identifier}">Select<div class="ripple-container"></div></a></td>` +
            "</tr>";

        $(tbody).append(string);
    }

    $(".select-character").click( function() {
        selectedCharacter = $(this).attr("data-id");

        $(".select-character").addClass("btn-simple").text("Select");
        $(this).removeClass("btn-simple").text("selected");

        $("#charselect-submit").removeClass("btn-simple").removeClass("disabled");
    });

    $("#charselect-submit").click( function() {
        if (selectedCharacter == null || selectedCharacter == undefined)
            return;

        mp.trigger('cefData', 'character', selectedCharacter);
    })
}