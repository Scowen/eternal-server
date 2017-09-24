var charOptions = {
    firstName: "",
    lastName: "",
    gender: null,
    shape: 0,
    skin1: 0,
    skin2: 0,
}

var model = {
    male: 1885233650,
    female: -1667301416,
}

function checkCreateCharacter() {
    charOptions.firstname = $("#input-charcreate-first").val();
    charOptions.lastname = $("#input-charcreate-last").val();

    if (charOptions.firstname.length >= 3 && charOptions.lastname.length >= 3 && charOptions.gender != null)
        $("#charcreate-submit").removeClass("btn-simple").removeClass("disabled");
    else
        $("#charcreate-submit").addClass("btn-simple").addClass("disabled");
}


$(document).ready(function() {
    $(".ui-slider").each( function(index, value) {
        console.log(index, value);
        var min = $(value).attr("data-min");
        var max = $(value).attr("data-max");
        $(value).slider({
            value: 0,
            min: parseInt(min),
            max: parseInt(max),
            step: 1,
            slide: function(event, ui) {
                $(this).attr("data-value", ui.value);
                updateFace();
            }
        });
    })

    function updateFace() {
        charOptions.shape = parseInt($("#charcreate-slider-head-shape").attr("data-value"));
        charOptions.skin1 = parseInt($("#charcreate-slider-skin-1").attr("data-value"));
        charOptions.skin2 = parseInt($("#charcreate-slider-skin-2").attr("data-value"));
        console.log(charOptions);
        mp.trigger("updateHeadBlendData", charOptions.shape, charOptions.skin1, charOptions.skin2);
    }

    $("#input-charcreate-first, #input-charcreate-last").keyup( function() {
        checkCreateCharacter();
    });

    $(".btn-gender").click( function() {
        charOptions.gender = $(this).attr("data-value");
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