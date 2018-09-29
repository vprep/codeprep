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

var reportChart = function (filterVO) {
    var reportWidget = $.ajax({
        url: "/reports/graph",
        method: "POST",
        data: JSON.stringify(filterVO),
        contentType: "application/json",
        dataType: "json",
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
    });
    reportWidget.done(function (data) {
        var json = getChartJson(data)
        $("#graphId").highcharts(json);
    });
    reportWidget.fail(function (jqXHR, textStatus) {
        console.log("Store Summary Widget Request failed: ", textStatus);
    });
    reportWidget.always(function () {
        count++;
        closeLoader();
    });

};

var reportSummary = function (filterVO) {
    var reportSummary = $.ajax({
        url: "/reports/summary",
        method: "POST",
        data: JSON.stringify(filterVO),
        contentType: "application/json",
        dataType: "json",
        headers: {
            'X-XSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        },
    });
    reportSummary.done(function (data) {
        $("#totalVisitsId").html(data.totalVisit);
        $("#totalSentId").html(data.totalSent);
        $("#totalSpentId").html(appendCurrency(data.totalSpent));
        $("#totalCostId").html(appendCurrency(data.totalCost));
        if($("#totalReturningVisitsId") !== null) {
            $("#totalReturningVisitsId").html(data.totalReturningVisits);
        }

    });
    reportSummary.always(function () {
        count++;
        closeLoader();
    });
}
max = 2;
function search(start, end) {
    startLoader();
    var filterVO = {};
    filterVO = $.extend(filterVO, getGenericFilter(start, end));
    filterVO.productType = $('#callerTypeId').val();
    var includeId = $('#includeId').val();
    if(includeId != null && includeId.length>0 && includeId === '1') {
        filterVO.urlFlag = true;
    }
    reportChart(filterVO);
    reportSummary(filterVO);
}

var generateReport = function (data) {
    var json = getChartJson(data);
    $("#graphId").highcharts(json);
};

var getChartJson = function (data) {
    var json = {
        chart: {
            type: 'column',
            zoomType: 'xy'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: data.categories
        },
        yAxis: [{
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Percent',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            shared: true
        },

        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Eligible Visitors',
            data: data.seriesMap["TotalVisits"],
            color: getSecondaryColour()
        }, {
            name: 'Total Sent',
            data: data.seriesMap["TotalSent"],
            color: getPrimaryColour()
        }, {
            name: 'Total Sent/Eligible Visitors',
            type: 'spline',
            yAxis: 1,
            data: data.seriesMap["percent"],
            visible: false,
            tooltip: {
                valueSuffix: ' %'
            }

        }]
    };
    return json;
};


