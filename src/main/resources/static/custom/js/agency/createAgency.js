var agencyAdvertiser = null;
$(document).ready(function () {
    var agencyId = $("#agencyIdId").val();
    if (agencyId != null && agencyId.length > 0) {
        getAdvertiserByAgency(agencyId);
    }

    $(document).on('click', '#saveAgency', function () {
        startLoader();
        var filterVO = getCampaignFilter();
        if (filterVO.status) {
            // createAgency(filterVO);
        }
    });

});



$(document).on('click', '#updateAgency', function () {
    var filterVO = getCampaignFilter();
    if (filterVO.status) {
        // updateAgency(filterVO);
    }


});


var createAgency = function (filterVO) {

    var agency = $.ajax({
        url: "/agencies/create",
        method: "POST",
        data: JSON.stringify(filterVO),
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
        contentType: "application/json",
        dataType: "json"
    });
    agency.done(function (data) {
        if (data) {

            window.location.assign("/agencies/");
            showMessage("Agency saved successfully", "success");

        }
    });
    agency.fail(function (jqXHR, textStatus) {
        console.log("Create Agency Request failed: ", textStatus);
    });

};

var updateAgency = function (filterVO) {
    var agency = $.ajax({
        url: "/agencies/update",
        method: "POST",
        data: JSON.stringify(filterVO),
        contentType: "application/json",
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
        dataType: "json"
    });
    agency.done(function (data) {
        if (data) {

            window.location.assign("/agencies/");
            showMessage("Agency saved successfully", "success");

        }
    });
    agency.fail(function (jqXHR, textStatus) {
        console.log("Edit Agency Request failed: ", textStatus);
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

/*function getAdvertiserByAgency(id) {
    var filterVO = {};
    filterVO.id = id;

    var request = $.ajax({
        url: "/agencies/advertisers/",
        method: "GET",
        data: filterVO,
        contentType: "application/json",
        dataType: "json",
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
        success: function (result) {
            if (agencyAdvertiser != null) {
                agencyAdvertiser.fnClearTable();
                agencyAdvertiser = $('#advertiserDetailId').dataTable();
                if (result.length > 0) {
                    agencyAdvertiser.fnAddData(result);
                }
            } else {
                agencyAdvertiser = $('#advertiserDetailId').dataTable({
                    "lengthMenu": [25, 50, 100],
                    "autoWidth": false,
                    "data": result,
                    "dom": 'lBfrtip',
                    "buttons": [
                        {
                            extend: 'csvHtml5',
                            text: 'Download',
                            title: 'Advertisers Detail'
                        },
                        'print'
                    ],
                    //"order": [19, 'desc'],
                    "columnDefs": [
                        {"width": "15%", "targets": 0},
                        {"width": "15%", "targets": 1},
                        {"width": "15%", "targets": 2},
                        {"width": "15%", "targets": 3},
                        {"width": "15%", "targets": 4},
                        {"width": "15%", "targets": 5}
                    ],
                    "columns": [

                        {
                            data: 'name'
                        },
                        {
                            data: 'id'
                        },
                        {
                            data: 'totalVisits'
                        },
                        {
                            data: 'totalMailerSent'
                        },
                        {
                            data: 'budget',
                            render: function (data, type, row) {
                                return appendCurrency(data);
                            }
                        },
                        {
                            data: 'totalSpent',
                            render: function (data, type, row) {
                                return appendCurrency(data);
                            }
                        }
                    ],
                });
            }

        },
        error: function (jqXHR, textStatus) {
            console.log("Advertiser detail Request failed: ", textStatus);
        }
    });


};*/

function getCampaignFilter() {
    var filterVO = {};
    var agencyName = $("#agencyNameId").val();
    var agencyId = $("#agencyIdId").val();
    var address1 = $("#addressId").val();
    var city = $("#cityId").val();
    var state = $("#stateId").val();
    var zip = $("#zipId").val();
    var contactName = $("#nameid").val();
    var emailId = $("#emailId").val();
    var phoneNumber = $("#phoneNumberId").val();
    var smallSizeCardCost = $("#smallSizeCardCostId").val();
    var mediumSizeCardCost = $("#mediumSizeCardCostId").val();
    var largeSizeCardCost = $("#largeSizeCardCostId").val();
    var primaryColour = $("#primaryColourId").val();
    var secondaryColour = $("#secondaryColourId").val();
    var agencySubdomain = $("#agencySubdomainId").val();
    var agencyLogo = $("#agencyLogoId").val();
    var agencyFavicon = $("#agencyFaviconId").val();
    var status = true;
    if (agencyId != null && agencyId.length > 0) {
        filterVO.agencyId = agencyId;
    } else {
        console.log("New Agency. No Id");
    }
    if (agencyName != null && agencyName.length > 0) {
        filterVO.agencyName = agencyName;
    } else {
        status = false;
        showMessage("Please enter the agency name", "error");
    }

    if (address1 != null && address1.length > 0) {
        filterVO.address1 = address1;

    } else {
        status = false;
        showMessage("Please enter the address1", "error");
    }
    if (city != null && city.length > 0) {
        filterVO.city = city;
    } else {
        status = false;
        showMessage("Please enter the city", "error");
    }
    if (state != null && state.length > 0) {
        filterVO.state = state;
    } else {
        status = false;
        showMessage("Please enter the state", "error");
    }
    if (zip != null && zip.length > 0) {
        filterVO.zip = zip;
    } else {
        status = false;
        showMessage("Please enter the zip", "error");
    }
    if (contactName != null && contactName.length > 0) {
        filterVO.contactName = contactName;
    } else {
        status = false;
        showMessage("Please enter the contactName", "error");
    }
    if (emailId != null && emailId.length > 0 && validateEmail(emailId)) {
        filterVO.emailId = emailId;
    } else {
        status = false;
        if (!validateEmail(emailId)) {
            showMessage("Please enter valid email Id", "error");
        } else {
            showMessage("Please enter the emailId", "error");
        }
    }
    if (phoneNumber != null && phoneNumber.length > 0) {
        filterVO.phoneNumber = phoneNumber;
    } else {
        status = false;

        showMessage("Please enter the phoneNumber", "error");
    }
    if (smallSizeCardCost != null && smallSizeCardCost.length > 0 && !isNaN(smallSizeCardCost)) {
        filterVO.smallSizeCardCost = smallSizeCardCost;
    } else {
        status = false;
        if (isNaN(smallSizeCardCost)) {
            showMessage("Please enter valid small size card cost", "error");
        } else {
            showMessage("Please enter the small size card cost", "error")
        }
    }

    if (mediumSizeCardCost != null && mediumSizeCardCost.length > 0 && !isNaN(mediumSizeCardCost)) {
        filterVO.mediumSizeCardCost = mediumSizeCardCost;
    } else {
        status = false;
        if (isNaN(mediumSizeCardCost)) {
            showMessage("Please enter valid medium size card cost", "error");
        } else {
            showMessage("Please enter the medium size card cost", "error")
        }
    }

    if (largeSizeCardCost != null && largeSizeCardCost.length > 0 && !isNaN(largeSizeCardCost)) {
        filterVO.largeSizeCardCost = largeSizeCardCost;
    } else {
        status = false;
        if (isNaN(largeSizeCardCost)) {
            showMessage("Please enter valid large size card cost", "error");
        } else {
            showMessage("Please enter the large size card cost", "error")
        }
    }
    if(!status){
        closeLoader();
    }
    if (agencyFavicon != null && agencyFavicon.length > 0) {
        filterVO.agencyFavicon = agencyFavicon;
    }
    if (agencyLogo != null && agencyLogo.length > 0 ) {
        filterVO.agencyLogo = agencyLogo;
    }
    if (agencySubdomain != null && agencySubdomain.length > 0 ) {
        filterVO.agencySubdomain = agencySubdomain;
    }
    if (secondaryColour != null && secondaryColour.length > 0) {
        filterVO.secondaryColour = secondaryColour;
    }
    if (primaryColour != null && primaryColour.length > 0) {
        filterVO.primaryColour = primaryColour;
    }
    filterVO.status = status;
    return filterVO;

}

// Variable to store your files
// var files;
//
// // Add events
// $('input[type=file]').on('change', prepareUpload);
//
// // Grab the files and set them to our variable
// function prepareUpload(event)
// {
//     files = event.target.files;
// }
// $('form').on('submit', uploadFiles);
//
// // Catch the form submit and upload the files
// function uploadFiles(event)
// {
//     // event.stopPropagation(); // Stop stuff happening
//     event.preventDefault(); // Totally stop stuff happening
//
//     // START A LOADING SPINNER HERE
//
//     // Create a formdata object and add the files
//     var data = new FormData();
//     $.each(files, function(key, value)
//     {
//         data.append(key, value);
//     });
//
//     $.ajax({
//         url: 'submit.php?files',
//         type: 'POST',
//         data: data,
//         cache: false,
//         dataType: 'json',
//         processData: false, // Don't process the files
//         contentType: false, // Set content type to false as jQuery will tell the server its a query string request
//         success: function(data, textStatus, jqXHR)
//         {
//             if(typeof data.error === 'undefined')
//             {
//                 // Success so call function to process the form
//                 submitForm(event, data);
//             }
//             else
//             {
//                 // Handle errors here
//                 console.log('ERRORS: ' + data.error);
//             }
//         },
//         error: function(jqXHR, textStatus, errorThrown)
//         {
//             // Handle errors here
//             console.log('ERRORS: ' + textStatus);
//             // STOP LOADING SPINNER
//         }
//     });
// }
//
//
