var tableContent = null;
$(document).ready(function () {
    startLoader();
    var filterVO = {};
    var request = $.ajax({
        url: "/agencies/detail",
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
                tableContent = $('#agencyDetail').dataTable();
                if (result.agencyList.length > 0) {
                    tableContent.fnAddData(result);
                }
            } else {
                var role = $('#currentUserRole').val();
                if(role && (role == 0 )) {
                    tableContent = $('#agencyDetail').dataTable({
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result.agencyList,
                        "dom": 'lBfrtip',
                        "buttons": [
                            {
                                extend: 'csvHtml5',
                                text: 'Download',
                                title: 'Agency Detail'
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
                            {"width": "15%", "targets": 6},
                            {"width": "10%", "targets": 7}
                        ],
                        "columns": [
                            {
                                data: 'agencyName'
                            },
                            {
                                data: 'agencyId'
                            },
                            {
                                data: 'totalVisits'
                            },
                            {
                                data: 'returningVisitors'
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
                            }, {
                                data: 'agencyId',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html =
                                        '<a href="/agencies/edit?id=' + data + '"> ' +
                                        ' <button type="button" id="editAgency" data-agencyId="' + data + '" class="btn btn-primary upsnap-btn edit-btn" style="background-color:'+ primaryColour +'">Edit</button> ' +
                                        ' </a>'
                                    return html;
                                }
                            }
                        ],
                    });
                }
                else if(role && role==1){
                    tableContent = $('#agencyDetail').dataTable({
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result.agencyList,
                        "dom": 'lBfrtip',
                        "buttons": [
                            {
                                extend: 'csvHtml5',
                                text: 'Download',
                                title: 'Agency Detail'
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
                                data: 'agencyName'
                            },
                            {
                                data: 'agencyId'
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
                                data: 'agencyId',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html =
                                        '<a href="/agencies/edit?id=' + data + '"> ' +
                                        ' <button type="button" id="editAgency" data-agencyId="' + data + '" class="btn btn-primary upsnap-btn edit-btn" style="background-color:'+ primaryColour +'">Edit</button> ' +
                                        ' </a>'
                                    return html;
                                }
                            }
                        ],
                    });

                }else {
                    tableContent = $('#agencyDetail').dataTable({
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result.agencyList,
                        "dom": 'lBfrtip',
                        "buttons": [
                            {
                                extend: 'csvHtml5',
                                text: 'Download',
                                title: 'Agency Detail'
                            },
                            'print'
                        ],
                        //"order": [19, 'desc'],
                        "columnDefs": [
                            {"width": "20%", "targets": 0},
                            {"width": "20%", "targets": 1},
                            {"width": "20%", "targets": 2},
                            {"width": "20%", "targets": 3},
                            {"width": "20%", "targets": 4},
                            {"width": "20%", "targets": 5}

                        ],
                        "columns": [
                            {
                                data: 'agencyName'
                            },
                            {
                                data: 'agencyId'
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
                                data: 'agencyId',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html =
                                        '<a href="/agencies/view?id=' + data + '"> ' +
                                        ' <button type="button" id="viewAgency" data-agencyId="' + data + '" class="btn btn-primary upsnap-btn view-btn" style="background-color:'+ primaryColour +'">View</button> ' +
                                        ' </a>'
                                    return html;
                                }
                            }
                        ],
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
