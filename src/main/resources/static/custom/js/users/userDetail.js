var tableContent = null;
$(document).ready(function () {
    startLoader();
    var filterVO = {};
    var request = $.ajax({
        url: "/users/detail",
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
                tableContent = $('#userDetail').dataTable();
                if (result.length > 0) {
                    tableContent.fnAddData(result);
                }
            } else {
                var role = $('#currentUserRole').val();
                if (role && (role == 0 || role == 1)) {
                    tableContent = $('#userDetail').dataTable({
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result,
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
                                data: 'userVO.userId'
                            },
                            {
                                data: 'userVO.firstName'
                            },
                            {
                                data: 'userVO.email'
                            },
                            {
                                data: 'userType'
                            },
                            {
                                data: 'userVO.enabled',
                                render: function (data, type, row) {
                                    if (data) {
                                        return 'Active';
                                    }
                                    return 'InActive';

                                }
                            },
                            {
                                data: 'id',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html =
                                        '<a href="/users/edit?id=' + data + '">' +
                                        ' <button type="button" id="editCampaign" data-campaignId="' + data + '" class="btn btn-primary upsnap-btn edit-btn" style="background-color:'+ primaryColour +'">Edit</button> ' +
                                        ' </a>';

                                    return html;

                                }
                            }
                        ]
                    });
                } else {
                    tableContent = $('#userDetail').dataTable({
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result,
                        //"order": [19, 'desc'],
                        "columnDefs": [
                            {"width": "15%", "targets": 0},
                            {"width": "15%", "targets": 1},
                            {"width": "15%", "targets": 2},
                            {"width": "15%", "targets": 3},
                            {"width": "15%", "targets": 4}
                        ],
                        "columns": [
                            {
                                data: 'userVO.userId'
                            },
                            {
                                data: 'userVO.firstName'
                            },
                            {
                                data: 'userVO.email'
                            },
                            {
                                data: 'userType'
                            },
                            {
                                data: 'userVO.enabled',
                                render: function (data, type, row) {
                                    if (data) {
                                        return 'Active';
                                    }
                                    return 'InActive';

                                }
                            }
                        ]
                    });
                }
            }

        },
        error: function (jqXHR, textStatus) {
            console.log("Agency detail Request failed: ", textStatus);
        }
    }).always(function () {
        changePaginationCSS();
        closeLoader();
    });

});
