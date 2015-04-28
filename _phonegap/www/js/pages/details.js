function bindListviewButtons() {
    $('.ticker-listview li a').tap(function () {
        var market_name = $(this).data('market-name');
        showLoader();

        $.getJSON(market_summary_api_url + market_name, function (data) {
            if (data.success) {
                var info = data.result[0];
                console.log(info);

                var details = getMarketByMarketName(info.MarketName);
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
            }
        })

    });
}