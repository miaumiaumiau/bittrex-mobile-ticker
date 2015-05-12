var currency_settings_row_template = '<li><fieldset data-role="controlgroup" data-iconpos="right"><legend>!currency! / !currency_long!</legend><input type="checkbox" name="currency" style="float:right;margin-top:-16px" value="!market_name!"></fieldset></li>',
    CurrencySettingstickerListview = $('#currency_settings .ticker-listview');

function loadCurrencySettingsPage(done) {
    markets.forEach(function (ticker) {
        if (!ticker.LogoUrl) {
            ticker.LogoUrl = 'http://placehold.it/150x150';
        }

        var prepared_template = fill_template(currency_settings_row_template, {
            market_name: ticker.MarketName,
            currency: ticker.MarketCurrency,
            currency_long: ticker.MarketCurrencyLong
        });

        CurrencySettingstickerListview.append(prepared_template);
    });

    if (done) done();
}

$('a.ui-btn.settings').tap(function() {
    $.mobile.changePage('#currency_settings', { changeHash: false, transition: 'slide' });

    loadCurrencySettingsPage(function() {
        CurrencySettingstickerListview.listview('refresh');

        var watched_currencies = getSetting('watched_currencies');
        $('input[type=checkbox]').each(function() {
            if (watched_currencies.indexOf($(this.outerHTML).val()) > -1) {
                $(this).prop('checked', true);
            }
        });

        bindBackButton();

        $('a.ui-btn.save_currency_settings').tap(function() {
            var selected = [];
            $('input[type=checkbox]').each(function () {
                if (this.checked) {
                    selected.push($(this.outerHTML).val());
                }
            });

            saveSettings('watched_currencies', selected);
        });
    });

    return false;
});