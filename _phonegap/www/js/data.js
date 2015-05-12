var markets_api_url = 'http://bittrex.brainpad.org/api/get_markets',
    market_summary_api_url = 'http://bittrex.brainpad.org/api/get_market_summary/',
    markets = null,
    watched_currencies_details = null;

$(function() {
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

function reloadWatchedCurrenciesMarketDetails(done) {
    fetchWatchedCurrenciesMarketDetails(function(details) {
        watched_currencies_details = details;
        done();
    });
}

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
    var watched_currencies = getSetting('watched_currencies');

    if (watched_currencies) {
        var result = [],
            total = watched_currencies.length,
            i = 0;

        watched_currencies.forEach(function (watched_currency) {
            fetchMarketDetails(watched_currency, function (details) {
                result.push(details);
                i++;

                if (i == total) {
                    done(result);
                }
            });
        });
    } else {
        done(false);
    }
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

function getSetting(key) {
    if (localStorage.settings) {
        var settings = localStorage.settings;
        var settings_obj = JSON.parse(settings);
    } else {
        // default dataset
        var settings_obj = {
            watched_currencies: [
            ]
        };
    }

    // returns whole settings object or only a value
    if (key) {
        return settings_obj[key];
    } else {
        return settings_obj;
    }
}

function saveSettings(key, updated_settings) {
    var settings = (getSetting()) ? getSetting() : {};
    settings[key] = updated_settings;
    localStorage.setItem('settings', JSON.stringify(settings));
}

function isWatchedCurrency(currency) {
    var watched_currencies = getSetting('watched_currencies');
    if (watched_currencies) {
	    return (watched_currencies.indexOf(currency) > -1) ? true : false;
    } else {
        return false;
    }
}