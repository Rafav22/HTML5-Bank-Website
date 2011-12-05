/* ==|== primary functions ==================================================
   Author: Josh Sadler @ T8 Webware
   ========================================================================== */
  
$(document).ready(function() {
	$("input[type=submit], button, input[type=radio], input[type=checkbox], a.btn").uniform();
	InitFormReplace ();
	
	$('.olb-drop').click(function() {
		$('.olb-replace').fadeOut(function() {
			$('.olb-hidden').fadeIn();
		});
	});
	
	$('#olb-login').submit(function() {
		$('.olb-form').fadeOut(function() {
			$('.olb-logged-in').fadeIn();
		});
		return false;
	});
	
	$(".stars").children().not("select").hide();	
	
	$(".stars").stars({
		inputType: "select",
		oneVoteOnly: true,
		cancelShow: false
	});
	
	
	// navigation dropdown
	$("nav ul li").hover(function(){
        $(this).addClass("hover");
        $('div:first',this).fadeIn();
    }, function(){
        $(this).removeClass("hover");
        $('div:first',this).fadeOut();
    });
	    
	
});

/* ==|== form replacement =================================================== */

function InitFormReplace () {
	
	var select = $('#olb-select');
	var selectReplace = $('#select-type');
	var input = $('#olb-login');
	var inputReplace = $('#olb-container');
	var search = $('#search');
	var searchReplace = $('#search-container');
	
	input.focus(function() {
		inputReplace.addClass('focus');
	});
	
	input.blur(function() {
		inputReplace.removeClass('focus');
	});
	
	search.focus(function() {
		searchReplace.addClass('focus');
	});
	
	search.blur(function() {
		searchReplace.removeClass('focus');
	});
	
	select.change(onSelectChange);
	
	select.focus(function() {
		selectReplace.addClass('focus');
	});
	
	select.blur(function() {
		selectReplace.removeClass('focus');
	});
	
	function onSelectChange(){
		var selected = $('#olb-select option:selected');		
		var output = "";
		if(selected.val() != 0){
			output = selected.text();
		}
		if(selected.val() == 0){
			output = "Select an Account..."
		}
		$('#select-type > span').html(output);
	}
	
	$('#olb-select').trigger('change'); 
      
}

/* ==|== featured slider ==================================================== */

$(window).load(function(){
	var $featured_content = $('#featured-light #main-featured-slider');
		
	if ( $featured_content.length ) {
		var slider_settings = { pauseHoverElement : '#featured-light' };
		
		if ( $featured_content.is('.slider_auto') ) {
			var slider_autospeed_class_value = /slider_autospeed_(\d+)/g
				slider_autospeed = slider_autospeed_class_value.exec( $featured_content.attr('class') );
			
			slider_settings.autoSliderSpeed = slider_autospeed[1];
			slider_settings.auto = true;
			if ( $featured_content.is('.slider_pause') ) slider_settings.pauseOnHover = true;
		}
		$featured_content.motion_slider( slider_settings );
	
	}
	
});

/* ==|== tabs ========================================================= */

function InitTabs () {
	var tabs = $('ul.tabs');

	tabs.each(function(i) {

		var tab = $(this).find('> li > a');
		tab.click(function(e) {

			var contentLocation = $(this).attr('href');

			if(contentLocation.charAt(0)=="#") {

				e.preventDefault();

				tab.removeClass('active');
				$(this).addClass('active');

				$(contentLocation).show().addClass('active').siblings().hide().removeClass('active');

			}
		});
	});
}

/* ==|== form validation ============================================= */

function InitValidation () {
	$("#form").validationEngine();
	// Toggle options if beneficary
    $('.toggle').hide();

    $('#ben_addYes').change(function(){
        var selected = $(this).val();
        $('#'+selected).slideDown();
    });
	
	$('#ben_addNo').change(function(){
        $('#Yes').slideUp();
    });   
}

/* ==|== faqs ======================================================== */

function InitFaqs () {
	$.fn.simpleFAQ = function( options, callback ) {
		// define default options
		var defaults = {
			textExpand 		: "Expand all",
			textCollapse 	: "Collapse all",
			displayAll 		: false,
			toggleSpeed 	: 250
		};
		var options = $.extend( defaults, options );
		// callback
		if( typeof callback != "function" ) { callback = function(){} }

		this.each( function () {
			obj = $(this);
			// insert FAQ expand all/collapes all text before FAQ
			//var txt = '<span class="simple_jfaqText"><a href="javascript:;" rel="jfaq_expand">' + options.textExpand + '</a> / <a href="javascript:;" rel="jfaq_collapse">' + options.textCollapse + '</a></span>';
			//$( txt ).insertBefore( obj );

			// add class to desired FAQ element
			obj.addClass( 'simple_jfaq' );

			// show/hide faq answers according to displayAll option
			( options.displayAll == false ) ? ddDisplay = 'none' : ddDisplay = 'block';
			obj.children( 'dd' ).css( 'display', ddDisplay );

			// add classes according to <dd> state (hidden/visible)
			obj.children( 'dd:visible' ).prev( 'dt' ).addClass( 'expanded' );
			obj.children( 'dd:hidden' ).prev( 'dt' ).addClass( 'collapsed' );

			obj.children( 'dt' )
				.click( function() {
					// show/hide all answers (dd elements) on click
					$(this).nextUntil( 'dt' ).slideToggle( options.toggleSpeed );
					// dt class change on click
					$(this).toggleClass( 'collapsed' ).toggleClass( 'expanded' );
					setTimeout( callback, options.toggleSpeed ); })
				.hover( function() { $(this).toggleClass( 'hover' ); }, function(){ $(this).toggleClass( 'hover' ); });
		});
		// Expand All
		obj.prev( 'span' ).children( 'a[rel=jfaq_expand]' ).click( function() {
			// show all answers
			$(this).parent( 'span' ).next( '.simple_jfaq' ).children( 'dd:hidden' ).slideDown( options.toggleSpeed );
			// change classes
			$(this).parent( 'span' ).next( '.simple_jfaq' ).children( 'dt' ).removeClass( 'collapsed' ).addClass( 'expanded' );
			setTimeout( callback, options.toggleSpeed )
		});
		// Collapse all
		obj.prev( 'span' ).children( 'a[rel=jfaq_collapse]' ).click( function() {
			// hide all answers
			$(this).parent( 'span' ).next( '.simple_jfaq' ).children( 'dd:visible' ).slideUp( options.toggleSpeed );
			// change classes
			$(this).parent( 'span' ).next( '.simple_jfaq' ).children( 'dt' ).removeClass( 'expanded' ).addClass( 'collapsed' );
			setTimeout( callback, options.toggleSpeed );
		});
	};
	
	$('#faq-list').simpleFAQ();
}