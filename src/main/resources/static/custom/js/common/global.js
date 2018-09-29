const MMMM_D_YYYY = "MMMM D, YYYY";
const YYYY_MM_DD = "YYYY-MM-DD";
const YYYY_MM_DD_HH_MM_SS_A = 'YYYY-MM-DD hh:mm:ss a';
const MIN_LENGTH_TEXT = 0;
var MAX_SEARCH_RESULT = 20;
var count = 0, max = 0;

var startLoader = function () {
    $('.global-loader').show();
};
var closeLoader = function () {
    if (count == max) {
        $('.global-loader').hide();
        count=0;
    }
};
var startModalLoader = function (modalId) {
    var modalLoaderHtml = '<div class="text-center modal-loader">' +
        '<img src="' + CONTEXT_PATH + '/resources/img/load.gif" style="height: 50px;position: relative;top:45%;">' +
        '</div>';
    $('#' + modalId + ' .modal-body').append(modalLoaderHtml);
};
var closeModalLoader = function (modalId) {
    $('#' + modalId + ' .modal-body .modal-loader').replaceWith('');
};

var startWidgetLoader = function (selecter) {
    var html = '<div class="text-center widget-loader">' +
        '<img src="' + CONTEXT_PATH + '/resources/img/load.gif" style="height: 20px;position: relative;top:45%;">' +
        '</div>';
    $(selecter).html(html);
};

var highlightTab = function () {
	var activeView = $("#viewName").val();
	$("ul#nav li a").each(function() {
		var text = $.trim($(this).text().toLowerCase());
		if (text == activeView) {
			$(this).parent().addClass("active");
		}
	});
};
$(document).ready(function() {
    highlightTab();
});

$(document).on('click','.stopPropogation',function( event ) {
    event.stopPropagation();

});
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

function addCommas(nStr) {
    if (nStr == null) {
        return '';
    }
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

$(document).on('click','.copyToClipboard',function () {
    var text=$(this).attr('clipboardText');
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea); var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
});

function createFormDataUsingJson(filterData){
    if(typeof (filterData.start) !== 'undefined' && filterData.start != undefined && filterData.start!=null) {
        filterData.start = moment(filterData.start).format(YYYY_MM_DD);
    }
    if(typeof (filterData.end) !== 'undefined' && filterData.end != undefined && filterData.end!=null) {
        filterData.end = moment(filterData.end).format(YYYY_MM_DD);
    }
    var html='';
    $.each(filterData, function(k, v) {
        if(k!=null && v!=null && typeof v != 'undefined') {
            if (Array.isArray(v)) {
                for (var i = 0; i < v.length; i++) {
                    html += '<input type="hidden" name="' + k + '[' + i + ']" value="' + v[i] + '"/>';
                }
            } else {
                html += '<input type="hidden" name="' + k + '" value="' + v + '"/>';
            }
        }
    });
    return html;
}

function autoComplete(request, response, dataList) {
    var searchResult = $.grep(dataList, function (item) {
        return item.toLowerCase().indexOf($.trim(request.term.toLowerCase())) > -1;
    });
    if (searchResult.length > MAX_SEARCH_RESULT) {
        searchResult = searchResult.slice(0, MAX_SEARCH_RESULT);
    }
    response(searchResult);
}

function textBoxToSelect(id,list){
    var html = '<select class="form-control" id="'+id+'">' +
        '<option></option>';
    var oldValue=$('#'+id).val();
    for (var i = 0; i < list.length; i++) {
        if(list[i]==oldValue){
            html = html + '<option selected>' + list[i] + '</option>';
        }else{
            html = html + '<option>' + list[i] + '</option>';
        }

    }
    html = html + '</select>';
    return html;
}

function textBoxToSelect(id,list,name){
    var html = '<select class="form-control" id="'+id+'"  name="'+name+'">' +
        '<option></option>';
    var oldValue=$('#'+id).val();
    for (var i = 0; i < list.length; i++) {
        if(list[i]==oldValue){
            html = html + '<option selected>' + list[i] + '</option>';
        }else{
            html = html + '<option>' + list[i] + '</option>';
        }

    }
    html = html + '</select>';
    return html;
}


var oneviewAjax = function (requestJson, callback, always, fail) {
    var request = $.ajax(requestJson);
    request = request.done(function (result) {
        if (result != null) {
            try {
                var resp = JSON.parse(result);
                if (resp.errorCode == 403) {
                    $('#forbiddenWarning').modal('show');
                } else {
                    callback(result);
                }
            }
            catch (err) {
                callback(result);
            }
        } else {
            callback(result);
        }

    });

    request = request.always(function () {
        if(always!=null)
            always();
    });
    request = request.fail(function (jqXHR, textStatus) {
        if(fail!=null)
            fail(jqXHR, textStatus);
    });
};

function refreshSlider(){
    $(".dateSlider").slider('refresh');
}