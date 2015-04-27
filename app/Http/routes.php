<?php
Route::get('', 'FrontendController@index');
Route::get('api/get_markets', 'ApiController@get_markets');
Route::get('api/get_market_summary/{currency}', 'ApiController@get_market_summary');
