var markets_api_url = 'http://bittrex.brainpad.org/api/get_markets';
var market_summary_api_url = 'http://bittrex.brainpad.org/api/get_market_summary/';
var tickerListview = $('#index .ticker-listview');
var markets = null;

$(function () {
    loadCurrencySettingsPage(function() {
        $('a.ui-btn.settings').tap(function() {
            $.mobile.changePage('#currency_settings', { changeHash: false, transition: 'slide' });
            return false;
        });
    });

    $('a.ui-btn.go_back').tap(function() {
        $.mobile.changePage('#index', { changeHash: false, transition: 'slide', reverse: true });
        return false;
    });
});

function loadIndexPage(done) {

    if (done) done();
}

function loadCurrencySettingsPage(done) {
    showLoader();

    $.getJSON(markets_api_url, function (data) {
        if (data.success) {
            markets = data.result;
            data.result.forEach(function (ticker) {
                tickerListview.append('<li><a href="#" data-market-name="' + ticker.MarketName + '"><img src="' + ticker.LogoUrl + '"><h2>' + ticker.MarketCurrency + '</h2><p>' + ticker.MarketCurrencyLong + '</p></a></li>');
            });
            hideLoader();
            bindListviewButtons();
            tickerListview.listview('refresh');
            if (done) done();
        }
    });
}

function getCurrencyDetailsFromMarkets(market_name, done) {
    if (markets) {
        markets.forEach(function(currency) {
            if (currency.MarketName == market_name) {
                done(currency);
            }
        });
    }
}

function bindListviewButtons() {
    $('.ticker-listview li a').tap(function () {
        var market_name = $(this).data('market-name');
        showLoader();

        $.getJSON(market_summary_api_url + market_name, function (data) {
            if (data.success) {
                var info = data.result[0];
                console.log(info);

                getCurrencyDetailsFromMarkets(info.MarketName, function(details) {
                    var c = convertAmountToSatoshis;

                    console.log(details);

                    $('#detail h1').html(details.MarketCurrencyLong);
                    $('#detail img.logo').attr('src', details.LogoUrl);
                    $('#detail .last').html(c(info.Last));
                    $('#detail .bid').html(c(info.Bid));
                    $('#detail .ask').html(c(info.Ask));
                    $('#detail .high').html(c(info.High));
                    $('#detail .low').html(c(info.Low));
                    $('#detail .btc_vol').html(c(info.BaseVolume));
                    $('#detail .currency_vol').html(c(info.Volume));

                    hideLoader();
                    $.mobile.changePage('#detail', { changeHash: false, transition: 'slide' });
                });
            }
        })

    });
}

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