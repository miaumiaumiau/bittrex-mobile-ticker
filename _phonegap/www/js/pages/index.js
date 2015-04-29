var index_row_template = '<li><a href="#" data-market-name="!market_name!"><img src="!logo!"><h2>!currency!</h2><p>!currency_long!</p><p>(last: <strong>!last!</strong>)</p></a></li>',
    tickerListview = $('#index .ticker-listview');

function loadIndexPage(done) {
    // clear list
    // todo: 2nd time+ not working
    tickerListview.empty();

    settings.watched_currencies.forEach(function (market_name) {
        var ticker = getMarketByMarketName(market_name);

        if (!ticker.LogoUrl) {
            ticker.LogoUrl = 'http://www.money-insider.de/wp-content/uploads/2013/05/bitcoins-coin-muenze.png';
        }

        var prepared_template = fill_template(index_row_template, {
            market_name: ticker.MarketName,
            logo: ticker.LogoUrl,
            currency: ticker.MarketCurrency,
            currency_long: ticker.MarketCurrencyLong,
            last: convertAmountToSatoshis(getWatchedCurrencyDetailsByMarketName(ticker.MarketName).Last)
        });

        tickerListview.append(prepared_template);
    });

    hideLoader();
    bindListviewButtons();
    tickerListview.listview('refresh');

    if (done) done();
}