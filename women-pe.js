$(".women-pe_video-slider-slide").each(function (index, element) {
  var index = $(this).index(".women-pe_video-slider-slide");
  $(this)
    .find(".women-pe_episode-tag-number")
    .text(index + 1);
});

var navbarHeight = $(".navbar-section").outerHeight();
var videoPlayerPos = $('#video-player').offset().top;
var video = $('#video-player').get(0);

$(".women-pe_single-video").click(function (e) {
  $('#play-video-first').remove();
  $('.women-pe_single-video').removeClass('active-video');
  $(this).addClass('active-video');
  $('#play-video').css('display', 'flex');
  var index = $(this).closest(".women-pe_video-slider-slide").index(".women-pe_video-slider-slide");
  $(".women-pe_video-slide-nav").find(".w-slider-dot").eq(index).click();
  $(".women-pe_video-pause-icon").css("display", "none");
  $(".women-pe_video-play-icon").css("display", "flex");
  $(this).find(".women-pe_video-play-icon").css("display", "flex");
  var bg = $(this).css("background-image");
  bg = bg.replace("url(", "").replace(")", "").replace(/\"/gi, "");
  var videoLink = $(this).find(".video-link").text();
  $(video).attr("src", videoLink);
  $(video).attr("source", videoLink);
  $(video).attr("poster", bg);
  $("html, body").animate(
    {
      scrollTop: videoPlayerPos,
    },
    1000
  );
  e.stopPropagation();
});

$('.women-pe_video-play-icon').click(function (e) {
  $('#play-video-first').remove();
  $('.women-pe_single-video').removeClass('active-video');
  $(this).closest('.women-pe_single-video').addClass('active-video');
  $('#play-video').css('display', 'none');
  var index = $(this).closest(".women-pe_video-slider-slide").index(".women-pe_video-slider-slide");
  $(".women-pe_video-slide-nav").find(".w-slider-dot").eq(index).click();
  $(".women-pe_video-pause-icon").css("display", "none");
  $(".women-pe_video-play-icon").css("display", "flex");
  $(this).siblings(".women-pe_video-pause-icon").css("display", "flex");
  $(this).css("display", "none");
  var bg = $(this).closest('.women-pe_single-video').css("background-image");
  bg = bg.replace("url(", "").replace(")", "").replace(/\"/gi, "");
  var videoLink = $(this).closest('.women-pe_single-video').find(".video-link").text();
  $(video).attr("src", videoLink);
  $(video).attr("source", videoLink);
  $(video).attr("poster", bg);
  video.play();
  $("html, body").animate(
    {
      scrollTop: videoPlayerPos,
    },
    1000
  );
  e.stopPropagation();
  return false;
});
$('#play-video-first').css('cursor', 'url("https://uploads-ssl.webflow.com/62f514bedf3a470ff6aa20df/631897e328e1b77dfb4f34f8_Group%201777-1.svg"), auto');
//on click of #play-video-first
$('#play-video-first').click(function () {
  video.play();
  $('#video-player').css('cursor', 'url("https://uploads-ssl.webflow.com/62f514bedf3a470ff6aa20df/631897e387816f222a6f414e_Group%201777.svg"), auto');
  //this remove
  $(this).remove();
  return false;
});
$('#video-player').click(function (e) {
  //$('#video-player').attr('controls', 'controls');
  if (video.paused) {
    video.play();
    video.setAttribute('controls', 'controls');
    var videoSource = $("#video-player").attr("source");
    $(".video-link").each(function (index, element) {
      if ($(this).text() == videoSource) {
        var thisText = $(this).text();
        $(this).closest('.women-pe_single-video').find('.women-pe_video-play-icon').css('display', 'none');
        $(this).closest('.women-pe_single-video').find('.women-pe_video-pause-icon').css('display', 'flex');
      }
    });
    $('#video-player').css('cursor', 'url("https://uploads-ssl.webflow.com/62f514bedf3a470ff6aa20df/631897e387816f222a6f414e_Group%201777.svg"), auto');
  }
  else {
    video.pause();
    video.setAttribute('controls', 'controls');
    var videoSource = $("#video-player").attr("source");
    $(".video-link").each(function (index, element) {
      if ($(this).text() == videoSource) {
        var thisText = $(this).text();
        $(this).closest('.women-pe_single-video').find('.women-pe_video-play-icon').css('display', 'flex');
        $(this).closest('.women-pe_single-video').find('.women-pe_video-pause-icon').css('display', 'none');
      }
    });
    $('#video-player').css('cursor', 'url("https://uploads-ssl.webflow.com/62f514bedf3a470ff6aa20df/631897e328e1b77dfb4f34f8_Group%201777-1.svg"), auto');
  }
  return false;
});

$('#video-player').mouseover(function (e) {
  setTimeout(function () {
    if (!video.paused) {
      $('#video-player').css('cursor', 'url("https://uploads-ssl.webflow.com/62f514bedf3a470ff6aa20df/631897e387816f222a6f414e_Group%201777.svg"), auto');
    }
    else {
      $('#video-player').css('cursor', 'url("https://uploads-ssl.webflow.com/62f514bedf3a470ff6aa20df/631897e328e1b77dfb4f34f8_Group%201777-1.svg"), auto');
    }
  }, 1);
});


var womenpeSingleSlide = Math.round($(".women-pe_video-slider-slide").outerWidth());
var womenpeSlideN = $('.women-pe_video-slider-slide').length;
var womenPeSlideList = Math.round($('.womne-pe_cms-list').outerWidth());
var WomenpeTotalWidth = (womenpeSlideN * womenpeSingleSlide) - womenPeSlideList;
var dd = new Dragdealer('women-pe_drag-tool', {
  speed: 0.1,
  requestAnimationFrame: true,
  horizontal: true,
  vertical: false,
  animationCallback: function (x, y) {
    $('.womne-pe_cms-list').css('margin-left', -x * (WomenpeTotalWidth + 32));
  }
});


function dragDetector() {

  var womenpeSingleSlide = Math.round($(".women-pe_video-slider-slide").outerWidth());
  var womenpeSlideN = $('.women-pe_video-slider-slide').length;
  var womenPeSlideList = Math.round($('.womne-pe_cms-list').outerWidth());
  var WomenpeTotalWidth = (womenpeSlideN * womenpeSingleSlide) - womenPeSlideList;
  var dd = new Dragdealer('women-pe_drag-tool', {
    speed: 0.1,
    requestAnimationFrame: true,
    horizontal: true,
    vertical: false,
    animationCallback: function (x, y) {
      $('.womne-pe_cms-list').css('margin-left', -x * (WomenpeTotalWidth + 32));
    }
  });

}

dragDetector();
var resizeDone;
var cachedWidth = $(window).width();
$(window).resize(function () {
  var newWidth = $(window).width();
  if (newWidth !== cachedWidth) {
    clearTimeout(resizeDone);
    resizeDone = setTimeout(doneResizing, 500);
    cachedWidth = newWidth;
  }
});

function doneResizing() {
  screenWidth = $(window).width();
  if (screenWidth > 991) {
    $('.animated-word, .animated-content, .animated-image, .animated-hero-visual, ._5_text_blocks, ._8_fundcards_parent, ._9_tagblock, ._9_tag_animation_parent, .animated-button, .animated-pill-button').css('opacity', '1');
  }
  dragDetector();
}

if ($(window).width() > 991) {
  $(".home-pe-101_wrappers").eq(1).css("display", "none");
  $(".home-pe-101_wrappers").eq(2).css("display", "none");
  $(".home-pe-101_selector").hover(function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    $(".home-pe-101_selector").find('.paragraph-small-copy').css("opacity", "0");
    $(this).find('.paragraph-small-copy').css("opacity", "1");
    var index = $(this).index();
    $(".home-pe-101_wrappers").css("display", "none");
    $(".home-pe-101_wrappers").eq(index).css("display", "block");
  });
}
else {
  var htmlCards = $(".home-pe-101_wrappers").eq(0).html();
  var htmlCards1 = $(".home-pe-101_wrappers").eq(1).html();
  var htmlCards2 = $(".home-pe-101_wrappers").eq(2).html();
  $(".home-pe-101_wrappers").remove();
  $(".home-pe-101_selector").eq(0).after('<div class="home-pe-101_wrappers">' + htmlCards + '</div>');
  $(".home-pe-101_selector").eq(1).after('<div class="home-pe-101_wrappers hidden-div">' + htmlCards1 + '</div>');
  $(".home-pe-101_selector").eq(2).after('<div class="home-pe-101_wrappers hidden-div">' + htmlCards2 + '</div>');

  $(".home-pe-101_selector").click(function () {
    if ($(this).hasClass("active")) {
      $('.home-pe-101_selector').removeClass("active");
      $(".home-pe-101_wrappers").css("display", "none");
      $(".home-pe-101_selector").find('.paragraph-small-copy').css("opacity", "0");
    }
    else {
      $(".home-pe-101_selector").find('.paragraph-small-copy').css("opacity", "0");
      $('.home-pe-101_selector').removeClass("active");
      $(this).addClass("active");
      $(this).find('.paragraph-small-copy').css("opacity", "1");
      var index = $(this).index('.home-pe-101_selector');
      $(".home-pe-101_wrappers").css("display", "none");
      $(".home-pe-101_wrappers").each(function () {
        var index1 = $(this).index('.home-pe-101_wrappers');
        if (index1 == index) {
          $(this).css("display", "block");
        }
        else {
          $(this).css("display", "none");
        }
      });
    }
  });
  $(".home-pe-101_wrappers").eq(0).css("display", "block");
}