var activeForm = "loginform";
var loginSubmitDisabled = false;
var cursor = true;
mp.invoke('focus', true);

function login() {
    if (loginSubmitDisabled) return;

    var username = $("#loginform-username").val();
    var password = $("#loginform-password").val();
    $("#loginform-submit").text("Signing In...").addClass("disabled");
    mp.trigger('cefData', 'login', username, password);

    loginSubmitDisabled = true;
}

function loginResult(result, reason) {
    if (result === false) {
        $("#loginform-result").text(reason).slideDown();
        $("#loginform-submit").text("Sign In").removeClass("disabled");
    } else { 
        charSelectCamera();
    }
    loginSubmitDisabled = false;
}

function charSelectCamera() {

}

$("#loginform-username, #loginform-password").keyup( function () {
    $("#loginform-result").slideUp();
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
