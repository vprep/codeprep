externalCall();
function externalCall() {
    var hostname = document.location.hostname;
    var pathname = document.location.pathname;
    var pathLength = pathname.length;

    var cookieDetail = document.cookie;
    var userExist;
    var data = cookieDetail.split(";");
    var user_id;
    for (var i = 0; i < data.length; i++) {
        var inputData = data[i].split("=");
        if (inputData[0] == 'user_id') {
            user_id = inputData[1];
            userExist = true;
            break;
        }
    }
    if (!userExist) {
        var d = new Date();
        var created_user_id = 'u-' + d.getTime();
        document.cookie = "user_id=" + created_user_id;
        document.cookie = "Domain=" + hostname;
        document.cookie = "Path=" + hostname;
        document.cookie = "userExist=true";
        var expiration_date = new Date();
        expiration_date.setFullYear(expiration_date.getFullYear() + 10);
        document.cookie = "expires=" + expiration_date.toGMTString();
    }

    if (!userExist && pathLength > 1) {
        var url = 'http://aa.agkn.com/adscores/g.pixel?sid=9212294828' + '&_cv1=' + user_id + '&_cv2=7' + '&_cv3' + new Date() + '&_page=' + document.URL;
        window.location.href = url;
    } else {
        var xhttp = new XMLHttpRequest();
        var url2 = 'http://dev.idm.upsnap.com/idm/add/internal/advisor?cv1=' + cookieVO.cv1 + '&cv2=' + cookieVO.cv2 + '&cv3=' + cookieVO.cv3 + '&page=' + cookieVO.page;
        xhttp.open("GET", url2, true);
        xhttp.send();
    }
}