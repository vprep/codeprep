var frontFile;
var backfile;
var campaignContent = null;
var existingBudget;
var includeIndex = 0;
var excludeIndex = 0;
$(document).ready(function () {

    var includeStored = $("#includeIndexId").val();
    if (includeStored != null && includeStored.length > 0) {
        includeIndex = includeStored;
    }

    var excludeStored = $("#excludeIndexId").val();
    if (excludeStored != null && excludeStored.length > 0) {
        excludeIndex = excludeStored;
    }
    existingBudget = $("#budgetId").val();
    $('#frontError').hide();
    $('#backError').hide();
    $('#addUrl').hide();
    $('#excludeUrl').hide();
    advertiserAutoCompleteData();
    var campaignId = $("#campaignIdId").val();
    if (campaignId != null && campaignId.length > 0) {
        getCampaignReport(campaignId);
    }
    $(document).on('click', '#saveCampaign', function (e) {
        startLoader();
        var filterVO = getCampaignFilterVO();
        var frontFile = $("#campaignFileFrontId").val();
        var backFile = $("#campaignFilebackId").val();

        function getFileType(passedFile) {
            if (passedFile != null && passedFile.length > 0) {
                var typeArr = passedFile.split(".");
                if (typeArr[1] != null && typeArr[1].length > 0)
                    return typeArr[1];
            }
            return null;
        }

        var frontType = getFileType(frontFile);
        var backType = getFileType(backFile);


        function areZipCodeFilesValidCsv() {
            var numUploadButtons = $("#zipcodeFileContainerId input").size();
            for (var i = 0; i < numUploadButtons; i++) {
                var currZipCodeFileName = $("#zipcodeFile_" + i + "Id").val();
                var currZipCodeFileType = getFileType(currZipCodeFileName);
                if (!(currZipCodeFileType == 'csv')) return false
            }
            return true;
        }

        function arePhoneNumberListFilesValidCsv() {
            var phoneListFileName = $("#phoneListId").val();
            var fileType = getFileType(phoneListFileName);
            if (fileType != null && !(fileType == 'csv')) {
                return false;
            }
            return true;
        }

        if (!(frontType == 'pdf') || !(backType == 'pdf')) {
            showMessage("please upload file of type pdf only", "error");
            closeLoader();
            e.preventDefault();
        } else if (!areZipCodeFilesValidCsv()) {
            showMessage("please upload zipcode files of type csv only", "error");
            closeLoader();
            e.preventDefault();
        } else if (!arePhoneNumberListFilesValidCsv()) {
            showMessage("please upload phone number list files of type csv only", "error");
            closeLoader();
            e.preventDefault();
        } else if (!filterVO.status) {
            closeLoader();
            e.preventDefault();
        }
    });
});

$(document).on('click', '#updateCampaign', function (e) {
    var filterVO = getCampaignFilterVO();
    if (!filterVO.status) {
        closeLoader();
        e.preventDefault();
    }
});

$(document).on('change', '#advertiserAutoComplete', function () {
    var advertiserId = $("#advertiserAutoComplete").val();
    $("#advertiserIdId").val(advertiserId);
});


$(document).on('click', '#addZipcodeFileBtn', function () {
    var numUploadButtons = $("#zipcodeFileContainerId input").size();
    console.log("numUploadButtons = " + numUploadButtons);
    $("#zipcodeFileContainerId").append("<input type = 'file' name='zipcodeFile_" + numUploadButtons + "'  id='zipcodeFile_" + numUploadButtons + "Id' >");
    //data-allowed-file-extensions='[ &quot;doc&quot;,&quot;txt&quot;,&quot;docx&quot;, &quot;pdf&quot;]' //todo check if can be used here
});

$(document).on('click', '#addPromoCodeFilebtn', function () {
    var numUploadButtons = $("#promoCodeFileContainerId input").size();
    console.log("numUploadButtons = " + numUploadButtons);
    $("#promoCodeFileContainerId").append("<input type = 'file' name='promoCodeFile_" + numUploadButtons + "'  id='promoCodeFile_" + numUploadButtons + "Id' >");
    //data-allowed-file-extensions='[ &quot;doc&quot;,&quot;txt&quot;,&quot;docx&quot;, &quot;pdf&quot;]' //todo check if can be used here
});

function getCampaignFilterVO() {

    //$("input[name=rate]:checked").val()
    var filterVO = {};
    var campaignId = $("#campaignId").val();
    var campaignName = $("#campaignNameId").val();
    var runStatus = $("#runStatusId").val();
    var product = $("#productId").val();
    var startDate = $("#startDateId").val();
    var endDate = $("#endDateId").val();
    var budget = $("#budgetId").val();
    var pricePerPiece = $("#pricePerPieceId").val();
    var status = true;
    var includeHtml = '';
    var excludeHtml = '';

    $('#editUrl').find('.include-value').each(function (i, item) {
            includeHtml += '<input class="include-value" type="text" value="' + item.value + '" style="width: 100%;display: none;" name="includeUrl"/>';
        }
    );

    $('#editExcludeUrl').find('.exclude-value').each(function (i, item) {
            excludeHtml += '<input class="exclude-value" type="text" value="' + item.value + '" style="width: 100%;display: none;" name="excludeUrl"/>';
        }
    );


    $('#addUrl').append(includeHtml);
    $('#excludeUrl').append(excludeHtml);

    filterVO.id = campaignId;
    if (campaignName != null && campaignName.length > 0) {
        filterVO.campaignName = campaignName;

    } else {
        status = false;
        showMessage("Please enter the campaign name", "error");
    }
    if (runStatus != null && runStatus.length > 0) {
        filterVO.runStatus = runStatus;
    } else {
        status = false;
        showMessage("Please enter the runStatus", "error");
    }

    if (startDate != null && startDate.length > 0) {
        filterVO.startDate = startDate;
    } else {
        status = false;
        showMessage("Please enter the startDate", "error");
    }
    if (endDate != null && endDate.length > 0) {
        filterVO.endDate = endDate;
    } else {
        status = false;
        showMessage("Please enter the endDate", "error");
    }
    if (startDate && endDate) {
        var extractedStartDate = extractDate(startDate);
        var extractedEndDate = extractDate(endDate);
        var currDate = extractDate(new Date());
        if (product == 4) {
            if (extractedStartDate !== extractedEndDate) {
                showMessage("start date is not equal to end date ", "error");
                status = false;
            }
            else if (currDate > extractedStartDate) {
                showMessage("start date should be less than current date ", "error");
                status = false;
            }
            else if (runStatus == 1 && extractedStartDate > currDate) {
                showMessage("start date should be less than or equal to current date for this status", "error");
                status = false;
            }
            else if (runStatus == 1 && extractedEndDate < currDate) {
                showMessage("end date should be greater than current date for this status", "error");
                status = false;
            }
        }
        else {
            if ((extractedStartDate >= extractedEndDate)) {
                showMessage("start date should be less than or equal to end date", "error");
                status = false;
            }
            else if ((currDate > extractedEndDate)) {
                showMessage("end date should be greater than or equal to current date", "error");
                status = false;
            }
            else if (runStatus == 1 && extractedStartDate > currDate) {
                showMessage("start date should be less than or equal to current date for this status", "error");
                status = false;
            }
            else if (runStatus == 1 && extractedEndDate < currDate) {
                showMessage("end date should be greater than current date for this status", "error");
                status = false;
            }

        }
    }
    //     if (product == 4) {
    //         if (extractedStartDate !== extractedEndDate) {
    //             showMessage("start date is not equal to end date ", "error");
    //             status = false;
    //         }
    //         if (extractedStartDate < currDate) {
    //             showMessage("start date is less than current date.", "error");
    //             status = false;
    //         }
    //     }
    //     else if (!(new Date(startDate) < new Date(endDate))()) {
    //         status = false;
    //         showMessage("Start date must be before end date.", "error");
    //     }
    //     if (runStatus) {
    //         if (runStatus == 1 && !(new Date() >= new Date(startDate))) {
    //             status = false;
    //             showMessage("Start date must be less than or equal to current date for the current status.", "error");
    //         }
    //     }
    // }
    if (budget != null && budget.length > 0 && !isNaN(budget)) {
        filterVO.budget = budget;
    } else {
        status = false;
        if (isNaN(budget)) {
            showMessage("Please enter the numeric value in budget", "error");
        }
        showMessage("Please enter the budget", "error");
    }
    if (pricePerPiece != null && pricePerPiece.length > 0 && !isNaN(pricePerPiece)) {
        filterVO.pricePerPiece = pricePerPiece;
    } else {
        status = false;
        if (isNaN(pricePerPiece)) {
            showMessage("Please enter the numeric value in cost per piece", "error");
        }
        showMessage("Please enter the cost per piece", "error");
    }
    if (product != null && product.length > 0) {
        filterVO.product = product;
    } else {
        status = false;
        showMessage("Please enter the product", "error");
    }

    filterVO.frontFile = frontFile;
    filterVO.backFile = backfile;
    filterVO.status = status;
    return filterVO;

}

var createCampaign = function (filterVO) {
    var campaign = $.ajax({
        url: "/campaigns/create",
        method: "POST",
        data: JSON.stringify(filterVO),
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
        contentType: "application/json",
        dataType: "json"
    });
    campaign.done(function (data) {
        if (data) {
            showMessage("Campaign saved successfully", "success");
            window.location.assign("/campaigns/");


        }
    });
    campaign.fail(function (jqXHR, textStatus) {
        console.log("Create Campaign Request failed: ", textStatus);
    });

};

var updateCampaign = function (filterVO) {
    var campaign = $.ajax({
        url: "/campaigns/update",
        method: "POST",
        data: JSON.stringify(filterVO),
        contentType: "application/json",
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
        dataType: "json"
    });
    campaign.done(function (data) {
        if (data) {

            window.location.assign("/campaigns/");
            showMessage("Campaign saved successfully", "success");

        }
    });
    campaign.fail(function (jqXHR, textStatus) {
        console.log("Edit Campaign Request failed: ", textStatus);
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

function advertiserAutoCompleteData() {
    $.ajax({
        url: "/advertisers/list",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            var agencyList = [];
            var d = new Date();
            for (var i = 0; i < data.length; i++) {
                var advertiser = document.getElementById('advertiserAutoComplete');
                $(advertiser).append('<option id=' + data[i].id + ' value=' + data[i].id + '>' + data[i].name + '</option>');
                if ($("#advertiserIdId").val() == undefined || $("#advertiserIdId").val() == "")
                    $("#advertiserIdId").val(data[i].id);
            }

        }
    });

};
// $(document).on('click', '#frontSubmit', function () {
//     uploadButton();
// });

window.getFrontFile = function (event) {
    uploadToS3(event, 'frontFile');
    console.log('frontFile:::::' + frontFile);
}

window.getBackFile = function (event) {
    uploadToS3(event, 'backFile');

}

function uploadToS3(event, type) {
    var formdata = new FormData();
    formdata.append("file", event.target.files[0]);
    var returnValue;

    $.ajax({
        url: '/campaigns/upload',
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
        success: function (data) {
            if (type === 'frontFile') {
                frontFile = data;
                console.log('setting frontFile');
            } else if (type === 'backFile') {
                backfile = data;
            }
            console.log('data::::::' + data);
        }
    });


}

function getCampaignReport(id) {
    var filterVO = {};
    filterVO.id = id;

    var request = $.ajax({
        url: "/campaigns/report",
        method: "POST",
        data: JSON.stringify(filterVO),
        contentType: "application/json",
        dataType: "json",
        headers: {
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
                if (result.eligibleUser) {
                    campaignContent = $('#campaignDetailId').dataTable({
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result.campaignList,
                        "dom": 'lBfrtip',
                        "buttons": [
                            {
                                extend: 'csvHtml5',
                                text: 'Download',
                                title: 'Campaign Detail'
                            },
                            'print'
                        ],
                        //"order": [19, 'desc'],
                        "columnDefs": [
                            {"width": "18%", "targets": 0},
                            {"width": "18%", "targets": 1},
                            {"width": "18%", "targets": 2},
                            {"width": "18%", "targets": 3},
                            {"width": "18%", "targets": 4},
                            {"width": "10%", "targets": 5}

                        ],
                        "columns": [

                            {
                                data: 'sentDate'
                            },
                            {
                                data: 'visitCount'
                            },
                            {
                                data: 'returnVisitCount'
                            },
                            {
                                data: 'mailCount'
                            },
                            {
                                data: 'spend',
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
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result.campaignList,
                        "dom": 'lBfrtip',
                        "buttons": [
                            {
                                extend: 'csvHtml5',
                                text: 'Download',
                                title: 'Campaign Detail'
                            },
                            'print'
                        ],
                        //"order": [19, 'desc'],
                        "columnDefs": [
                            {"width": "25%", "targets": 0},
                            {"width": "25%", "targets": 1},
                            {"width": "25%", "targets": 2},
                            {"width": "25%", "targets": 3}

                        ],
                        "columns": [

                            {
                                data: 'sentDate'
                            },
                            {
                                data: 'visitCount'
                            },
                            {
                                data: 'mailCount'
                            },
                            {
                                data: 'spend',
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
            console.log("Campaign detail Request failed: ", textStatus);
        }
    });
}


$(document).on('click', '.add-url', function () {

        if ($('#addUrl').is(':visible')) {
            $(this).parent().parent().parent().append('<div class="row" style="padding-left: 2%;padding-top: 1%;">' +
                '                <div class="col-sm-2">' +
                '                    <span class="circle-tab include-tab">INCLUDE</span>' +
                '                </div>' +
                '                <div class="col-sm-8">' +
                ' <div class="col-sm-8">\n' +
                '                            <input class="include-value" type="text" style="width: 100%;" name="includeUrl-' + includeIndex + '"/>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2">\n' +
                '                            <input class="include-option" type="radio" value="0" name="includeOption-' + includeIndex + '"/>Match\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2">\n' +
                '                            <input class="include-option" type="radio" value="1" name="includeOption-' + includeIndex + '" checked="checked" />Ignore\n' +
                '                        </div> ' +
                '                </div>' +
                '                <div class="col-sm-2">' +
                '                    <button type="button" class="btn btn-default btn-sm add-url">' +
                '                        <span class="glyphicon glyphicon-plus-sign"></span>' +
                '                    </button>' +
                '                    <button type="button" class="btn btn-default btn-sm remove-url">' +
                '                        <span class="glyphicon glyphicon-minus-sign"></span>' +
                '                    </button>' +
                '                </div>' +
                '            </div>');
        }
        else {
            $('#addUrl').show();
        }
        includeIndex++;

    }
);

$(document).on('click', '.remove-url', function () {
    $(this).parent().parent().empty();
});

$(document).on('click', '.add-exclude', function () {

        if ($('#excludeUrl').is(':visible')) {
            $(this).parent().parent().parent().append('<div class="row" style="padding-left: 2%;padding-top: 1%;">' +
                '                <div class="col-sm-2">' +
                '                    <span class="circle-tab exclude-tab">EXCLUDE</span>' +
                '                </div>' +
                '                <div class="col-sm-8">' +
                ' <div class="col-sm-8">\n' +
                '                            <input class="exclude-value" type="text" style="width: 100%;" name="excludeUrl-' + excludeIndex + '"/>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2">\n' +
                '                            <input class="exclude-option" type="radio" value="0" name="excludeOption-' + excludeIndex + '"/>Match\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2">\n' +
                '                            <input class="exclude-option" type="radio" value="1" name="excludeOption-' + excludeIndex + '" checked="checked" />Ignore\n' +
                '                        </div> ' +
                '                </div>' +
                '                <div class="col-sm-2">' +
                '                    <button type="button" class="btn btn-default btn-sm add-exclude">' +
                '                        <span class="glyphicon glyphicon-plus-sign"></span>' +
                '                    </button>' +
                '                    <button type="button" class="btn btn-default btn-sm remove-exclude">' +
                '                        <span class="glyphicon glyphicon-minus-sign"></span>' +
                '                    </button>' +
                '                </div>' +
                '            </div>');

        } else {
            $('#excludeUrl').show();
        }
        excludeIndex++;

    }
);

$(document).on('click', '.remove-exclude', function () {
    $(this).parent().parent().remove();
});






