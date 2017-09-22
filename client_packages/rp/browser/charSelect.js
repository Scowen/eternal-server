var selectedCharacter = null;
var characterSubmitDisabled = false;

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
            `<td><a href="#" class="btn btn-simple btn-info select-character" style="cursor:pointer" data-id="${char.identifier}">Select<div class="ripple-container"></div></a></td>` +
            "</tr>";

        $(tbody).append(string);
    }

    $(".select-character").click( function() {
        selectedCharacter = $(this).attr("data-id");

        $(".select-character").addClass("btn-simple").text("Select");
        $(this).removeClass("btn-simple").text("selected");
        $("#charselect-result").slideUp();


        $("#charselect-submit").removeClass("btn-simple").removeClass("disabled");
    });

    $("#charselect-submit").click( function() {
        if (selectedCharacter == null || selectedCharacter == "undefined" || characterSubmitDisabled)
            return;

        $("#charselect-submit").text("Entering Los Santos").addClass("disabled");

        mp.trigger('cefData', 'character', selectedCharacter);
    })
}

function characterSelectedResult(result, reason) {
    if (result === false) {
        $("#charselect-result").text(reason).slideDown();
    } else { 
        $("#charselect").fadeOut(400);
    }
    $("#charselect-submit").text("Enter Los Santos").removeClass("disabled");
    characterSubmitDisabled = false;
}

$("#charselect-charcreate").click( function() {
    $("#charselect").fadeOut(400, function() {
        $("#charcreate").fadeIn();
    });
})