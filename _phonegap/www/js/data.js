var markets_api_url = 'http://bittrex.brainpad.org/api/get_markets';
var market_summary_api_url = 'http://bittrex.brainpad.org/api/get_market_summary/';

var settings = loadSettings();
var markets = null;
var market_details = null;

$(function() {
    showLoader();
	
	// initial loading of markets data
	fetchMarkets(function(data) {
		markets = data;
		initialize();
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

function fetchMarketDetails(market_name, done) {
    $.getJSON(market_summary_api_url + market_name, function (data) {
        if (data.success) {
            done(data.result[0]);
		} else {
			done(false);
		}
	});

	done({});
}

function loadSettings() {
	settings = {
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