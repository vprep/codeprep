var count = 0, max = 0;

var primaryColour, secondaryColour;

function setPrimaryColour(colour) {
    primaryColour = colour;
}

function setSecondaryColour(colour) {
    secondaryColour = colour;
}

function getPrimaryColour() {
    return primaryColour;
}

function getSecondaryColour() {
    return secondaryColour;
}


function appendCurrency(data) {
    if (data != null) {
        return '$' + parseFloat(data).toFixed(2);
    }
    return data;

}

function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}

var startLoader = function () {
    $('.global-loader').show();
};

var closeLoader = function () {
    if (count == max) {
        $('.global-loader').hide();
        count = 0;
    }
};

function keepBackgroundOfColour(passedBtn, passedColour) {
    passedBtn.css("background-color", passedColour);
}

function keepFontOfColour(passedBtn, passedColour) {
    passedBtn.css("color", passedColour);
}

$(document).on({
    mouseenter: function () {
        keepBackgroundOfColour($(this), "white");
        keepFontOfColour($(this), primaryColour);
    },
    mouseleave: function () {
        keepBackgroundOfColour($(this), primaryColour);
        keepFontOfColour($(this), "white");
    }
}, ".edit-btn");

$(document).on({
    mouseenter: function () {
        keepBackgroundOfColour($(this), "white");
        keepFontOfColour($(this), primaryColour);
    },
    mouseleave: function () {
        keepBackgroundOfColour($(this), primaryColour);
        keepFontOfColour($(this), "white");
    }
}, ".view-btn");

$(document).on({
    mouseenter: function () {
        keepBackgroundOfColour($(this), "white");
        keepFontOfColour($(this), secondaryColour);
    },
    mouseleave: function () {
        keepBackgroundOfColour($(this), secondaryColour);
        keepFontOfColour($(this), "white");
    }
}, ".pagination > li.active > a");

function changePaginationCSS() {
    activePage = $(".pagination > li.active > a");
    keepBackgroundOfColour(activePage, secondaryColour);
    keepFontOfColour(activePage, "white");
}

function extractDate(dateTimeArgStr) {
    var date = new Date(dateTimeArgStr);
    var dateString = "";
    var month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var day = date.getDate();
    if (day < 10) day = "0" + day;
    dateString += date.getFullYear() + "/" + month + "/" + day;
    return dateString;
}

function isNumber(id) {
    for (var i = s.length - 1; i >= 0; i--) {
        const d = s.charCodeAt(i);
        if (d < 48 || d > 57)
            return false;
    }
    return true;
}