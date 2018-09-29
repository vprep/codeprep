/*$(document).ready(function () {
    var agencyId = $("#agencyIdId").val();
    if (agencyId != null && agencyId.length > 0) {
        getAdvertiserByAgency(agencyId);
    }

});*/

$(document).on('change', '#roleDivId', function () {
    $('#agencyAutoComplete').empty();
    $('#advertiserAutoComplete').empty();
    $('#campaignAutoComplete').empty();
    adjustVisibilityOfAgencyAdvertiserCampaign();
    agencyAutoCompleteData();
});

$(document).on('change', '#agencyAutoComplete', function () {
    $('#advertiserAutoComplete').empty();
    $('#campaignAutoComplete').empty();
    advertiserAutoCompleteData();
});

$(document).on('change', '#advertiserAutoComplete', function () {
    $('#campaignAutoComplete').empty();
    campaignAutoCompleteData();
});

$(document).on('click', '#saveUser', function () {
    var filterVO = getUserProfileFilter();
    if (filterVO.status) {
        createUserProfile(filterVO);
    }
});

$(document).on('click', '#updateUser', function () {
    var filterVO = getUserProfileFilter();
    if (filterVO.status) {
        updateUserProfile(filterVO);
    }
});


var createUserProfile = function (filterVO) {
    var userProfile = $.ajax({
        url: "/users/create",
        method: "POST",
        data: JSON.stringify(filterVO),
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
        contentType: "application/json",
        dataType: "json"
    });
    userProfile.done(function (data) {
        if (data) {

            window.location.assign("/users/");
            showMessage("User saved successfully", "success");

        }
    });
    userProfile.fail(function (jqXHR, textStatus) {
        console.log("Create User Request failed: ", textStatus);
    });

};

var updateUserProfile = function (filterVO) {
    var userProfile = $.ajax({
        url: "/users/update",
        method: "POST",
        data: JSON.stringify(filterVO),
        contentType: "application/json",
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
        dataType: "json"
    });
    userProfile.done(function (data) {
        if (data) {

            window.location.assign("/users/");
            showMessage("User updated successfully", "success");

        }
    });
    userProfile.fail(function (jqXHR, textStatus) {
        console.log("Update User Request failed: ", textStatus);
    });

};

function showMessage(msg, type) {
    noty({
        text: msg,
        type: type,
        dismissQueue: true,
        layout: 'topCenter',
        theme: 'defaultTheme',
        timeout: 2000
    });
}

function getUserProfileFilter() {
    var filterVO = {};
    var userVO = {};
    var status = true;
    var userProfileId = $('#userProfileId').val();
    var userId = $('#userIdId').val();
    var firstName = $("#firstNameDivId").val();
    var lastName = $("#lastNameDivId").val();
    var email = $("#emailDivId").val();
    var initialEmail = $("#previousEmailId").val();
    var phoneNumber = $("#phoneNumberDivId").val();
    var password = $("#passwordDivId").val();
    var initialPassword = $("#passwordIdId").val();
    var enabled = $('#enabledDivId').is(":checked");
    var role = $('#roleDivId').val();
    var agencyId = $('#agencyAutoComplete').val();
    var advertiserIds = $('#advertiserAutoComplete').val();
    var campaignIds = $('#campaignAutoComplete').val();
    filterVO.id = userProfileId;
    userVO.userId = userId;
    if (firstName != null && firstName.length > 0) {
        userVO.firstName = firstName;
    } else {
        status = false;
        showMessage("Please enter first name", "error");
    }
    if (lastName != null && lastName.length > 0) {
        userVO.lastName = lastName;
    } else {
        status = false;
        showMessage("Please enter last name", "error");
    }
    if (initialEmail) {
        if (email && initialEmail !== email) {
            status = false;
            showMessage("Email cannot be updated", "error");
        } else {
            userVO.email = email;
        }
    } else {
        if (email != null && email.length > 0) {
            userVO.email = email;
        } else {
            status = false;
            showMessage("Please enter email", "error");
        }
    }
    if (phoneNumber != null && phoneNumber.length > 0) {
        userVO.phoneNumber = phoneNumber;
    } else {
        status = false;
        showMessage("Please enter phone number", "error");
    }
    if (initialPassword != null && initialPassword === password) {
        console.log("Password not changed.");
    } else if (password != null && password.length > 0) {
        userVO.password = password;
    } else {
        status = false;
        showMessage("Please enter password", "error");
    }
    if (role != null) {
        filterVO.userType = role;
    } else {
        status = false;
        showMessage("Please enter role", "error");
    }
    if (role > 1) {
        if (agencyId != null && agencyId > -1) {
            filterVO.agencyId = agencyId;
        } else {
            status = false;
            showMessage("Please select an agency", "error");
        }
    }
    if (role > 2) {
        if (advertiserIds != null) {
            filterVO.advertiserIds = advertiserIds;
        } else {
            status = false;
            showMessage("Please select advertiser", "error");
        }
    }
    if (role > 3) {
        if (campaignIds != null) {
            filterVO.campaignIds = campaignIds;
        } else {
            status = false;
            showMessage("Please select campaign", "error");
        }
    }
    if (enabled != null) {
        userVO.enabled = enabled;
    }
    filterVO.userVO = userVO;
    filterVO.status = status;
    return filterVO;

}

function agencyAutoCompleteData() {
    var role = $('#roleDivId').val();
    var agency = $('#agencyAutoComplete');
    var previousAgencyId = $('#previousAgencyId').val();
    if (role != null && role > 1) {
        console.log("Fetching agency list");
        $.ajax({
            url: "/agencies/names",
            method: "GET",
            contentType: "application/json",
            success: function (data) {
                var agencyList = [];
                var d = new Date();
                if (!previousAgencyId) {
                    $(agency).append('<option value="-1" selected>Select</option>');
                }
                for (var i = 0; i < data.length; i++) {
                    console.log("name: " + data[i].name + " Id: " + data[i].id);
                    agencyList.push({text: data[i].name, id: data[i].id});
                    if (data[i].id == previousAgencyId) {
                        $(agency).append('<option selected id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                    } else {
                        $(agency).append('<option id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                    }
                }

            },
            error: function (jqXHR, textStatus) {
                console.log("Agency list Request failed: ", textStatus);
            }
        });
    }
}

function advertiserAutoCompleteData() {
    var agency = $('#agencyAutoComplete').val();
    var role = $('#roleDivId').val();
    var advertiser = $('#advertiserAutoComplete');
    var previousAdvertiserIds = $('#previousAdvertiserIds').val();
    if (role != null && role > 2) {
        $.ajax({
            url: "/agencies/" + agency + "/advertisers",
            method: "GET",
            contentType: "application/json",
            success: function (data) {
                var agencyList = [];
                var d = new Date();
                for (var i = 0; i < data.length; i++) {
                    console.log("name: " + data[i].name + " Id: " + data[i].id);
                    agencyList.push({text: data[i].name, id: data[i].id});
                    if (contains(previousAdvertiserIds, data[i].id)) {
                        $(advertiser).append('<option selected id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                    } else {
                        $(advertiser).append('<option id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                    }
                }

            },
            error: function (jqXHR, textStatus) {
                console.log("Advertiser list Request failed: ", textStatus);
            }
        });
    }
}

function campaignAutoCompleteData() {
    var advertisers = $('#advertiserAutoComplete').val();
    var role = $('#roleDivId').val();
    var campaign = $('#campaignAutoComplete');
    var previousCampaignIds = $('#previousCampaignIds').val();
    if (role != null && role > 3) {
        $.ajax({
            url: "/advertisers/campaignNames?ids=" + advertisers,
            method: "GET",
            contentType: "application/json",
            success: function (data) {
                var agencyList = [];
                var d = new Date();
                for (var i = 0; i < data.length; i++) {
                    console.log("name: " + data[i].name + " Id: " + data[i].id);
                    agencyList.push({text: data[i].name, id: data[i].id});
                    if (contains(previousCampaignIds, data[i].id)) {
                        $(campaign).append('<option selected id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                    } else {
                        $(campaign).append('<option id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                    }
                }

            },
            error: function (jqXHR, textStatus) {
                console.log("Campaign list Request failed: ", textStatus);
            }
        });
    }
}

function populateAgencyAdvertiserAndCampaign() {
    var role = $('#roleDivId').val();
    var agency = $('#agencyAutoComplete');
    var previousAgencyId = $('#previousAgencyId').val();
    if (role != null && role > 1) {
        console.log("Fetching agency list");
        $.ajax({
            url: "/agencies/names",
            method: "GET",
            contentType: "application/json",
            success: function (data) {
                var agencyList = [];
                var d = new Date();
                if (!previousAgencyId) {
                    $(agency).append('<option value="-1" selected>Select</option>');
                }
                for (var i = 0; i < data.length; i++) {
                    console.log("name: " + data[i].name + " Id: " + data[i].id);
                    agencyList.push({text: data[i].name, id: data[i].id});
                    if (data[i].id == previousAgencyId) {
                        $(agency).append('<option selected id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                    } else {
                        $(agency).append('<option id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                    }
                }
                populateAdvertiserAndCampaign();
            },
            error: function (jqXHR, textStatus) {
                console.log("Agency list Request failed: ", textStatus);
            }
        });
    }
}

function populateAdvertiserAndCampaign() {
    var agency = $('#agencyAutoComplete').val();
    var role = $('#roleDivId').val();
    var advertiser = $('#advertiserAutoComplete');
    var previousAdvertiserIds = $('#previousAdvertiserIds').val();
    if (role != null && role > 2) {
        $.ajax({
            url: "/agencies/" + agency + "/advertisers",
            method: "GET",
            contentType: "application/json",
            success: function (data) {
                var agencyList = [];
                var d = new Date();
                for (var i = 0; i < data.length; i++) {
                    console.log("name: " + data[i].name + " Id: " + data[i].id);
                    agencyList.push({text: data[i].name, id: data[i].id});
                    if (contains(previousAdvertiserIds, data[i].id)) {
                        $(advertiser).append('<option selected id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                    } else {
                        $(advertiser).append('<option id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                    }
                }
                campaignAutoCompleteData();

            },
            error: function (jqXHR, textStatus) {
                console.log("Advertiser list Request failed: ", textStatus);
            }
        });
    }
}

function populateAgencyAndAdvertiser() {
    var role = $('#roleDivId').val();
    var agency = $('#agencyAutoComplete');
    var previousAgencyId = $('#previousAgencyId').val();
    if (role != null && role > 1) {
        console.log("Fetching agency list");
        $.ajax({
            url: "/agencies/names",
            method: "GET",
            contentType: "application/json",
            success: function (data) {
                var agencyList = [];
                var d = new Date();
                if (!previousAgencyId) {
                    $(agency).append('<option value="-1" selected>Select</option>');
                }
                for (var i = 0; i < data.length; i++) {
                    console.log("name: " + data[i].name + " Id: " + data[i].id);
                    agencyList.push({text: data[i].name, id: data[i].id});
                    if (data[i].id == previousAgencyId) {
                        $(agency).append('<option selected id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                    } else {
                        $(agency).append('<option id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                    }
                }
                advertiserAutoCompleteData();
            },
            error: function (jqXHR, textStatus) {
                console.log("Agency list Request failed: ", textStatus);
            }
        });
    }
}

var contains = function (arr, data) {
    if (arr) {
        arr = JSON.parse(arr);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == data) {
                return true;
            }
        }
    }
    return false;
};

var adjustVisibilityOfAgencyAdvertiserCampaign = function () {
    var role = $('#roleDivId').val();
    var agencyRow = $('#agencyRowId');
    var advertiserRow = $('#advertiserRowId');
    var campaignRow = $('#campaignRowId');
    if (role) {
        if (role == 2) {
            agencyRow.show();
            advertiserRow.hide();
            campaignRow.hide();
        } else if (role == 3) {
            agencyRow.show();
            advertiserRow.show();
            campaignRow.hide();
        } else if (role == 4) {
            agencyRow.show();
            advertiserRow.show();
            campaignRow.show();
        } else {
            agencyRow.hide();
            advertiserRow.hide();
            campaignRow.hide();
        }
    }
};
