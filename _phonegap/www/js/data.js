var markets_api_url = 'http://bittrex.brainpad.org/api/get_markets',
    market_summary_api_url = 'http://bittrex.brainpad.org/api/get_market_summary/',
    settings = null,
    markets = null,
    watched_currencies_details = null;

$(function() {
    settings = loadSettings();
    showLoader();

	// initial loading of markets data
	fetchMarkets(function(data) {
		markets = data;
        // initial loading of watched currencies details
        fetchWatchedCurrenciesMarketDetails(function(details) {
            watched_currencies_details = details;
            initialize();
        });
	});
});

function fetchMarkets(done) {
    $.getJSON(markets_api_url, function (data) {
        if (data.success) {
            done(data.result);
        } else {
        	done(false);
        }
    });
}

function fetchWatchedCurrenciesMarketDetails(done) {
    var result = [],
        total = settings.watched_currencies.length,
        i = 0;

    settings.watched_currencies.forEach(function(watched_currency) {
        fetchMarketDetails(watched_currency, function(details) {
            result.push(details);
            i++;

            if (i == total) {
                done(result);
            }
        });
    });
}

function fetchMarketDetails(market_name, done) {
    $.getJSON(market_summary_api_url + market_name, function (data) {
        if (data.success) {
            done(data.result[0]);
		} else {
			done(false);
		}
	});
}

function getMarketByMarketName(market_name) {
    var market = false;
    if (markets) {
        markets.forEach(function(m) {
            if (m.MarketName == market_name) {
                market = m;
            }
        });
    }
    return market;
}

function getWatchedCurrencyDetailsByMarketName(market_name) {
    var market = false;
    if (watched_currencies_details) {
        watched_currencies_details.forEach(function(m) {
            if (m.MarketName == market_name) {
                market = m;
            }
        });
    }
    return market;
}

function loadSettings() {
	return {
		watched_currencies: [
			'BTC-UTC',
			'BTC-XEM'
		]
	};
}

function saveSettings(updated_settings) {
	settings = updated_settings;
}

function isWatchedCurrency(currency) {
	var settings = loadSettings();
	return (settings.watched_currencies.indexOf(currency) > -1) ? true : false;
}