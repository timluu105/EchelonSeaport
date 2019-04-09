<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TranslationsController extends Controller
{
    function getTranslations($language) {
		session()->put("locale", $language);

		$path = base_path() . '/resources/assets/js/translations/translations.json';
		$arr = \JsonWithComments::decode(file_get_contents($path));

		if(!array_key_exists($language, $arr)) {
			return response()->json([
				"success" => false,
				"message" => "Could not retrieve language"
			]);
		}

		$response = [
			"success" => true,
			"data" => $arr[$language]
		];

		return json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
	}
}
