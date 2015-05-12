function showLoader() {
    var $this = $(this),
        theme = $this.jqmData('theme') || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData('msgtext') || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData('textvisible') || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData('textonly'),
        html = $this.jqmData('html') || '';

    $.mobile.loading("show", {
        text: msgText,
        textVisible: textVisible,
        theme: theme,
        textonly: textonly,
        html: html
    });
}

function hideLoader() {
    $.mobile.loading('hide');
}

function convertAmountToSatoshis(amount) {
    return amount.toFixed(8);
}

function bindBackButton() {
    $('a.ui-btn.go_back').unbind('tap');
    $('a.ui-btn.go_back').tap(function() {
        reloadWatchedCurrenciesMarketDetails(function() {
            loadIndexPage(function() {
                hideLoader();
                $.mobile.changePage('#index', { changeHash: false, transition: 'slide', reverse: true });
            });
        });
        return false;
    });
}