<?php namespace App\Http\Controllers;

use App\Http\Requests;

class FrontendController extends Controller
{

    public function index()
    {
        return view('index');
    }

}