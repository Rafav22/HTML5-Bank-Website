(function($){	
	$.fn.motion_slider = function(user_options){
		var defaults = 
		{
			left_arrow: '#left-arrow',
			right_arrow: '#right-arrow',
			slides: '> div',
			autoSliderSpeed: 7000, // automatic slider speed
			auto: false,
			pauseOnHover: false,
			pauseHoverElement: '', // if pauseOnHover is enabled, it defines the element that should be hovered for the slideshow to stop ( default to $container )
			slideTransitionSpeed: 600, // animations speed
			elementsTransitionSpeed: 200, // start and end animation ( offsets ) speed
			elementsOffset: 110, // start animation offset
			backOffset: 80, // end animation offset
			opacityOffset: 1000, // increase the value if you want more "fading"
			transtionEasing: 'swing', // start (main) animation easing
			transtionEndEasing: 'swing', // end (main) animation easing
			beforeContainerResize: null,
			afterContainerResize: null,
			beforeAnimation: null,
			afterAnimation: null
		},
		
		options = $.extend(defaults, user_options);
		
		return this.each(function(){
			var $container = $(this).css('position','relative'),
				is_ie = $.browser.msie && $.browser.version < 9,
				$slides = $(options.slides, $container),
				slidesTotal = $slides.length,
				animating = false,
				animateTimer = null,
				windowWidth = $(window).width(),
				$currentSlide = $slides.eq('0'),
				$pauseHoverElement = ( options.pauseHoverElement !== '' ) ? $( options.pauseHoverElement ) : $container;
				$nextSlide = $();
				
			var helpers = 
			{
				init : function(){
					if ( !is_ie ) {
						$slides.css( {'position':'absolute','top':'0','left':'0','opacity':'0','zIndex':'1','visibility':'hidden','display':'block'} );
					} else {
						$slides.css( {'position':'absolute','top':'0','left':windowWidth,'zIndex':'1','display':'block'} );
					}
					
					$currentSlide.css('visibility','visible');
					
					//set container height
					$container.css( 'height', $currentSlide.innerHeight() );
					
					//show first slide
					if ( !is_ie ) {
						$currentSlide.css( {'opacity': '1','zIndex':'1'} );
					} else {
						$currentSlide.css( {'zIndex':'1', 'left':'0'} );
					}
					
					if ( slidesTotal !== 1 ) $( options.left_arrow + ',' + options.right_arrow ).css('display','block');
					
					helpers.setAutoAnimation();
					
					$(options.left_arrow).click(function(){
						helpers.clearAutoTimer();
						if ( !animating ) helpers.goToSlide( 'prev' );
						return false;
					});
					
					$(options.right_arrow).click(function(){
						helpers.clearAutoTimer();
						if ( !animating ) helpers.goToSlide( 'next' );
						return false;
					});
					
					if ( !is_ie ){ 
						$(options.left_arrow + ', ' + options.right_arrow).hover(function(){
							$(this).stop(true,true).fadeTo( 'fast', .5 );
						}, function(){
							$(this).stop(true,true).fadeTo( 'fast', 1 );
						});
					}
					
					$pauseHoverElement.hover(function(){
						$(this).addClass('slider_hovered');
					}, function(){
						$(this).removeClass('slider_hovered');
					});
				},
				goToSlide : function( direction, autoSliding ){
					if ( autoSliding && options.pauseOnHover && $pauseHoverElement.is('.slider_hovered') ) {
						helpers.clearAutoTimer();
						helpers.setAutoAnimation();
						return;
					}
				
					var currentSlideNum = $currentSlide.prevAll().length,
						nextSlideNum = ( direction === 'next' ) ? currentSlideNum + 1 : currentSlideNum - 1,
						directionMod = ( direction === 'prev' ) ? -1 : 1,
						elementsOffset = options.elementsOffset * directionMod,
						backOffset = options.backOffset * directionMod,
						currentSlideOffset = windowWidth * directionMod + ( options.opacityOffset * -directionMod ),
						nextSlideOffset = windowWidth * directionMod,
						currentSlideAnimation = !is_ie ? { 'left': currentSlideOffset+'px','opacity':'0' } : { 'left': currentSlideOffset+'px' },
						nextSlideAnimation = !is_ie ? {'left': backOffset + 'px', 'opacity':'1'} : {'left': backOffset + 'px'};
						
					if ( nextSlideNum < 0 ) nextSlideNum = slidesTotal-1;
					if ( nextSlideNum >= slidesTotal ) nextSlideNum = 0;
					
					animating = true;

					$nextSlide = $slides.eq( nextSlideNum );
					
					if ( options.beforeAnimation ) options.beforeAnimation.call( this, $currentSlide, $nextSlide, directionMod );
					
					$currentSlide.css('zIndex','1').animate( { 'left': -elementsOffset + 'px' }, options.elementsTransitionSpeed, options.transtionEasing ).animate( currentSlideAnimation, options.slideTransitionSpeed, options.transtionEasing, function(){
						helpers.changeContainerHeight( $nextSlide );
						
						$currentSlide.css('left',windowWidth+'px');
						
						$nextSlide.css({'left': -nextSlideOffset+'px','zIndex':'1','visibility':'visible'}).animate( nextSlideAnimation, options.slideTransitionSpeed ).animate( {'left': '0'}, options.elementsTransitionSpeed, options.transtionEndEasing, function(){
							animating = false;
							if ( options.afterAnimation ) options.afterAnimation.call( this, $currentSlide, $nextSlide, directionMod );
							$currentSlide = $nextSlide;
							helpers.setAutoAnimation();
						} );
					} );
				},
				changeContainerHeight : function( element, callback_function ){
					var newHeight = element.innerHeight(),
						containerHeight = $container.innerHeight();
					
					if ( containerHeight === newHeight ){
						if ( callback_function instanceof Function ) callback_function.call( this );
						return;
					}
					
					if ( options.beforeContainerResize ) options.beforeContainerResize.call( this, $container, containerHeight, newHeight );
					
					$container.animate( { 'height': newHeight }, 'fast', function(){
						if ( options.afterContainerResize ) options.afterContainerResize.call( this, $container, containerHeight, newHeight );
						if ( callback_function instanceof Function ) callback_function.call( this );
					} );
				},
				setAutoAnimation : function(){
					if ( options.auto ) animateTimer = setTimeout( helpers.autoNext, options.autoSliderSpeed );
				},
				clearAutoTimer : function(){
					if ( options.auto && typeof animateTimer != 'undefined' ) clearTimeout( animateTimer );
				},
				autoNext : function(){
					helpers.goToSlide( 'next', true );
				}
			}
			
			helpers.init();
		});
	}
})(jQuery);