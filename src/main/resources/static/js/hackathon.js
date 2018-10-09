$(document).ready(function () {
      loadSolution();
});

var tableContent;

function loadSolution() {
    var request = $.ajax({
        url: "./json/solutions",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            console.log("result: "+JSON.stringify(result));
            if (tableContent != null) {
                tableContent.fnClearTable();
                tableContent = $('#reviewRatingTable').dataTable();
                if (result.length > 0) {
                    tableContent.fnAddData(result.data);
                }
            } else {
                tableContent = $('#reviewRatingTable').dataTable({
                    "lengthMenu": [25, 50, 100],
                    "autoWidth": false,
                    "data": result,
                    "order": [1, 'asc'],
                    "columnDefs": [
                        {"width": "25%", "targets": 0},
                        {"width": "25%", "targets": 1},
                        {"width": "25%", "targets": 2},
                        {"width": "25%", "targets": 3}

                    ],
                    "columns": [{
                        data: "codeSubmissionId"
                    }, {
                        data: 'submittedDate'
                    },
                        {data: 'codeSubmissionId'},
                        {data: 'codeSubmissionId'}
                    ]
                });
            }
        },
        error: function (jqXHR, textStatus) {
            console.log("Product detail Request failed: ", textStatus);
        }
    }).always(function () {
    });
}


var data;
jQuery(document).on('click', '#reviewRatingTable tr', function () {
    data = tableContent.fnGetData(this);
    if (data != null) {
        var request = $.ajax({
            url: "./solution?id=1",
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (result) {
                console.log("result: "+result);
                $("#solDisplayId").html(jQuery.parseHTML(JSON.stringify(result)));
                $("#popUpId").click();

            },
            error: function (jqXHR, textStatus) {
                console.log("Product detail Request failed: ", textStatus);
            }
        }).always(function () {
        });


    }
});
