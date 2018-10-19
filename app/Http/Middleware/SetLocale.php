<?php namespace App\Http\Middleware;

use Closure;
use App\Models\Meta;
use App;

class SetLocale {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
    	$languageHeader = $request->header("X-Selected-Language");

    	if($languageHeader !== null) {
    		$locale = $languageHeader;
		} else {
    		$locale = $request->session()->get("locale", "en");
		}

        App::setLocale($locale);

        return $next($request);
    }

}
