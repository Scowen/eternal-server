var charOptions = {
    firstName: "",
    lastName: "",
    gender: null,
    shapeFirstID: 0,
    shapeSecondID: 0,
    skinFirstID: 0,
    hair: 0,
    hairColour: 0,
    beard: 0,
    beardColour: 0,
    torso: 0,
    legs: 0,
    foot: 0,
    jacket: 0,
    jacketTexture: 0,
    undershirt: 0,
}

var model = {
    male: 1885233650,
    female: -1667301416,
}

var characterCreateDisabled = false;

function checkCreateCharacter() {
    charOptions.firstname = $("#input-charcreate-first").val();
    charOptions.lastname = $("#input-charcreate-last").val();

    if (charOptions.firstname.length >= 3 && charOptions.lastname.length >= 3 && charOptions.gender != null)
        $("#charcreate-submit").removeClass("btn-simple").removeClass("disabled");
    else
        $("#charcreate-submit").addClass("btn-simple").addClass("disabled");
}

function updateCharacterPreview(options) {
    if (options == null) options = charOptions;

    // Set the head data.
    mp.trigger("setHeadBlendData", options.shapeFirstID, options.shapeSecondID, 0, options.skinFirstID, 0, 0, 0, 0, 0, false);
    // Beard and colour.
    mp.trigger("setHeadOverlay", 1, options.beard, 255);
    mp.trigger("setHeadOverlayColor", 1, options.beardColour, options.beardColour, options.beardColour);
    // Hair and colour.
    mp.trigger("setHairColor", options.hairColour, options.hairColour);
    mp.trigger("setComponentVariation", 2, options.hair, 0, 0);

    // Clothes.
    let top = (options.gender == 1) ? femaleTops[options.jacket] : maleTops[options.jacket];
    mp.trigger("setComponentVariation", 3, top, 0, 0);
    mp.trigger("setComponentVariation", 4, options.legs, 0, 0);
    mp.trigger("setComponentVariation", 6, options.foot, 0, 0);
    mp.trigger("setComponentVariation", 11, options.jacket, options.jacketTexture, 0);
    mp.trigger("setComponentVariation", 8, options.undershirt, 0, 0);
}

function characterSelectedResult(result, reason) {
    if (result === false) {
        $("#charcreate-result").text(reason).slideDown();
    } else { 
        $("#charcreate").fadeOut(400);
    }
    $("#charcreate-submit").text("Create Character").removeClass("disabled");
    characterCreateDisabled = false;
}

$(document).ready(function() {
    $(".ui-slider").each( function(index, value) {
        var min = $(value).attr("data-min");
        var max = $(value).attr("data-max");
        $(value).slider({
            value: 0,
            min: parseInt(min),
            max: parseInt(max),
            step: 1,
            slide: function(event, ui) {
                charOptions[$(this).attr("data-option")] = ui.value;
                updateCharacterPreview(charOptions);
            }
        });
    })

    $("#input-charcreate-first, #input-charcreate-last").keyup( function() {
        checkCreateCharacter();
    });

    $(".btn-gender").click( function() {
        charOptions.gender = parseInt($(this).attr("data-value"));
        checkCreateCharacter(charOptions);
        let genderModel = (charOptions.gender == 1) ? model.female : model.male;
        mp.trigger("setModel", genderModel);
        updateCharacterPreview(charOptions);
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

    $("#charcreate-submit").click( function() {
        if (characterCreateDisabled) return;

        if (charOptions.firstname.length < 3 || charOptions.lastname.length < 3 || charOptions.gender == null)
            return;
        $("#charcreate-submit").text("Creating Character").addClass("disabled");

        mp.trigger("cefData", "createCharacter", JSON.stringify(charOptions));
    })
})