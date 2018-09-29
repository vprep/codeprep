var campaignContent = null;
$(document).ready(function () {
    autoCompleteData();
    var advertiserId = $("#aadvertiserIdId").val();
    if(advertiserId != null && advertiserId.length > 0){
        getCampaignByAdvertiser(advertiserId);
    }
});

$(document).on('click', '#saveAdvertiser', function () {

    var filterVO = getAdvertiserfilter();
    if (filterVO.status) {
        createAdvertiser(filterVO);
    }


});

$(document).on('click', '#updateAdvertiser', function () {

    var filterVO = getAdvertiserfilter();
    var advertiserId = $('#aadvertiserIdId').val();
    if(advertiserId!= null && advertiserId.length >0){
        filterVO.advertiserId = advertiserId;
    }
    if (filterVO.status) {
        updateAdvertiser(filterVO);
    }


});


var createAdvertiser = function (filterVO) {
    startLoader();
    var advertiser = $.ajax({
        url: "/advertisers/create",
        method: "POST",
        data: JSON.stringify(filterVO),
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
        contentType: "application/json",
        dataType: "json"
    });
    advertiser.done(function (data) {
        if (data) {

            window.location.assign("/advertisers/");
            showMessage("Advertiser saved successfully", "success");

        }
    });
    advertiser.fail(function (jqXHR, textStatus) {
        console.log("Create Advertiser Request failed: ", textStatus);
    });
    advertiser.always(function () {
        closeLoader();
    });

};

var updateAdvertiser = function (filterVO) {
    var advertiser = $.ajax({
        url: "/advertisers/update",
        method: "POST",
        data: JSON.stringify(filterVO),
        contentType: "application/json",
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
        dataType: "json"
    });
    advertiser.done(function (data) {
        if (data) {

            window.location.assign("/advertisers/");
            showMessage("Advertiser saved successfully", "success");

        }
    });
    advertiser.fail(function (jqXHR, textStatus) {
        console.log("Edit Advertiser Request failed: ", textStatus);
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

$(document).on('click', '#pixelCreateBtnId', function () {
    var advertiserId = $("#aadvertiserIdId").val();
    var htmlValue = "<input type=\"hidden\" id=\"upsnap_aaId\" value=\"\">" +
        "        <script>\n" +
        "            document.getElementById('upsnap_aaId').value=" +advertiserId +";\n"+
        "            (function(u,e,s,n,a,p) {\n" +
        "                a=e.createElement(s);\n" +
        "                a.async=!0;\n" +
        "                a.src=n;\n" +
        "                p=e.getElementsByTagName(s)[0];\n" +
        "                p.parentNode.insertBefore(a,p);\n" +
        "            })(window,document,'script','https://s3.amazonaws.com/com.upsnap.dmp.campaigns.creatives/js/upsnappixel.js');\n" +
        "        </script>";

    $('#textId').text(htmlValue);

});

function getCampaignByAdvertiser(id) {
    var filterVO = {};
    filterVO.id = id;

    var request = $.ajax({
        url: "/advertisers/campaigns/",
        method: "GET",
        data: filterVO,
        contentType: "application/json",
        dataType: "json",
        headers:
            {
                'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
            },
        success: function (result) {
            if (campaignContent != null) {
                campaignContent.fnClearTable();
                campaignContent = $('#campaignDetailId').dataTable();
                if (result.campaignList.length > 0) {
                    campaignContent.fnAddData(result);
                }
            } else {
                if(result.eligibleUser){
                    campaignContent = $('#campaignDetailId').dataTable({
                        "lengthMenu": [25, 50, 100],
                        "autoWidth": false,
                        "data": result.campaignList,
                        "dom": 'lBfrtip',
                        "buttons": [
                            {
                                extend: 'csvHtml5',
                                text: 'Download',
                                title: 'Campaigns Detail'
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
                            {"width": "15%", "targets": 5},
                            {"width": "15%", "targets": 6}
                        ],
                        "columns": [

                            {
                                data: 'name'
                            },
                            {
                                data: 'id'
                            },
                            {
                                data: 'status'
                            },
                            {
                                data: 'totalVisits'
                            },
                            {
                                data: 'totalMailerSent'
                            },
                            {
                                data: 'totalSpent',
                                render: function (data, type, row) {
                                    return appendCurrency(data);
                                }
                            },
                            {
                                data: 'cost',
                                render: function (data, type, row) {
                                    return appendCurrency(data);
                                }
                            }
                        ],
                    });
                } else {
                    campaignContent = $('#campaignDetailId').dataTable({
                        "lengthMenu": [25, 50, 100],
                        "autoWidth": false,
                        "data": result.campaignList,
                        "dom": 'lBfrtip',
                        "buttons": [
                            {
                                extend: 'csvHtml5',
                                text: 'Download',
                                title: 'Campaigns Detail'
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
                                data: 'status'
                            },
                            {
                                data: 'totalVisits'
                            },
                            {
                                data: 'totalMailerSent'
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

            }

        },
        error: function (jqXHR, textStatus) {
            console.log("Advertiser detail Request failed: ", textStatus);
        }
    });
}

    function autoCompleteData() {
        $.ajax({
            url: "/agencies/list",
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var agencyList = [];
                var d = new Date();
                for (var i = 0; i < data.length; i++) {
                    console.log("name: "+data[i].agencyName + " Id: "+data[i].agencyId);
                    agencyList.push({text: data[i].agencyName, id: data[i].agencyId});
                    var agency = document.getElementById('agencyAutoComplete');
                    $(agency).append('<option id=' + data[i].agencyId + ' value=' + data[i].agencyId + '>' + data[i].agencyName + '</option>');
                }

            }
        });

};

function getAdvertiserfilter() {
    var filterVO = {};
    var advertiserName = $("#aadvertiserNameId").val();
    var agencyId = $("#agencyAutoComplete").val();
    var address1 = $("#addressId").val();
    var city = $("#cityId").val();
    var state = $("#stateId").val();
    var zip = $("#zipId").val();
    var contactName = $("#nameid").val();
    var emailId = $("#emailId").val();
    var phoneNumber = $("#phoneNumberId").val();
    var salesRepEmail = $("#salesRepEmailId").val();
    var advWebsite = $("#advWebsiteId").val();
    var status = true;
    if(salesRepEmail != null && salesRepEmail.length > 0){
        filterVO.salesRepEmail = salesRepEmail;
    }else {
        status = false;
        showMessage("Please enter the sales rep email","error");
    }
    if(advWebsite != null && advWebsite.length > 0){
        filterVO.advWebsite = advWebsite;
    }else {
        status = false;
        showMessage("Please enter the website","error");
    }
    if (advertiserName != null && advertiserName.length > 0) {
        filterVO.advertiserName = advertiserName;

    } else {
        status = false;
        showMessage("Please enter the advertiser name", "error");

    }
    if (agencyId != null && agencyId.length > 0 && $.isNumeric(agencyId)) {
        filterVO.agencyId = agencyId;

    } else {
        status = false;
        showMessage("Please enter the correct agency input", "error");

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
        if(!validateEmail(emailId)){
            showMessage("Please enter valid emailId", "error");
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
    filterVO.status = status;
    return filterVO;
}



