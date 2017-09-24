var charOptions = {
    firstName: "",
    lastName: "",
    gender: null,
    shapeFirstID: 0,
    shapeSecondID: 0,
    shapeThirdID: 0,
    skinFirstID: 0,
    skinSecondID: 0,
    skinThirdID: 0,
    shapeMix: 0,
    skinMix: 0,
    thirdMix: 0,
    isParent: false,
    hair: 0,
    beard: 0,
    hairColour: 0,
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
                charOptions[$(this).attr("data-option")] = ui.value;
                updateFace();
            }
        });
    })

    function updateFace() {
        console.log(charOptions);

        mp.trigger("setHeadBlendData", charOptions.shapeFirstID, charOptions.shapeSecondID, charOptions.shapeThirdID, charOptions.skinFirstID, charOptions.skinSecondID, charOptions.skinThirdID, charOptions.shapeMix, charOptions.skinMix, charOptions.thirdMix, charOptions.isParent);
        mp.trigger("setHeadOverlay", 1, charOptions.beard, 255);
        mp.trigger("setHairColor", 2, charOptions.hairColour, charOptions.hairColour);
        mp.trigger("setClothes", 2, charOptions.hair, 0, 0);
        mp.trigger("setHeadOverlayColor", 1, charOptions.hairColour, charOptions.hairColour, charOptions.hairColour);
    }

    $("#input-charcreate-first, #input-charcreate-last").keyup( function() {
        checkCreateCharacter();
    });

    $(".btn-gender").click( function() {
        charOptions.gender = parseInt($(this).attr("data-value"));
        checkCreateCharacter();
        let genderModel = (charOptions.gender == 1) ? model.female : model.male;
        mp.trigger("setModel", genderModel);
        updateFace();
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
        $("#charcreate").fadeOut();
        $("#charselect").fadeIn();
    })
})