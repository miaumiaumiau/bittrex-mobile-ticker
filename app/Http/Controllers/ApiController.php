<?php namespace App\Http\Controllers;

use App\Http\Requests;
use GuzzleHttp;

class ApiController extends Controller
{

    private $client;

    public function __construct()
    {
        $this->client = new GuzzleHttp\Client();
    }

    public function get_markets()
    {
        $response = $this->client->get('https://bittrex.com/api/v1.1/public/getmarkets');
        return response()->json($response->json());
    }

    public function get_market_summary($currency)
    {
        $response = $this->client->get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=' . $currency);
        return response()->json($response->json());
    }

}