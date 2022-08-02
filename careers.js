//on page load
$(document).ready(function() {
    $.fn.isInViewport = function() {
        /*
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return ( elementBottom > viewportTop ) && ( elementTop < viewportBottom - $( this ).height() );
        */

        var top_of_element = $(this).offset().top;
        var bottom_of_element = $(this).offset().top + $(this).outerHeight();
        var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
        var top_of_screen = $(window).scrollTop();
        return (bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)
    };
    //blue-highlight wrap in span "tool-tip_wrapper"
    $('.blue-highlight').wrap('<span class="tool-tip_wrapper"></span>');
    //get text of highlight class  and save it in array 
    var highlight = [];
    var tip_single = [];
    var tip_single_elems = []
    $('.blue-highlight').each(function(index, el) {
        highlight.push($(this).text().toLocaleLowerCase().trim());
    });
    //
    $(".tool-tip_single_wrapper").each(function(index, el) {
        tip_single.push($(this).find('.tool-tip_title').text().toLocaleLowerCase().trim());
        tip_single_elems.push($(this))
    });
    //match highlight and tip_single if matched append tip_single to highlight
    for (var i = 0; i < highlight.length; i++) {
        for (var j = 0; j < tip_single.length; j++) {
            if (highlight[i] == tip_single[j]) {
                //blue-highlight get href link
                var href = $('.blue-highlight').eq(i).attr('href');
                $('.blue-highlight').eq(i).parent().append(' <div class="tool-tip_single_wrapper"><div class="tool-tip_single"><div class="tool-tip_title-wrap">MOONFARE GLOSSARY</div><div class="tool-tip_content"><p class="paragraph-medium bottom-margin-i-m tool-tip_title">'+$(tip_single_elems[j]).find('.tool-tip_title').text()+'</p><p class="paragraph-small bottom-margin-i-l tool-tip_paragraph">'+$(tip_single_elems[j]).find('.tool-tip_paragraph').text()+'</p><a class="text-link" href="'+$(tip_single_elems[j]).find('.text-link').attr('href')+'">Visit Glossary</a></div></div></div>');
            }
        }
    }
    //tool-tip_wrapper mouse enter
    $('.tool-tip_wrapper').mouseenter(function () {
        //this find "tool-tip_single" and set css to display block
        $(this).find('.tool-tip_single_wrapper').css('display', 'block');
    });
    $('.tool-tip_wrapper').mouseleave(function () {
        //this find "tool-tip_single" and set css to display block
        $(this).find('.tool-tip_single_wrapper').css('display', 'none');
    });
    $('.tool-tips').remove();

    $(".single-career-grid-wrap-left").click(function () {
        var selfl = $(this);
        setTimeout(function () {
            if ($(selfl).hasClass("active-left")) {
                $(".single-career-grid-wrap-left").removeClass("active-left");
                $(".single-career-grid-wrap-right").removeClass("active-right");
                $(".single-career-value-p-wrap").css("height", "0rem");
            } else {
            $(".single-career-grid-wrap-left").removeClass("active-left");
            $(".single-career-grid-wrap-right").removeClass("active-right");
            $(".single-career-value-p-wrap").css("height", "0rem");
            $(selfl).find(".single-career-value-p-wrap").css("height", "auto");
            $(selfl).addClass("active-left");
            }
        }, 500);
    });
    $(".single-career-grid-wrap-right").click(function () {
        var selfr = $(this);
        setTimeout(function () {
            if ($(selfr).hasClass("active-right")) {
                $(".single-career-grid-wrap-left").removeClass("active-left");
                $(".single-career-grid-wrap-right").removeClass("active-right");
                $(".single-career-value-p-wrap").css("height", "0rem");
            } else {
            $(".single-career-grid-wrap-left").removeClass("active-left");
            $(".single-career-grid-wrap-right").removeClass("active-right");
            $(".single-career-value-p-wrap").css("height", "0rem");
            $(selfr).find(".single-career-value-p-wrap").css("height", "auto");
            $(selfr).addClass("active-right");
            }
        }, 500);
    });

    $.getJSON(
        "https://boards-api.greenhouse.io/v1/boards/moonfare/departments?render_as=list",
        function (data) {
        var data = data.departments;
        var departments = $('.positions_grid-right');
        $.each(data, function (i, item) {
            if (item.jobs.length > 0) {
                var newDeptName = item.name;
                var newDeptTag = $(".positions_filter-tags-departments").append('<a href="#" class="positions_single-tag w-inline-block" data-depname="'+ newDeptName +'"><div class="dept-name">' + newDeptName +'</div></a>');
                let teamWrap = $('<div class="positions_grid-team"></div>');
                $('<div class="positions_grid-title-wrapper"><h3 class="h4 color-text-white bottom-margin-i-xl" data-depname="'+ newDeptName +'">' + item.name + '</h3></div>').appendTo(teamWrap);
                $.each(item.jobs, function (i, jobs) {
                    let teamJobGrid = $('<div class="positions_grid-job-list _8_fundcards_parent"></div>').appendTo(teamWrap);
                    $('<div class="_8_fundcards"></div><div class="positions_grid-single-job" data-jobid="'+ jobs.id + '" data-jobloc="'+ jobs.location.name + '" data-depname="'+ newDeptName +'"><div><p class="paragraph-medium color-text-white">' + jobs.title + '</p><p class="paragraph-medium color-text-white">' + jobs.location.name + '</p></div><img class="careers-arrow-icon" src="https://uploads-ssl.webflow.com/5fd0f5501ea5ad3d2b7f9c33/62ab54d1a565a57a507df176_pale-arrow.svg" alt=""></div>').appendTo(teamJobGrid);
                    departments.append(teamWrap);
                });
            }
        });
        }
    );

    $.getJSON(
        "https://boards-api.greenhouse.io/v1/boards/moonfare/offices?render_as=list",
        function (data) {
        var location = data.offices;

        $.each(location, function (i, item) {
            if (item.name.length > 0) {
            var newDeptTag = $(".positions_filter-tags-locations").append(
                '<a href="#" class="positions_single-tag w-inline-block" data-jobloc="' + item.name + '"><div class="loc-name">' + item.name + '</div></a>'
            );
            }
        });
        }
    );

    $(".positions_grid-right").on('click', '.positions_grid-single-job', function() {
        var jobId = $(this).data('jobid');
        window.location.href = "/open-position?gh_jid=" + jobId;
    });
    $(".careers_chart-legend-single-item").click(function () {
        $('.careers_chart-legend-single-item').removeClass('active');
        $(this).toggleClass('active');
    });
    $('.chart-single-icon-wrap').mouseenter(function () { 
        $(this).find(".chart-hover-child").css("display", "block");
    });
    $(".chart-single-icon-wrap").mouseleave(function () {
        $(this).find(".chart-hover-child").css("display", "none");
    });
    var totalTeams = $('.our-teams_slider').find('.our-teams_slider-single').length;
    var screenWidth = $(window).width();
    var ourTeamsSlider = $('.our-teams_slider-single').outerWidth();
    var ourTeamsDrag = new Dragdealer('our-team-drag', {
    horizontal: true,
    vertical: false,
    xPrecision: ourTeamsSlider,
    animationCallback: function(x, y) {
        $('.our-teams_drag-line-active').css('width', Math.round(x * 100) + '%');
        $('.our-teams_slider').css('margin-left', -x * ((ourTeamsSlider * totalTeams) - screenWidth +32));
    }
    });

    $(".our-teams_slider-wrap").on('click', '.our-teams_slider-right-arrow', function() {
        var barValue = ourTeamsDrag.getValue() + '';
        var barValueArray = barValue.split(',');
        var a = barValueArray[0];
        var b = barValueArray[1];
        ourTeamsDrag.setValue(parseFloat(a)+0.1, b);

    });
    
    $(".our-teams_slider-wrap").on('click', '.our-teams_slider-left-arrow', function() {
        var barValue = ourTeamsDrag.getValue() + '';
        var barValueArray = barValue.split(',');
        var a = barValueArray[0];
        var b = barValueArray[1];
        ourTeamsDrag.setValue(parseFloat(a)-0.1, b);

    });

    var chartSlider = $('#myChart').outerWidth();
    var timelineSlide = $('.chart-timeline').outerWidth();
    var myChartDrag = new Dragdealer('careers-drag', {
    horizontal: true,
    vertical: false,
    xPrecision: chartSlider,
    animationCallback: function(x, y) {
        $('.careers-chart_drag-line-active').css('width', Math.round(x * 100) + '%');
        $('#myChart').css('margin-left', -x * (chartSlider/2) /16 + 'REM');
        $('.chart-timeline').css('margin-left', -x * (timelineSlide/2) /16 + 'REM');
    }
    });

    $(".hiring-steps_dt").click(function () {
        $(".hiring-step_icon").removeClass("opened-hiring-step-bg");
        $(".hiring-step_icon-img").removeClass("opened-hiring-step_icon-img")
        if ($(this).hasClass("w--open")) {
        $(".hiring-step_icon").removeClass("opened-hiring-step-bg");
        $(".hiring-step_icon-img").removeClass("opened-hiring-step_icon-img")
        }
        else {
            $(this).closest(".hiring-steps_single").find(".hiring-step_icon").addClass("opened-hiring-step-bg");
            $(this).closest(".hiring-steps_single").find(".hiring-step_icon-img").addClass("opened-hiring-step_icon-img");
        }
    });

    //on click of hiring-steps_single
    $(".hiring-steps_single").click(function () {
        //this find hiring-steps_dt and trigger click
        $(this).find(".hiring-steps_dt").trigger("click");
    });

    //hiring-steps_dl on click
    $(".hiring-steps_dl").click(function () {
        //this parent hiring-steps_dt trigger click
        $(this).closest(".hiring-steps_dt").trigger("click");
    });

    //ANIMATIONS START

    if ($(window).width() > 991) {

        

        for (var b = document.getElementsByClassName("animated-word"), a = 0; a < b.length; a++) {
            var c = b.item(a);
            c.innerHTML = c.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="letter">$2</span>');
        }

        var a = anime.timeline({ loop: !1, autoplay: !1 });
        a.add({
            targets: ".fadeup0 .letter",
            translateY: [100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutQuint",
            duration: 800,
            delay: (b, a) => 30 * a,
            begin() {
                $(".fadeup0").css("opacity", "1");
            },
        });
        a.play();        
        
        var b = anime.timeline({ loop: !1, autoplay: !1 });
        b.add({
            targets: ".fadeup1 .letter",
            translateY: [100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutQuint",
            duration: 800,
            delay: (b, a) => 300 + 30 * a,
            begin() {
                $(".fadeup1").css("opacity", "1");
            },
        });
        var c = anime.timeline({ loop: !1, autoplay: !1 });
        c.add({
            targets: ".fadeup2 .letter",
            translateY: [100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutQuint",
            duration: 800,
            delay: (b, a) => 300 + 30 * a,
            begin() {
                $(".fadeup2").css("opacity", "1");
            },
        });
        var d = anime.timeline({ loop: !1, autoplay: !1 });
        d.add({
            targets: ".fadeup3 .letter",
            translateY: [100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutQuint",
            duration: 800,
            delay: (b, a) => 300 + 30 * a,
            begin() {
                $(".fadeup3").css("opacity", "1");
            },
        });
        var e = anime.timeline({ loop: !1, autoplay: !1 });
        e.add({
            targets: ".fadeup4 .letter",
            translateY: [100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutQuint",
            duration: 800,
            delay: (b, a) => 300 + 30 * a,
            begin() {
                $(".fadeup4").css("opacity", "1");
            },
        });
        var fas = anime.timeline({ loop: !1, autoplay: !1 });
        fas.add({
            targets: ".fadeup5 .letter",
            translateY: [100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutQuint",
            duration: 800,
            delay: (b, a) => 300 + 30 * a,
            begin() {
                $(".fadeup5").css("opacity", "1");
            },
        });
        $(window).scroll(function() {
            if ($(".fadeup1").isInViewport()) {
                b.play();
            }
            else if ($(".fadeup2").isInViewport()) {
                c.play();
                $('.careers_chart_legend_item').each(function (i) {
                    var $item = $(this).find("._8_fundcards");
                    setTimeout(function(e) { 
                      $item.click();
                    }, 100*i);
                });
            }
            else if ($(".chart-timeline").isInViewport()) {
                $('.chart-timeline-line').click();
                $('.chart-single-item_animation').each(function (i) {
                    var $item = $(this);
                    setTimeout(function() { 
                      $item.click();
                    }, 50*i);
                });
            }
            else if ($(".careers_values-title").isInViewport()) {
                d.play();
                $('.careers_values-content').click();
            }
            else if ($(".fadeup4").isInViewport()) {
                e.play();
            }
            else if ($(".fadeup5").isInViewport()) {
                fas.play();
            }
            else if ($(".positions_section").isInViewport()) {
                //for each ".positions_grid-single-job"
                $('.positions_grid-single-job').each(function (i) {
                    //this find "._8_fundcards" and trigger click
                    $(this).find("._8_fundcards").trigger("click");
                });
            }
        });

        var g,
            f = $(".home-page_hero-visual"),
            h = f.width(),
            i = $(window).scrollTop() + $(window).height();
        $(window).scroll(function () {
            (g = $(this).scrollTop()), f.width(h + g);
        });
    }
});