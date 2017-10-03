var optionsDisabled = false;
var cursor = false;

$(document).ready( function() {
    $(".btn-option").click( function() {
        if (optionsDisabled) return;

        var value = $(this).attr("data-value");
        submitOption($(this), value);
    })

    $(".btn-close-ui-window").click(function() {
        closeAllWindows();
    })
})

function submitOption(element, value) {
    if (optionsDisabled) return;

    optionsDisabled = true;
    $(".btn-option").addClass("disabled");
    $(element).html("Please Wait...");

    mp.trigger("cefData", "option", value);
}

function showOptionsBox(title, subtitle) {
    $("#option-box-title").html(title);
    $("#option-box-subtitle").html(subtitle);
    $("#btn-option-yes").html("Yes (Y)");
    $("#btn-option-no").html("No (N)");
    $(".btn-option").removeClass("disabled");
    optionsDisabled = false;

    cursor = true;
    mp.invoke('focus', true);

    $("#option-box").fadeIn(250, function() {
        $("#option-box-title").fadeIn(750, function() {
            $("#option-box-subtitle").fadeIn(500, function() {
                $("#option-box-buttons").fadeIn(250, function() {
                })
            })
        })
    })
}

function hideOptionsBox() {
    $("#option-box-buttons").fadeOut(250, function() {
        $("#option-box-subtitle").fadeOut(250, function() {
            $("#option-box-title").fadeOut(250, function() {
                $("#option-box").fadeOut(250, function() {
                })
            })
        })
    })

    cursor = false;
    mp.invoke('focus', false);
}

function errorOptionsBox(message) {
    $("#option-box-error").html(message).slideDown().delay(3500)
        .queue( function(next) {
            $("#option-box-error").slideUp();
            next();
        });

    $("#btn-option-yes").html("Yes (Y)");
    $("#btn-option-no").html("No (N)");
    $(".btn-option").removeClass("disabled");
    optionsDisabled = false;
}

function showSubtitleBox(message) {
    $("#subtitle-box-message").html(message);

    $("#subtitle-box").slideDown().delay(5000).queue( function(next) {
        $("#subtitle-box").slideUp();
        next();
    });
}

function closeAllWindows() {
    $(".ui-window").fadeOut();
}

document.addEventListener('keyup', function(e) {
    if ((e.key === 'Y' || e.keyCode === 89) && $("#option-box").is(":visible") && !optionsDisabled) {
        submitOption($("#btn-option-yes"), 1);
    }

    if ((e.key === 'N' || e.keyCode === 78) && $("#option-box").is(":visible") && !optionsDisabled) {
        submitOption($("#btn-option-no"), 0);
    }

    if ((e.key === 'Esc' || e.keyCode === 27)) {
        closeAllWindows();
    }

    if (e.key === 'F2' || e.keyCode === 113) {
        if (cursor) { 
            cursor = false;
            mp.invoke('focus', false);
        } else {
            cursor = true;
            mp.invoke('focus', true);
        }
    }
});