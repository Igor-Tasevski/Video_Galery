$(document).ready(function () {

	// Set up link thumbnails
	$('a.videoLink').each(function () {

		var FilePath = 'video/' + $(this).attr('href').split('/').pop().replace('.mp4', '.jpg')
		var videoCaption = $(this).data('caption');

		$(this).css('background-image', 'url(' + FilePath + ')');
		$(this).html('<div class="caption">' + videoCaption + '</div><img class="play" src="../images/play_icon.png" />');

	});

	$('.videoLink').click(function () {

		// Get attributes from link clicked
		var videoFile = $(this).attr('href');

		var videoWidth = Number($(this).attr('videowidth'));
		var videoHeight = Number($(this).attr('videoheight'));

		// Set up HTMLvideo player code with above variables
		var videoCode = '<video width="' + videoWidth + '" height="' + videoHeight + '" controls autoplay autobuffer><source src="video/' + videoFile + '.ogv" type="video/ogg" /><source src="video/' + videoFile + '.mp4" type="video/mp4" /><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + videoWidth + '" height="' + (videoHeight + 40) + '" id="lynda_video_player" align="middle"><param name="allowScriptAccess" value="sameDomain"><param name="allowFullScreen" value="true"><param name="movie" value="lynda_video_player.swf?videoFile=video/' + videoFile + '.mp4&amp;skinFile=lynda_video_skin.swf&amp;videoFileWidth=' + videoWidth + '&amp;videoFileHeight=' + videoHeight + '"><param name="quality" value="high"><param name="wmode" value="transparent"><param name="scale" value="noscale"><param name="salign" value="lt"><embed src="lynda_video_player.swf?videoFile=video/' + videoFile + '.mp4&amp;skinFile=lynda_video_skin.swf&amp;videoFileWidth=' + videoWidth + '&amp;videoFileHeight=' + videoHeight + '" quality="high" width="' + videoWidth + '" height="' + (videoHeight + 40) + '" name="lynda_video_player" align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" scale="noscale" salign="lt" wmode="transparent" allowfullscreen="true" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object></video>';

		// Set inline HTML content
		$('#videoPlayer').html(videoCode);

		// Initializing FancyBox vor videoLinks
		Fancybox.bind("[data-fancybox]", {
			video: {
				autoplay: true,
				controls: true,
			},
			buttons: [
				"play",
				"close"
			],
			caption: function (instance, item) {
				return $(item).data('caption');
			},
			afterClose: function () {
				// Clear the video player container to stop the video
				$('#videoPlayer').html('');
			}
		});

		// Add onclick to video tag for Android
		var myNavigator = navigator.userAgent.toLowerCase();
		var testForAndroid = myNavigator.indexOf("android") > -1;
		if (testForAndroid) {
			$('#videoPlayer source[type*="video/mp4"]').removeAttr('type');
			$('#videoPlayer video').attr('onclick', 'this.play();')
		}

	});

});