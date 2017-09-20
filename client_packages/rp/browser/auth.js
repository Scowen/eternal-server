var activeForm = "loginform";
var cursor = true;

var loginSubmitDisabled = false;
mp.invoke('focus', true);

function login() {
    if (loginSubmitDisabled) return;

    let username = $("#loginform-username").val();
    let password = $("#loginform-password").val();

    if (username.length < 3 || password.length < 5)
        return;

    $("#loginform-submit").text("Signing In...");
    $(".disable-after-submit").addClass("disabled");
    mp.trigger('cefData', 'login', username, password);

    loginSubmitDisabled = true;
}

function loginResult(result, reason) {
    if (result === false) {
        $("#loginform-result").text(reason).slideDown();
    } else { 
        activeForm = null;
        $("#loginform").fadeOut(400);
    }
    $("#loginform-submit").text("Sign In");
    $(".disable-after-submit").removeClass("disabled");
    loginSubmitDisabled = false;
}

$("#loginform-username, #loginform-password").keyup( function () {
    $("#loginform-result").slideUp();

    let userString = $("#loginform-username").val();
    let passString = $("#loginform-password").val();

    if (userString.length >= 3 && passString.length >= 5)
        $("#loginform-submit").removeClass("btn-simple");
    else
        $("#loginform-submit").addClass("btn-simple");
})

$("#loginform-submit").click( function() {
    login();
})

document.addEventListener('keyup', function(e) {
    if ((e.key === 'Enter' || e.keyCode === 13) && activeForm == "loginform") {
        login();
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
