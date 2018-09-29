var tableContent = null;
$(document).ready(function () {

    $("#filterButton").on('click', function () {
        if ($("#filterPanel").is(':visible')) {
            $("#filterPanel").hide("blind", 500);
            $("#filterButton").removeClass("active");
        } else {
            $("#filterPanel").show("blind", 500);
            $("#filterButton").addClass("active");
        }
    });

    $(document).on('click', '.searchSubmit', function () {
        search(start, end);

    });

    $(document).on('click', '.reset', function () {
        $("#callerTypeId").val('-1').trigger('change');
        $("#includeId").val('0').trigger('change');
        search(start, end);
    });

    });

function search(start, end) {
    startLoader();
    var filterVO = {};
    filterVO = $.extend(filterVO, getGenericFilter(start, end));
    filterVO.productType = parseInt($('#callerTypeId').val());
    filterVO.campaignStatus = parseInt($('#includeId').val());


    var request = $.ajax({
        url: "/campaigns/detail",
        method: "POST",
        data: JSON.stringify(filterVO),
        contentType: "application/json",
        dataType: "json",
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
        success: function (result) {
            if (tableContent != null) {
                tableContent.fnClearTable();
                tableContent = $('#campaignDetail').dataTable();
                if (result.length > 0) {
                    tableContent.fnAddData(result);
                }
            } else {
                var role = $('#currentUserRole').val();
                if (role && (role == 0)) {
                    tableContent = $('#campaignDetail').dataTable({
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result,
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
                            {"width": "7%", "targets": 0},
                            {"width": "7%", "targets": 1},
                            {"width": "7%", "targets": 2},
                            {"width": "7%", "targets": 3},
                            {"width": "7%", "targets": 4},
                            {"width": "7%", "targets": 5},
                            {"width": "7%", "targets": 6},
                            {"width": "7%", "targets": 7},
                            {"width": "7%", "targets": 8},
                            {"width": "7%", "targets": 9},
                            {"width": "7%", "targets": 10},
                            {"width": "6%", "targets": 11},
                            {"width": "6%", "targets": 12}
                        ],
                        "columns": [
                            {
                                data: 'name'
                            },
                            {
                                data: 'id'
                            },
                            {
                                data: 'product'
                            },
                            {
                                data: 'status'
                            },
                            {
                                data: 'startDate'
                            },
                            {
                                data: 'endDate'
                            },
                            {
                                data: 'totalVisits'
                            },
                            {
                                data: 'revisitingUsers'
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
                            }, {
                                data: 'id',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html =
                                        '<a href="/campaigns/edit?id=' + data + '"> ' +
                                        ' <button type="button" id="editCampaign" data-campaignId="' + data + '" class="btn btn-primary edit-btn upsnap-btn" style="background-color:'+ primaryColour +'">Edit</button> ' +
                                        ' </a>';

                                    return html;

                                }
                            },
                            {
                                data: 'id',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html =
                                        ' <button type="button" id="resumeCampaign" data-campaignId="' + data + '" class="btn btn-primary resume-btn upsnap-btn" style="background-color:'+ primaryColour +'">Resume</button> ';
                                    if (row.status == 'PAUSED') {
                                        return html;
                                    }
                                    return '';
                                }
                            }
                        ]
                    });
                }
                else if (role && (role == 1)) {
                    tableContent = $('#campaignDetail').dataTable({
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result,
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
                            {"width": "7%", "targets": 0},
                            {"width": "7%", "targets": 1},
                            {"width": "7%", "targets": 2},
                            {"width": "7%", "targets": 3},
                            {"width": "7%", "targets": 4},
                            {"width": "7%", "targets": 5},
                            {"width": "7%", "targets": 6},
                            {"width": "7%", "targets": 7},
                            {"width": "7%", "targets": 8},
                            {"width": "7%", "targets": 9},
                            {"width": "7%", "targets": 10},
                            {"width": "7%", "targets": 11}
                        ],
                        "columns": [
                            {
                                data: 'name'
                            },
                            {
                                data: 'id'
                            },
                            {
                                data: 'product'
                            },
                            {
                                data: 'status'
                            },
                            {
                                data: 'startDate'
                            },
                            {
                                data: 'endDate'
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
                            }, {
                                data: 'id',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html =
                                        '<a href="/campaigns/edit?id=' + data + '"> ' +
                                        ' <button type="button" id="editCampaign" data-campaignId="' + data + '" class="btn btn-primary edit-btn upsnap-btn" style="background-color:'+ primaryColour +'">Edit</button> ' +
                                        ' </a>';

                                    return html;

                                }
                            },
                            {
                                data: 'id',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html =
                                        ' <button type="button" id="resumeCampaign" data-campaignId="' + data + '" class="btn btn-primary edit-btn upsnap-btn" style="background-color:'+ primaryColour +'">Resume</button> ';
                                    if (row.status == 'PAUSED') {
                                        return html;
                                    }
                                    return '';
                                }
                            }
                        ]
                    });
                } else {
                    tableContent = $('#campaignDetail').dataTable({
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result,
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
                            {"width": "8%", "targets": 0},
                            {"width": "8%", "targets": 1},
                            {"width": "8%", "targets": 2},
                            {"width": "8%", "targets": 3},
                            {"width": "8%", "targets": 4},
                            {"width": "8%", "targets": 5},
                            {"width": "7%", "targets": 6},
                            {"width": "7%", "targets": 7},
                            {"width": "7%", "targets": 8},
                            {"width": "7%", "targets": 9},
                            {"width": "7%", "targets": 10}
                        ],
                        "columns": [
                            {
                                data: 'name'
                            },
                            {
                                data: 'id'
                            },
                            {
                                data: 'product'
                            },
                            {
                                data: 'status'
                            },
                            {
                                data: 'startDate'
                            },
                            {
                                data: 'endDate'
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
                            },
                            {
                                data: 'id',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html =
                                        '<a href="/campaigns/view?id=' + data + '"> ' +
                                        ' <button type="button" id="viewCampaign" data-campaignId="' + data + '" class="btn btn-primary view-btn upsnap-btn" style="background-color:'+ primaryColour +'">View</button> ' +
                                        ' </a>';

                                    return html;

                                }
                            }
                        ]
                    });
                }
            }
        },
        error: function (jqXHR, textStatus) {
            console.log("Advertiser detail Request failed: ", textStatus);
        }
    }).always(function () {
        changePaginationCSS();
        closeLoader();
    });
}

jQuery(document).on('click', '.resume-btn', function (e) {
    campaignId = $(this).attr("data-campaignId");
    var request = $.ajax({
        url: "/campaigns/update/status?campaignId=" + campaignId,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
        success: function (result) {
            location.reload();
        }
    });
});
