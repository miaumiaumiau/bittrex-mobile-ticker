<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Bittrex Mobile Ticker</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/js/libs/jquery-mobile/jquery.mobile-1.4.5.min.css"/>

    <style>
        #detail table {
            min-width: 200px;

        }
        #detail table tr td:first-of-type {
            text-align: right !important;
        }
    </style>

</head>
<body>

<div data-role="page" id="index">

    <div data-role="header">
        <h1>BIT<span style="font-weight:normal">TREX</span> Mobile Ticker</h1>
    </div>

    <div data-role="content">

        <ul class="ticker-listview" data-role="listview" data-filter="true" data-inset="true">
        </ul>

    </div>

</div>

<div data-role="page" id="detail">

    <div data-role="header">
        <button class="go_back">Back</button>
        <h1>Loading...</h1>
    </div>

    <div data-role="content">

        <div class="ui-grid-a">
            <div class="ui-block-a">
                <img class="logo" src="" alt="" />
            </div>
            <div class="ui-block-b">
                <div class="ui-grid-b">
                    <div class="ui-block-a"><div class="ui-bar ui-bar-a"><label>Last</label></div></div>
                    <div class="ui-block-b"><div class="ui-bar ui-bar-a"><p class="last"></p></div></div>
                    <div class="ui-block-a"><div class="ui-bar ui-bar-a"><label>Bid</label></div></div>
                    <div class="ui-block-b"><div class="ui-bar ui-bar-a"><p class="bid"></p></div></div>
                    <div class="ui-block-a"><div class="ui-bar ui-bar-a"><label>Ask</label></div></div>
                    <div class="ui-block-b"><div class="ui-bar ui-bar-a"><p class="ask"></p></div></div>
                    <div class="ui-block-a"><div class="ui-bar ui-bar-a"><label>24h High</label></div></div>
                    <div class="ui-block-b"><div class="ui-bar ui-bar-a"><p class="high"></p></div></div>
                    <div class="ui-block-a"><div class="ui-bar ui-bar-a"><label>24h Low</label></div></div>
                    <div class="ui-block-b"><div class="ui-bar ui-bar-a"><p class="low"></p></div></div>
                    <div class="ui-block-a"><div class="ui-bar ui-bar-a"><label>BTC Volume</label></div></div>
                    <div class="ui-block-b"><div class="ui-bar ui-bar-a"><p class="btc_vol"></p></div></div>
                    <div class="ui-block-a"><div class="ui-bar ui-bar-a"><label>Volume</label></div></div>
                    <div class="ui-block-b"><div class="ui-bar ui-bar-a"><p class="currency_vol"></p></div></div>
                </div>
            </div>
        </div>


    </div>

</div>

<button class="show-page-loading-msg" data-textonly="false" data-textvisible="false" data-msgtext="" data-inline="true">Icon (default)</button>

<script src="js/libs/jquery-1.11.2.min.js"></script>
<script src="js/libs/jquery-mobile/jquery.mobile-1.4.5.min.js"></script>
<script src="js/app.js"></script>

</body>
</html>