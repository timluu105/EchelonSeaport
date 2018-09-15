<script type="text/javascript">
    var env = {
        debug: {{ Config::get('app.debug') ? 'true' : 'false' }},
        siteName: "{{ env('APP_NAME') }}",
        googleKey: "{{ env('GOOGLE_KEY') }}",
        apiToken: "{{ Auth::check() ? '?api_token=' . Auth::user()->api_token : '' }}",
        preview: "{{ $preview }}"
    };
</script>
