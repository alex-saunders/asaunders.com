var dummyString = "<code><xmp> <!-- desktop --> \n" +
    " <!-- Content Template - 4thway 200 Height --> \n" +
    " <style type='text/css'> \n" +
    " body { background: #FFF url('http://content.very.co.uk/assets/static/2016/08/4thways/22-beauty/skins/loreal.jpg') no-repeat scroll center top !important; } \n" +
    " div#sliderTarget .banner>a { width: 764px; height: 200px; display: block; } \n" +
    " div#sliderTarget .banner-1 { background-image: url('http://content.very.co.uk/assets/static/2016/08/4thways/22-beauty/loreal.jpg');} \n" +
    " div#sliderTarget .banner-2 { background-image: url('http://content.very.co.uk/assets/static/2016/07/4thways/04-july-beauty-edit/04-beauty-edit-4thway.jpg');} \n" +
    " div#sliderTarget .banner-2 p {position: absolute; text-align: center; top:58px; left:111px; font-size:14px; line-height:15px; font-family: helvetica; color: #000;} \n" +
    " </style> \n" +
    "  \n" +
    " <div id='sliderTarget' class='slides'> \n" +
    " 	<div class='banner banner-1'> \n" +
    " 	<a href='/loreal-paris/e/b/4294877610.end' title='l'Oreal'></a> \n" +
    " 	</div> \n" +
    " 	<script type='text/template' id='sliderTemplate'> \n" +
    " 	<div class='banner banner-2'> \n" +
    " 		<a href='/beauty-edit.page'> \n" +
    " 			<p> \n" +
    " 				Get expert hints and tips on how <br /> \n" +
    " 				to create the hottest beauty and <br /> \n" +
    " 				hair trends, plus shop your <br /> \n" +
    " 				favourite Brands \n" +
    " 			</p> \n" +
    " 		</a> \n" +
    " 	</div> \n" +
    " 	</script> \n" +
    " </div> \n" +
    " <!-- Banner Tagging --> \n" +
    " <!-- Content Template - 4thway JS (all brands) (if needed) --></xmp></code> ";

var banners = {};

$(document).ready(function() {
    $("#retrieved-4thway-panel").hide();
    $("#new-4thway-panel").hide();
    $("#very-retrieved-4thway").html(dummyString);
    $(".container-4thway").each(function(index) {
        if (!($(this).hasClass('active'))) {
            $(this).hide();
        }
    });

    $('.template').each(function() {
        $(this).hide();
    })

    $("#retrieved-4thway-panel").find(".4thway-container-tab").each(function() {
        $(this).hide();
    })

});

/* Tabs function */
$(".tab-link").each(function(index) {
    $(this).on("click", function() {
        var brand = $(this).find("a").attr('brand');
        var type = $(this).find("a").attr('type');
        var new4thway = $(this).find("a").attr('new4thway');

        $('body').find('.4thway-container-tab.active').removeClass('active');
        $(this).closest('.4thway-container-tab').addClass('active');


        loadContainer(brand, type, new4thway);

    });
});

function loadContainer(brand, type, new4thway) {

    // Checking that current active panel is not the selected one
    if (($(".container-4thway.template.active").hasClass(brand)) &&
        ($(".container-4thway.template.active").hasClass(type)) &&
        ($(".container-4thway.template.active").hasClass(new4thway))) {} else {

        // hiding all active containers
        $(".container-4thway.template.active").each(function() {
            $(this).hide();
            $(this).removeClass("active");
        });

        // showing container if its already been generated
        $foundContainer = $('.container-4thway.template.' + brand + '.' + type + '.' + new4thway);
        if ($foundContainer.length) {
            $foundContainer.addClass('active');
            $foundContainer.fadeIn();
        } else {
            // else generate container
            createContainer(brand, type, new4thway);
        }
    }
}

function createContainer(brand, type, new4thway) {

    if (new4thway == "true") {
        $mainPanel = $("#new-4thway-panel").find(".padding-fix").eq(0);
    }
    if (new4thway == "false") {
        $mainPanel = $("#retrieved-4thway-panel").find(".padding-fix").eq(0);
    }

    var container4thway = $(".container-4thway.template").eq(0).clone().appendTo($mainPanel);

    container4thway.addClass(brand);
    container4thway.addClass(type);
    container4thway.addClass(new4thway);

    container4thway.addClass("active");

    container4thway.fadeIn();
    containerBody = container4thway.find(".padding-fix");

        var temp;
        if (type == "desktop") {
            temp = appendTemplate("new-skins-container", containerBody, brand, type);
        }
        temp = appendTemplate("new-banners-container", containerBody, brand, type);

        if (new4thway == "true") {
            addBannerInputGroup(temp.find(".new-banner.template").eq(0));
            addBannerInputGroup(temp.find(".new-banner.template").eq(0));
            addBannerInputGroup(temp.find(".new-banner.template").eq(0));
        } else {
            bannersIndex = brand+type;
            var foundBanners = banners[bannersIndex];

            if (foundBanners.length < 1) {
                alert('No Banners Found for ' + brand + " (" + type + ")");
                addBannerInputGroup(temp.find(".new-banner.template").eq(0));
                addBannerInputGroup(temp.find(".new-banner.template").eq(0));
            } else {
                loadBanners(foundBanners);
            }
        }

}

function appendTemplate(template, parent, brand, type) {
    var temp = $("." + template + ".template").eq(0).clone().appendTo(parent);
    temp.addClass(brand, type);
    temp.fadeIn();

    temp.find(".generate-4thway").attr(brand, brand);
    temp.find(".generate-4thway").attr(type, type);

    if (brand == "very") {
        temp.find(".custom-url").each(function() {
            $(this).text("very.co.uk")
        });
    } else {
        temp.find(".custom-url").each(function() {
            $(this).text("littlewoods.com")
        });
    }

    return temp;
}

function loadEdit4thwayPanel() {

    $("#retrieved-4thway-panel").find(".4thway-container-tab").each(function() {
        $(this).hide();
    });
    $("#retrieved-4thway-panel").hide();

    $(".function-selector").each(function() {
        $(this).removeClass('active');
    });
    $(".function-selector.edit").addClass('active');

    $veryURL = $("#very-url").val();
    $lwURL = $("#lw-url").val();
    banners = {};

    var dataFound = false;

    $.ajax({
        type: "POST",
        url: "php/get-page-very.php",
        data:{ veryURL: $veryURL,
                type: "desktop" },
        success: function(data){
            if (data == "") {
                alert('Could not find Page for Very (desktop)!');
            } else {
                dataFound = true;
                scrape4thway(data, "very", "desktop");
            }
        }
    })

    $.ajax({
        type: "POST",
        url: "php/get-page-very.php",
        data:{ veryURL: $veryURL,
            type: "mobile" },
        success: function(data){
            if (data == "") {
                alert('Could not find Page for Very (mobile)!');
            } else {
                dataFound = true;
                scrape4thway(data, "very", "mobile");
            }
        }
    })

    $.ajax({
        type: "POST",
        url: "php/get-page-lw.php",
        data:{ lwURL: $lwURL,
            type: "desktop" },
        success: function(data){
            if (data == "") {
                alert('Could not find Page for Littlewoods (desktop)!');
            } else {
                dataFound = true;
                scrape4thway(data, "littlewoods", "desktop");
            }
        }
    })

    $.ajax({
        type: "POST",
        url: "php/get-page-lw.php",
        data:{ lwURL: $lwURL,
            type: "mobile" },
        success: function(data){
            if (data == "") {
                alert('Could not find Page for Littlewoods (mobile)!');
            } else {
                dataFound = true;
                scrape4thway(data, "littlewoods", "mobile");
            }
        }
    })

    var ajaxCallsComplete = 0;

    $( document ).ajaxComplete(function(event, xhr, settings) {
        if (!dataFound) {
            $(".function-selector").each(function() {
                $(this).removeClass('active');
            });
        } else {
            ajaxCallsComplete++;
            var width = (ajaxCallsComplete * 25) + "%";
            $("#progress-bar").css('width', width)
            if (ajaxCallsComplete >= 4) {
                ajaxCallsComplete = 0;

                setTimeout(function() {
                    $('#myModal').modal('hide')

                    $("#retrieved-4thway-panel").fadeIn();
                    $("#retrieved-4thway-panel").find('.tab-link').eq(0).trigger('click');


                    setTimeout(function() {
                        $("#progress-bar").css('width', 0);
                    }, 500);
                }, 500);
            }
        }
    })

}

function scrape4thway(html, brand, type) {

    $("#new-4thway-panel").find(".container-4thway.active").hide();
    $("#new-4thway-panel").hide();


    var foundBanners = [];
    var foundBannersCSS = [];
    var count = 0;

    $document = $(html);
    $4thway = $document.find("#sliderTarget");
    $4thway.find(".banner").each(function() {
        foundBanners[count] = $(this).html();
        count++;
    })

    $script = $document.find("#sliderTemplate").html();
    $script = $.parseHTML($script);

    $.each( $script, function( index, element ) {
        if (element.nodeName !== "#text") {
            foundBanners[count] = element.innerHTML;
            count++;
        }
    });

    bannersIndex = brand+type;
    banners[bannersIndex] = foundBanners;

    $("#retrieved-4thway-panel").find(".4thway-container-tab."+brand).show();

}

function loadBanners(banners) {

    $edit4thwayPanel = $(".container-4thway.active");

    for (var i = 0; i < banners.length; i++) {
        addBannerInputGroup($edit4thwayPanel.find(".new-banner.template").eq(0));
    }

    count = 1;

    $.each(banners, function(index, element) {
        var href = ($($(element)[0]).attr('href'));
        var title = ($($(element)[0]).attr('title'));
        $edit4thwayPanel.find(".link").eq(index + 1).val(href);
        $edit4thwayPanel.find(".title").eq(index + 1).val(title);
    });

}

function loadNew4thwayPanel() {
    $("#retrieved-4thway-panel").find(".container-4thway.active").hide();
    $("#retrieved-4thway-panel").hide();

    var newPanel = $("#new-4thway-panel");

    newPanel.fadeIn();
    newPanel.find('#default-selected').eq(0).trigger('click');

    $(".function-selector").each(function() {
        $(this).removeClass('active');
    });
    $(".function-selector.new").addClass('active');
}


function removeBannerInputGroup(triggeredInputGroup) {
    $currPanel = $(triggeredInputGroup).closest(".new-banners-container");
    $inputGroupToRemove = $(triggeredInputGroup).closest(".new-banner.template");
    if ($inputGroupToRemove.is($currPanel.find(".new-banner.template").eq(1))) {
        alert('You cannot remove banner 1 \n(If you want to remove the 4thway, just remove the slot from the BCC..)');
    } else {
        $inputGroupToRemove.remove();
        orderBannerInputGroups($currPanel);
    }
}

function addBannerInputGroup(triggeredInputGroup) {
    $currPanel = $(triggeredInputGroup).closest(".new-banners-container");

    var domain;
    if ($currPanel.hasClass('very')) {
        domain = "very.co.uk/";
    } else {
        domain = "littlewoods.com/";
    }

    $bannerTemplate = $(".new-banner.template").eq(0);
    var newInputGroup = $bannerTemplate.clone().insertAfter($(triggeredInputGroup).closest(".new-banner"));
    newInputGroup.find(".image-path").attr('placeholder', "http://content." + domain);
    newInputGroup.find(".link").attr('placeholder', "http://www." + domain);
    newInputGroup.fadeIn();
    orderBannerInputGroups($currPanel);
}

function orderBannerInputGroups($currPanel) {
    $currPanel.find($(".new-banner.template")).each(function(index) {
        $(this).find(".banner-header").text(index);
    });
}

function generate4thway(triggeredPanel) {

    $currContainer = $(triggeredPanel).closest(".container-4thway");
    var brand = $currContainer.attr('brand');
    var type = $currContainer.attr('type');

    var domain;
    if (brand == "very") {
        domain = "http://content.very.co.uk/";
    } else {
        domain = "http://content.littlewoods.com/";
    }

    $currPanel = $currContainer.find('.padding-fix').eq(0);

    var count = 0;

    var images = [];
    var links = [];
    var titles = [];

    $currPanel.find(".new-banner.template").each(function(index) {
        if ($(this).is(":visible")) {

            var imagePath = $(this).find(".image-path").eq(0).val();
            var link = $(this).find(".link").eq(0).val();
            var title = $(this).find(".title").eq(0).val();

            if ((imagePath != '') && (link != '')) {
                images[count] = imagePath;
                links[count] = link;
                titles[count] = title;
                count++;
            }
        }
    });

    if (count > 0) {

        $currPanel.find(".4thway-preview").remove();

        $temp = appendTemplate("4thway-preview", $currPanel, brand, type);
        $codeContainer = $temp.find(".generated-4thway-code");

        var code = '';

        var skinsPath = $currPanel.find(".skins-input").val();

        code += ('<style type="text/css">\n');

        /* Skins */
        if ((skinsPath != '') && (type == 'desktop')) {
            code += "body { background: #FFF " +
            "url('" + domain + "" + skinsPath + "') " +
            "no-repeat scroll center top !important; }\n";
        }

        /* Banners CSS */
        if (type == 'desktop') {
            code += ('div#sliderTarget .banner>a { width: 764px; height: 200px; display: block; }\n');
        }
        $.each(images, function(index) {
            code += (
            "div#sliderTarget .banner-" + (index + 1) +
            " { background-image: url('" + domain + "" + this + "'); }\n");
        });
        code += "</style>\n\n<div id='sliderTarget' class='slides'>\n";

        /* Banners HTML */
        code += "\t<div class='banner banner-1'>\n" +
        "\t\t<a href='" + links[0] + "' title='" + titles[0] + "'></a>\n" +
        "\t</div>\n";

        if (count > 1) {
            code += "\t<script type='text/template' id='sliderTemplate'>\n";
            for (var i = 1; i < count; i++) {
                code += "\t\t<div class='banner banner-" + (i + 1) + "'>\n" +
                "\t\t\t<a href='" + links[i] + "' title='" + titles[i] + "'></a>\n" +
                "\t\t</div>\n";
            }
            code += "\t</script>\n";
        }
        code += "</div>";

        $codeContainer.text(code);

    } else {
        alert('No Banners Entered');
    }
}

function selectAll(triggeredPanel) {
    var codeContainer = $(triggeredPanel).closest(".panel").find(".generated-4thway-code");
    codeContainer.selectText();
}

function copy(triggeredPanel) {
    document.execCommand("copy");
}

/* Not my code */
/* http://stackoverflow.com/questions/9975707/use-jquery-select-to-select-contents-of-a-div */
jQuery.fn.selectText = function() {
    this.find('input').each(function() {
        if ($(this).prev().length == 0 || !$(this).prev().hasClass('p_copy')) {
            $('<p class="p_copy" style="position: absolute; z-index: -1;"></p>').insertBefore($(this));
        }
        $(this).prev().html($(this).val());
    });
    var doc = document;
    var element = this[0];
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};