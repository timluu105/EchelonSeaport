/*
|--------------------------------------------------------------------------
| Poof JS
|--------------------------------------------------------------------------
*/

function poof() {
    let bgTop = 0,
        frame = 0,
        frames = 6,
        frameSize = 32,
        frameRate = 80,
        poof = $("#poof");

    const animate = function() {
        if (frame < frames) {
            poof.css({ backgroundPosition: "0 " + bgTop + "px" });
            bgTop -= frameSize;
            frame++;
            setTimeout(animate, frameRate);
        }
    };

    animate();

    setTimeout(function() {
        poof.hide();
    }, frames * frameRate);
}
