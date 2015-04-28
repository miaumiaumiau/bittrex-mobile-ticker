var currency_settings_row_template = '<li><a href="#" data-market-name="!market_name!"><img src="!logo!"><h2>!currency!</h2><p>!currency_long!</p></a><input type="checkbox" name="currency" value="!market_name!"></li>',
    CurrencySettingstickerListview = $('#currency_settings .ticker-listview');

function loadCurrencySettingsPage(done) {
    markets.forEach(function (ticker) {
        if (!ticker.LogoUrl) {
            ticker.LogoUrl = 'http://placehold.it/150x150';
        }

        var prepared_template = fill_template(currency_settings_row_template, {
            market_name: ticker.MarketName,
            logo: ticker.LogoUrl,
            currency: ticker.MarketCurrency,
            currency_long: ticker.MarketCurrencyLong
        });

        CurrencySettingstickerListview.append(prepared_template);
    });

    hideLoader();
    if (done) done();
}

$('a.ui-btn.settings').tap(function() {
    showLoader();

    loadCurrencySettingsPage(function() {
        $.mobile.changePage('#currency_settings', { changeHash: false, transition: 'slide' });
        CurrencySettingstickerListview.listview('refresh');

        $('a.ui-btn.save_currency_settings').tap(function() {
            $('input[name="currency"]:checked').each(function (t, o) {
                console.log(t, o);
            });
        });
    });

    return false;
});