<template>
    <div class="feature-video">
		<div style="overflow:hidden; position:relative;">
			<div class="main-banner-cta">
				<div id="main-banner-before-video" class="main-banner-text">
					EchelonSeaport rises
				</div>
				<div id="main-banner-after-video" class="main-banner-text">
					<img id="main-banner-after-video-img" :src="logo_image_src"/>
					<div id="main-banner-after-video-text">Opening 2019</div>
				</div>
				<a id="watch-video" style="display: none" ref="watchVideoButton" class="button" href="#" @click="playVideo">Watch the video</a>
			</div>
			<div style="height: 650px;">
				<video
				    id="my-player"
				    class="video-js"
				    controls
				    preload="auto"
				    data-setup='{}'>
				  <source :src="video_src" type="video/mp4"></source>
				  <p class="vjs-no-js">
				    To view this video please enable JavaScript, and consider upgrading to a
				    web browser that
				    <a href="//videojs.com/html5-video-support/" target="_blank">
				      supports HTML5 video
				    </a>
				  </p>
				  </video>
				  <div id="imageContainer">
					<img id="video-screenshot" :src="still_image_src">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ScrollToAnchor from "mixins/scroll-to-anchor.js";
	import IncludeScript from "mixins/include-script.js";

    import ContactRegistration from "sections/contact-registration.vue";

    export default {
        components: {
        },
        mixins: [ScrollToAnchor, IncludeScript],
        data: function() {
            var data = {
                "video_src": "/video/BostonSeaport3.mp4",
                "still_image_src": "/img/video-still-1.jpeg",
				"logo_image_src": "/img/Echelon-Seaport-Logo.png",
                "video_element_id": "#my-player"
            };

            return data;
        },
		created: function() {
            var self = this;
			//this.includeJavascriptTag("//vjs.zencdn.net/7.3.0/video.min.js");
			setTimeout(function() {
			    self.$refs.watchVideoButton.click();
			}, 3000);

		},
        mounted: function() {
            var self = this;

            $(function() {
                $(".feature-video").css({"background-color": "black"});

                videojs("#my-player").ready(function(){
                  var myPlayer = this;

                  //myPlayer.currentTime(0);
                    myPlayer.on('ended', function() {
                        //$(".feature-video").css({animation: "showit 4s"});
						var fadeTime = 2500;

                        var animationPromise = $("#my-player").animate({"opacity": 0}, fadeTime).promise();

                        var fadeItemsIn = function() {
                            $(".main-banner-cta").fadeIn(fadeTime);
                            $("#main-banner-after-video").fadeIn(fadeTime);
                            $("#main-banner-after-video-img").fadeIn(fadeTime);
                            var handle = $("#main-banner-after-video-text").fadeIn(fadeTime, function() {
                                console.log("Done fading");
							});
							console.log("Start fading");
                            return handle;
                        };

                        function stopScrollIfMouseMoves() {
                            $(":animated").stop();
                            $(window).unbind('mousemove', stopScrollIfMouseMoves);
                        };

                        $(window).mousemove(stopScrollIfMouseMoves);

                        fadeItemsIn().delay(1500).promise().then(function() {
                            self.scrollToAnchor("#overview", 2000);
                        });
                        //animationPromise.then(fadeItemsIn);
                    });
                });
                //var video = videojs('#my-player', {});
                //$("#my-player").hide();
                console.log(videojs.players);
                //videojs.players["my-player"].hide();

                //$("#imageContainer").hide();
                $("#imageContainer").css({animation: "panzoom 12s infinite"});

                $("#main-banner-before-video").fadeIn(4000);
            });
        },
        methods: {
            playVideo: function() {
                videojs.players["my-player"].show();

				// since the animation is still running while we get the element's
				// dimension, we need to add a little to the dimensions to compensate for the delay.
                var sizeAdjust = 10;

                var currentWidth = $("#imageContainer").width() + sizeAdjust;
                var currentHeight = $("#imageContainer").height() + sizeAdjust;
                var currentOpacity = $("#imageContainer").css("opacity");

                /**
				 * When the user clicks, we want to stop the "zoom in" effect and
				 * fade the still image to black before displaying the actual video.
				 * In order to stop the "zoom in" effect, we need to preserve the
				 * height and width in our fade animation, otherwise the height and width
				 * would jump to their original values.
				 */
                /*
                $.keyframe.define([{
                    name: 'hidevideostilloverlay',
                    '0%':   {
                        opacity: currentOpacity,
                        height: currentHeight,
                        width: currentWidth
                    },
                    '100%': {
                        opacity: opacity,
                    }
                }]);
                */
/*
                $("#imageContainer").css({
                    opacity: opacity,
                    height: height,
                    width: width
                }).css({animation: "hidevideostilloverlay"});
*/
/*
                $("#imageContainer").css({
                    opacity: opacity,
                    height: height,
                    width: width
                }).css({animation: "hideanimation"});
*/

                $("#watch-video").fadeOut(1000);
                $(".main-banner-cta").fadeOut(2000, function() {
                    $("#main-banner-before-video").css({"display": "none"});
                });

                $("video").css({"display": "block"});
                $("#video-screenshot").fadeOut(3000, function() {
                    $("#my-player").animate({"opacity": 1}, function() {
                        videojs.players["my-player"].play();
                    });
                });
            }
        }
    };
</script>
<style>
	@import "//vjs.zencdn.net/7.3.0/video-js.min.css";
	@import "/js/keyframes.js";

	.feature-video	{
			background-color: #eae6e0;
			/*padding: 5em 0;*/
		}


		.main-banner-cta	{
			position: absolute;
			left: 0;
			margin-left: 25%;
			text-align: center;
			top: 32%;
			width: 60%;
			z-index: 3;
		}

		.main-banner-text	{
			color: #fff;
			/*font-size: 3vw;*/
			font-size: 3em;
			font-weight: 600;
			line-height: 1em;
			margin-bottom: 0.75em;
			font-family: "Grenale-Medium";
			text-transform: uppercase;
		}

		.main-banner-cta	.button {
			background-color: transparent;
			border: 1px solid white;
			/*border-radius: 0.25em;*/
			color: white;
			padding: 10px 20px;
			text-align: center;
			text-decoration: none;
		}



		#imageContainer {
            background-color: #000;
            width: 100%;
            height: auto;
            overflow: hidden;
			max-height: 650px;
        }

		#imageContainer img {
		  /*animation: panzoom 20s infinite;*/
		  width: 100%;
		  transform: scale3d(1.5, 1.5, 1.5);
		  opacity: .3;
		}

		@keyframes panzoom {

			0% {
			  opacity: 0;
			}
			5% {
			  opacity: 1;
			}
			95% {
				transform: scale3d(1.5, 1.5, 1.5);
				animation-timing-function: ease-in;
				opacity: 1;
			}
			100% {
				transform: scale3d(2, 2, 2);
				opacity: 0;
			}
		}

		@keyframes hideanimation {
			100% {
				opacity: 0;
			}
		}

		@keyframes showit {
			100% {
				opacity: 1;
			}
		}

		@keyframes hideit {
			0% {
			  opacity: 1;
			}
			100% {
			  opacity: 0;
			}
		}

		@media (min-width:1000px) {
			.main-banner-cta	{
				margin-left: 25%;
				width: 50%;
			}
		}

		@media (max-width:876px) {
			.main-banner-cta	{
				margin-left: 10%;
				width: 80%;
			}
		}

		@media (max-width:768px) {

			.main-banner-text	{
				font-size: 1.5em;
				margin-bottom: 1.25em;
			}
		}

		@media (max-width:496px) {

			.main-banner-text	{
				font-size: 1em;
				margin-bottom: 1em;
			}

			.main-banner-cta	.button {
				font-size: 0.75em;
				padding: 5px 20px;
			}
		}

		#my-player {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;

			opacity: 0;
		}

		#imageContainer: {
			position: absolute;
		}

		#imageContainer img {
		  margin-top: 50px;
		}

		.vjs-big-play-button {
			display: none !important;
		}

		.vjs-mute-control {
			display: none !important;
		}

		.vjs-remaining-time-display {
			display: none !important;
		}

		.vjs-play-progress .vjs-slider-bar {
			color: #faf9f4;
		}

		#main-banner-after-video, #main-banner-after-video-img, #main-banner-after-video-text {
			display: none;
		}

		#main-banner-after-video-img {
			display: block;
			margin: 0 auto;
			width: 50%;
			height: auto;
			margin-botton: 25px important
		}
</style>