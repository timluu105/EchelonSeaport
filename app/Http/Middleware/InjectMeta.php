<?php namespace App\Http\Middleware;

use Closure;
use App\Models\Meta;

class InjectMeta {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        view()->share('meta', Meta::at($request));
        return $next($request);
    }

}
