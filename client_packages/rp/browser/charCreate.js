var gender = null;

function checkCreateCharacter() {
    var firstname = $("#input-charcreate-first").val();
    var lastname = $("#input-charcreate-last").val();

    if (firstname.length >= 3 && lastname.length >= 3 && gender != null)
        $("#charcreate-submit").removeClass("btn-simple").removeClass("disabled");
    else
        $("#charcreate-submit").addClass("btn-simple").addClass("disabled");
}

$(function() {
    $("#input-charcreate-first, #input-charcreate-last").keyup( function() {
        checkCreateCharacter();
    });

    $(".btn-gender").click( function() {
        gender = $(this).attr("data-value");
        checkCreateCharacter();
        $(".btn-gender").addClass("btn-simple");
        $(this).removeClass("btn-simple");
    })

    $(".charcreate-tab-select").click( function () {
        var zoom = $(this).attr("data-zoom");
        if (zoom == "body") {
            mp.trigger("BodyCam");
        } 
        if (zoom == "face") {
            mp.trigger("FaceCam");
        }
    })

    $("#charcreate-cancel").click( function() {
        mp.trigger("BodyCam");
        $("#charcreate").fadeOut(400, function() {
            $("#charselect").fadeIn();
        });
    })
})