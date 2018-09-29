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
    var filterVO = {};
    filterVO = $.extend(filterVO, getGenericFilter(start, end));
    listAdvertiser(filterVO);
}

function testAPI() {
    var http = new XMLHttpRequest();
    var url = "http://aa.agkn.com/adscores/g.pixel?sid=9212294828&page=www.google.com?";
    http.open("GET", url, true);
    http.setRequestHeader( 'Access-Control-ALLow-Origin', '*');
//Send the proper header information along with the request
   http.setRequestHeader("Content-type", "application/json");

    http.onprogress = function () {
        console.log('LOADING', http.status);
    };

    http.onload = function () {
        console.log('DONE', http.status);
    };

    http.send();
}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 || this.status == 302) {
           console.log(this.responseText);
        }
    };
    xhttp.open("GET", "http://aa.agkn.com/adscores/g.pixel?sid=9212294828", true);
    xhttp.send();
}

function callToNeustar() {
    var href = document.location.href;
    var hostname = document.location.hostname;
    var pathname = document.location.pathname;
    var protocol = document.location.protocol;
    var pathLength = pathname.length;

    var cookieDetail = document.cookie;
    var userExist;
    var data = cookieDetail.split(";");
    var user_id;
    for(var i=0; i < data.length; i++){
        var inputData = data[i].split("=");
        if(inputData[0]=='user_id'){
            user_id = inputData[1];
            userExist=true;
            break;
        }
    }
    if(!userExist && pathLength >1){
        var d = new Date();
        var created_user_id = 'u-'+d.getTime();
        document.cookie = "user_id="+created_user_id;
        document.cookie="Domain="+hostname;
        document.cookie="Path=/";
        document.cookie="userExist=true"
        var expiration_date = new Date();
        expiration_date.setFullYear(expiration_date.getFullYear() + 10);
        document.cookie="expires=" + expiration_date.toGMTString();
    }

    var cookieVO = {}
    cookieVO.sid = '9212294828';
    cookieVO.cv1 = user_id;
    cookieVO.cv2 =7;
    cookieVO.cv3 = new Date();
    cookieVO.page = document.URL;
    if(!userExist && pathLength >1) {
        var url = 'http://aa.agkn.com/adscores/g.pixel?sid=' + cookieVO.sid + '&_cv1=' + cookieVO.cv1 + '&_cv2=' + cookieVO.cv2 + '&_cv3' + cookieVO.cv3 + '&_page=' + cookieVO.page;
        window.location.href = url;
    } else {
        var xhttp = new XMLHttpRequest();
        var url2 = 'http://dev.idm.upsnap.com/idm/add/internal/advisor?cv1='+ cookieVO.cv1 +'&cv2='+ cookieVO.cv2 +'&cv3='+ cookieVO.cv3 +'&page='+ cookieVO.page;
        xhttp.open("GET", url2, true);
        xhttp.send();
    }
}

function listAdvertiser(filterVO) {
    startLoader();
    var request = $.ajax({
        url: "/advertisers/detail",
        method: "POST",
        data: JSON.stringify(filterVO),
        contentType: "application/json",
        dataType: "json",
        headers:
            {
                'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
            },
        success: function (result) {
            if (tableContent != null) {
                tableContent.fnClearTable();
                tableContent = $('#advertiserDetail').dataTable();
                if (result.length > 0) {
                    tableContent.fnAddData(result);
                }
            } else {
                var role = $('#currentUserRole').val();
                if (role && (role == 0)) {
                    tableContent = $('#advertiserDetail').dataTable({
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result,
                        "dom": 'lBfrtip',
                        "buttons": [
                            {
                                extend: 'csvHtml5',
                                text: 'Download',
                                title: 'Advertiser Detail'
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
                            {"width": "10%", "targets": 7},
                            {"width": "10%", "targets": 8}
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
                                data: 'returningVisitors'
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
                                        '<a href="/advertisers/edit?id=' + data + '"> ' +
                                        ' <button type="button" id="editAdvertiser" data-advertiserId="' + data + '" class="btn btn-primary upsnap-btn edit-btn" style="background-color:'+ primaryColour +'">Edit</button> ' +
                                        ' </a>';
                                    return html;
                                }
                            },
                            {
                                data: 'id',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html ;
                                    if(row.active){

                                        if(row.activeDate != null){
                                            html =     ' <button type="button"class="btn btn-primary upsnap-btn" style="background-color: green">'+$.datepicker.formatDate('mm-dd-yy', new Date(row.activeDate))+'</button> ';
                                        } else {
                                            html =     ' <button type="button"class="btn btn-primary upsnap-btn" style="background-color: green">'+$.datepicker.formatDate('mm-dd-yy', new Date())+'</button> ';
                                        }


                                    } else {
                                        if(row.activeDate != null){
                                            html =      ' <button type="button"class="btn btn-primary upsnap-btn" style="background-color: red">'+$.datepicker.formatDate('mm-dd-yy', new Date(row.activeDate))+'</button> ';
                                        } else {
                                            html =      ' <button type="button"class="btn btn-primary upsnap-btn" style="background-color: red">'+$.datepicker.formatDate('mm-dd-yy', new Date(row.createdDate))+'</button> ';
                                        }
                                    }

                                    return html;
                                }
                            }
                        ]
                    });
                } else if (role && (role == 1)) {
                    tableContent = $('#advertiserDetail').dataTable({
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result,
                        "dom": 'lBfrtip',
                        "buttons": [
                            {
                                extend: 'csvHtml5',
                                text: 'Download',
                                title: 'Advertiser Detail'
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
                            {"width": "10%", "targets": 6},
                            {"width": "10%", "targets": 7},
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
                            }, {
                                data: 'id',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html =
                                        '<a href="/advertisers/edit?id=' + data + '"> ' +
                                        ' <button type="button" id="editAdvertiser" data-advertiserId="' + data + '" class="btn btn-primary upsnap-btn edit-btn" style="background-color:'+ primaryColour +'">Edit</button> ' +
                                        ' </a>';
                                    return html;
                                }
                            },
                            {
                                data: 'id',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html ;
                                    if(row.active){

                                        if(row.activeDate != null){
                                            html =     ' <button type="button"class="btn btn-primary upsnap-btn" style="background-color: green">'+$.datepicker.formatDate('mm-dd-yy', new Date(row.activeDate))+'</button> ';
                                        } else {
                                            html =     ' <button type="button"class="btn btn-primary upsnap-btn" style="background-color: green">'+$.datepicker.formatDate('mm-dd-yy', new Date())+'</button> ';
                                        }


                                    } else {
                                        if(row.activeDate != null){
                                            html =      ' <button type="button"class="btn btn-primary upsnap-btn" style="background-color: red">'+$.datepicker.formatDate('mm-dd-yy', new Date(row.activeDate))+'</button> ';
                                        } else {
                                            html =      ' <button type="button"class="btn btn-primary upsnap-btn" style="background-color: red">'+$.datepicker.formatDate('mm-dd-yy', new Date(row.createdDate))+'</button> ';
                                        }
                                    }

                                    return html;
                                }
                            }
                        ]
                    });
                } else {
                    tableContent = $('#advertiserDetail').dataTable({
                        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "ALL"]],
                        "autoWidth": false,
                        "data": result,
                        "dom": 'lBfrtip',
                        "buttons": [
                            {
                                extend: 'csvHtml5',
                                text: 'Download',
                                title: 'Advertiser Detail'
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
                            {"width": "15%", "targets": 7}
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
                            },

                            {
                                data: 'id',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html =
                                        '<a href="/advertisers/view?id=' + data + '"> ' +
                                        ' <button type="button" id="viewAdvertiser" data-advertiserId="' + data + '" class="btn btn-primary upsnap-btn view-btn" style="background-color:'+ primaryColour +'">View  </button> ' +
                                        ' </a>';
                                    return html;
                                }
                            },
                            {
                                data: 'id',
                                render: function (data, type, row) {
                                    // data-userid="' + row.userId + '"
                                    var html ;
                                    if(row.active){

                                        if(row.activeDate != null){
                                            html =     ' <button type="button"class="btn btn-primary upsnap-btn" style="background-color: green">'+$.datepicker.formatDate('mm-dd-yy', new Date(row.activeDate))+'</button> ';
                                        } else {
                                            html =     ' <button type="button"class="btn btn-primary upsnap-btn" style="background-color: green">'+$.datepicker.formatDate('mm-dd-yy', new Date())+'</button> ';
                                        }


                                    } else {
                                        if(row.activeDate != null){
                                            html =      ' <button type="button"class="btn btn-primary upsnap-btn" style="background-color: red">'+$.datepicker.formatDate('mm-dd-yy', new Date(row.activeDate))+'</button> ';
                                        } else {
                                            html =      ' <button type="button"class="btn btn-primary upsnap-btn" style="background-color: red">'+$.datepicker.formatDate('mm-dd-yy', new Date(row.createdDate))+'</button> ';
                                        }
                                    }

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

$(document).on('click', '#editAdvertiser', function () {
    var data = {id: $(this).attr("data-advertiserId")};
    console.log("data: "+data);
    var agencyCall = $.ajax({
        url: "/advertisers/detail/data",
        method: "GET",
        data: data,
        contentType: "application/json",
        dataType: "json"
    });

    var request = $.ajax({
        url:"/advertisers/create",
        method:"GET",
        contenType:"application/json",
        dataType:"text"
    })

    agencyCall.done(function(result){
        document.getElementById('aadvertiserNameId').value = advertiserName.advertiserName;
    });
    agencyCall.fail(function (jqXHR, textStatus) {
        console.log("Agency info request failed: ", textStatus);
    });

});
