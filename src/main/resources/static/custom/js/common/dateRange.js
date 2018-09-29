var start;
var end;
var days = 90;
var productType;
$(document).ready(function () {
    var prevStartDate = $('#oldStartDate').val();
    var prevEndDate = $('#oldEndDate').val();
    productType = $('#callerTypeId').val();
    oneMonthFilter = $('#oneMonthFilter').val();
    if (oneMonthFilter) {
        start = $.trim(prevStartDate).length > 0 ? moment(prevStartDate,MMMM_D_YYYY ) : moment().subtract(29, 'days');
    } else {
        start = $.trim(prevStartDate).length > 0 ? moment(prevStartDate, MMMM_D_YYYY) : moment("November 1,2017");
    }
    end = $.trim(prevEndDate).length > 0 ? moment(prevEndDate,MMMM_D_YYYY) : moment();
    /*$("#callerTypeId").on('change', function () {
        searchWithDateRange(start, end);
    });*/
    $('#dateRangeFilter').daterangepicker({
        startDate: start,
        endDate: end,
        "opens": "left",
        ranges: {
            'Last 1 Week': [moment().subtract(6, 'days'), moment()],
            'Last 2 Weeks': [moment().subtract(13, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'Last 3 Months': [moment().subtract(90, 'days'), moment()],
            'Last 6 Months': [moment().subtract(180, 'days'), moment()],
            'Last 1 Year': [moment().subtract(1, 'year'), moment()]
        }
    }, searchWithDateRange);
    searchWithDateRange(start, end);
});

function searchWithDateRange(startDate, endDate) {
//    productType = $('#callerTypeId').val();
    start = startDate;
    end = endDate;
    $('#dateRangeFilter span').html(moment(start,MMMM_D_YYYY).format(MMMM_D_YYYY) + ' - ' + moment(end,MMMM_D_YYYY).format(MMMM_D_YYYY));
    search(start, end);
}

function searchWithAllDateRange() {
    start = null;
    end = null;
    $('#dateRangeFilter span').html(moment(start,MMMM_D_YYYY).format(MMMM_D_YYYY) + ' - ' + moment(end,MMMM_D_YYYY).format(MMMM_D_YYYY));
    search(start, end);
}

function getGenericFilter(start, end) {
    return {start: moment(start,YYYY_MM_DD).format(YYYY_MM_DD), end: moment(end,YYYY_MM_DD).format(YYYY_MM_DD)};
}
