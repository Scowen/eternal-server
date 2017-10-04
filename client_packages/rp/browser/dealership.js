var vehicleInfo = [
    {name: "T20", hash: 123456789, className: "Super", cost: 500000},
    {name: "Tyrus", className: "Super", cost: 500000},
    {name: "GP1", className: "Super", cost: 500000},
    {name: "Nero", className: "Super", cost: 500000},
    {name: "ItaliGTB", cost: 500000},
    {name: "Cyclone", cost: 500000},
    {name: "Tempesta", cost: 500000},
    {name: "Visone", cost: 500000},
];

function loadDealership(values) {
    let json = null;
    try {
        json = JSON.parse(values);
    } catch (exc) {
        showSubtitleBox(`Error loading data. <br /><br />${exc}`);
        return;
    }

    if (!json || json == null || !typeof json == "object") {
        showSubtitleBox(`Error loading data. <br /><br />${values}`);
        return;
    }

    cursor = true;
    // mp.invoke('focus', true);

    $("#dealership-name").text(json.name);
    $("#dealership-balance").text(number_format(json.balance));
    if (json.for_sale) {
        $("#btn-dealership-set-for-sale").hide();
        $("#btn-dealership-set-not-for-sale").show();
        $("#dealership-forsale").text("For Sale");
    } else {
        $("#btn-dealership-set-for-sale").show();
        $("#btn-dealership-set-not-for-sale").hide();
        $("#dealership-forsale").text("Not For Sale");
    }

    if (json.orders != null) {
        $.each(json.orders, function(index, value) {
            let template = $("#dealership-order-template").clone();
            $(template).find(".t-name").text(value.vehicle_name);
            $(template).find(".t-quantity").text(value.quantity);
            $(template).find(".t-cost").text(value.cost);
            $(template).find(".t-status").text(value.status);
            $(template).attr("id", "dealership-order-" + value.id);
            $("#dealership-orders-tbody").append(template);
            $(template).show();
        })
    }

    if (json.spots != null) {
        $.each(json.spots, function(index, value) {
            let template = $("#dealership-spot-template").clone();
            $(template).find(".t-id").text("#" + value.id);
            $(template).find(".t-vehicle").text(value.name);
            $(template).find(".t-price input").val(value.price);
            $(template).find(".t-stock").text(value.stock);
            $(template).find(".btn-dealership-spot-submit").attr("data-id", value.id);
            $(template).attr("id", "dealership-spot-" + value.id);
            $("#dealership-spots-tbody").append(template);
            $(template).show();
        })
    }

    if (json.stock != null) {
        $.each(json.stock, function(index, value) {
            let template = $("#dealership-stock-template").clone();
            $(template).find(".t-name").text(value.name);
            $(template).find(".t-stock").text(value.stock);
            $(template).attr("id", "dealership-stock-" + value.id);
            $("#dealership-stocks-tbody").append(template);
            $(template).show();
        })
    }

    if (json.logs != null) {
        $.each(json.log, function(index, value) {
            let template = $("#dealership-log-template").clone();
            $(template).find(".t-name").text(value.name);
            $(template).find(".t-action").text(value.action);
            $(template).find(".t-date").text(value.date);
            $(template).attr("id", "dealership-log-" + value.id);
            $("#dealership-logs-tbody").append(template);
            $(template).show();
        })
    }

}

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
        var arr = jQuery.grep(vehicleInfo, function (value) {
            if (search.test(value.name)) return search.test(value.name);
            if (search.test(value.hash)) return search.test(value.hash);
            if (search.test(value.className)) return search.test(value.className);
        });

        if (arr && arr.length >= 1) { 
            $.each(arr, function(index, value) {
                let string = `<tr><td>${value.name}</td><td>${value.className}</td><td>${number_format(value.cost)}</td>`;
                string += `<td><a href="#" data-value="${value.hash}" class="text-success dealership-order-select">SELECT</a></td></tr>`;
                $(resultsElementTbody).append(string);
                
                $(".dealership-order-select").click( function () {
                    $("#dealership-order-form-vehicle").text(value.name);
                    $("#dealership-order-form-class").text(value.className);
                    $("#dealership-order-form-cost").text(number_format(value.cost));
                    $("#dealership-order-form-total-cost").text(0);

                    $("#dealership-order-form-submit")
                        .attr("data-hash", value.hash)
                        .attr("data-quantity", 0)
                        .attr("data-cost", value.cost);

                    $("#dealership-order-vehicle-results").hide();
                    $("#dealership-order-search").fadeOut(350, function() {
                        $("#dealership-order-form").fadeIn();
                    });
                })
            });

            $(resultsElement).slideDown();
        } else {
            $(resultsElement).find("tbody").html(`<tr><td>No vehicles found containing: <strong>${val}</strong></td></tr>`).slideDown();
        }
    });

    $("#input-dealership-order-form-quantity").keyup( function() {
        var val = parseInt($(this).val());

        if (val == null || val == "undefined")
            val = 0;

        let btn = $("#dealership-order-form-submit");

        let cost = $(btn).attr("data-cost");
        cost = parseInt(cost);

        let total = val * cost;
        $("#dealership-order-form-total-cost").text(number_format(total));
    })

    $("#dealership-order-form-submit").click( function() {
        $(".disable-after-submit").addClass("disabled").attr("readonly", true);
        $(this).text("Ordering...");
    })

    $("#dealership-order-form-cancel").click( function() {
        $(".disable-after-submit").removeClass("disabled").attr("readonly", false);
        $("#input-dealership-order-vehicle").val("");
        $("#dealership-order-form").fadeOut(350, function() {
            $("#dealership-order-search").fadeIn();
        });
    });
})