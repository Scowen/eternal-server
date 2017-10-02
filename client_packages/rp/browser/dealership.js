var importableVehicles = [
    {name: "T20", hash: 123456789, className: "Super", cost: "500,000"},
    {name: "Tyrus", className: "Super", cost: "500,000"},
    {name: "GP1", className: "Super", cost: "500,000"},
    {name: "Nero", className: "Super", cost: "500,000"},
    {name: "ItaliGTB", cost: "500,000"},
    {name: "Cyclone", cost: "500,000"},
    {name: "Tempesta", cost: "500,000"},
    {name: "Visone", cost: "500,000"},
];

$(document).ready( function() {
    $("#input-dealership-order-vehicle").keyup( function () {
        var val = $(this).val();
        let resultsElement = $("#dealership-order-vehicle-results");
        let resultsElementTbody = $("#dealership-order-vehicle-results-tbody");
        $(resultsElement).hide();
        $(resultsElementTbody).html("");

        if (val.length <= 0 || val == null || val == "undefined")
            return;

        var search = new RegExp(val, "i");
        var arr = jQuery.grep(importableVehicles, function (value) {
            if (search.test(value.name)) return search.test(value.name);
            if (search.test(value.hash)) return search.test(value.hash);
            if (search.test(value.className)) return search.test(value.className);
        });

        if (arr && arr.length >= 1) { 
            $.each(arr, function(index, value) {
                $(resultsElementTbody).append(`<tr><td>${value.name}</td><td>${value.className}</td><td>${value.cost}</td><td><a href="#" data-value="hash" class="text-success">SELECT</a></td></tr>`);
            })
            $(resultsElement).slideDown();
        } else {
            $(resultsElement).find("tbody").html(`<tr><td>No vehicles found containing: <strong>${val}</strong></td></tr>`).slideDown();
        }
    })
})