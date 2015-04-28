function initialize() {
    loadIndexPage(function() {
        hideLoader();
    });

    $('a.ui-btn.go_back').tap(function() {
        $.mobile.changePage('#index', { changeHash: false, transition: 'slide', reverse: true });
        return false;
    });
}