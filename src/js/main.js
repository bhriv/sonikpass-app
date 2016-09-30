// Reset Page Scroll
window.onunload = function(){ window.scrollTo(0,0); }

window.mobilecheck = function(){

	check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  	return check;

}

// console.log(window.mobilecheck());

// Start Page here
$(function(){

	var $b = $('body'),
		ch = window.innerHeight/2;

	var sidebarLen = $('.sidebar-item').length,
		sidebarPos = 0;

	var l = $('.lower-type'),
		u = $('.upper-type'),
		itemSize = parseInt($('.lower-type').css('font-size')),
		current = 0,
		copyBlocker = true,
		sections = ['Sonikpass', 'Problem', 'Solution', 'Usecases', 'Contact'],
		sectLen = sections.length;

	var triggerWave = false;

	// Loader 


	var currentProgress = 0,
		interval = 500,
		startLoader;


	function load(){

		startLoader = setInterval(countInterval, getInterval);

	};

	function onload(){

		// console.log('done');
		clearInterval(startLoader);

		setTimeout( function(){
			$('#index').scrollTop(0);
			$b.removeClass('is-loading');
			Animation.titleChanger(0);
			wave.start();
			Animation.sidebar(0, 0.1);
			// animateCanvas();
			Animation.intro();

			if ( window.mobilecheck() ){
				TweenMax.to('.background-title-container', 0.6, { opacity: 0});
			}

		}, 800);

	}

	function getInterval (){
		return interval;
	};

	function countInterval(){

		updateNum(currentProgress);

		if ( currentProgress <= 99 ){
			currentProgress++;
		} else {

			if (currentProgress === 100 ){
				onload();
			}
		}

	}

	function updateNum(progress){

		$('.upper-type, .lower-type').text(progress);
		$('.divider').css({ width: currentProgress + '%'});

	}

	load();


	$(window).load(function(){

		// console.log('DOM loaded');
		interval = 50;

	});

	// Get Year Date

	(function getYear(){
		var today = new Date();
		var year = today.getFullYear();

		$('.date').text(year);
	})();


	// Menu Animation
	$('.hamburger-menu').on('click', function(){

		if ( $b.hasClass('menu-open') ){

			$b.removeClass('menu-open');
			Animation.closeMenu().play();

		} else {

			$b.addClass('menu-open');
			Animation.openMenu().play();
		}

	});

	// Close menu on click
	$('.menu-item > a').on('click', function(){

		if ( $b.hasClass('menu-open') ){
			$b.removeClass('menu-open');
			Animation.closeMenu().play();
		}

	});

	// Case Slider
	function Slider() {

		this.data = "";
		var access = true;

		this.config = function(data){

			var bullets = "",
				slides = "";

			this.data = data;

			for ( var i = 0, len = data.length; i < len; i++ ){

				item = data[i];	

				var b = '<li class="case-item"><h3 class="subheadline">' + item.title + '</h3></li>';
				var s = '<li class="slide" style="background: url(' + item.image + ') no-repeat; background-size:cover;"></li>';

				bullets += b;
				slides += s;

			}

			$('.case-illustration-container').append(slides);
			$('.case-tabs').append(bullets);

			this.init();

		},

		this.init = function(){

			this.initNum = 0;
			this.allSlides = $('.case-illustration-container > li.slide');
			this.caseItems = $('.case-item');
			this.galleryLength = this.allSlides.length;
			this.speed = 0.4;

			$(this.caseItems[0]).addClass('active');
			$('.case-copy').text(this.data[this.initNum].copy);
						
			for ( var i = 0, len = this.galleryLength; i < len; i++ ){		

				if ( i != 0 ){
					var c = $(this.allSlides[i]);
					TweenMax.to(c, 0, {zIndex: -1, opacity: 0});
				}

			}

			$('.case-item').on('click', function(){
				var index = $(this).index();
				slider.jumpTo(index);
			})
			
			$('.case-nav-right').on('click', function(){
				slider.next();
			})

			$('.case-nav-left').on('click', function(){
				slider.prev();
			})

		},

		this.prev = function(){

			if ( access ){

				access = false;

				if ( this.initNum === this.galleryLength - 1 ){
					TweenMax.to($(this.allSlides[this.initNum]), this.speed, {zIndex: -1, opacity: 0});
					TweenMax.to($(this.allSlides[this.initNum - 1]), this.speed, {zIndex: 12, opacity: 1, delay: this.speed, onComplete: this.unlock(), onCompleteScope: this});
				} else {
					TweenMax.to($(this.allSlides[this.initNum]), this.speed, {zIndex: -1, opacity: 0});

					if ( this.initNum === 0 ){
						TweenMax.to($(this.allSlides[this.galleryLength - 1]), this.speed, {zIndex: 12, opacity: 1, delay: this.speed, onComplete: this.unlock(), onCompleteScope: this});
					} else {
						TweenMax.to($(this.allSlides[this.initNum - 1]), this.speed, {zIndex: 12, opacity: 1, delay: this.speed, onComplete: this.unlock(), onCompleteScope: this});
					}

				}

				if ( this.initNum === 0 ){
					this.initNum = this.galleryLength - 1;
				} else {
					this.initNum--;
				}

				this.updateBullets(this.initNum);
				this.changeCopy(this.initNum);

			}

		},

		this.next = function(){

			if ( access ){

				access = false;

				if ( this.initNum === this.galleryLength - 1 ){
					TweenMax.to($(this.allSlides[this.initNum]), this.speed, {zIndex: -1, opacity: 0});
					TweenMax.to($(this.allSlides[0]), this.speed, {zIndex: 12, opacity: 1, delay: this.speed, onComplete: this.unlock(), onCompleteScope: this});		

				} else {
					TweenMax.to($(this.allSlides[this.initNum]), this.speed, {zIndex: -1, opacity: 0});
					TweenMax.to($(this.allSlides[this.initNum + 1]), this.speed, {zIndex: 12, opacity: 1, delay: this.speed, onComplete: this.unlock(), onCompleteScope: this});

				}

				if ( this.initNum < this.galleryLength - 1 ){
					this.initNum++
				} else {
					this.initNum = 0;
				}

				this.updateBullets(this.initNum);
				this.changeCopy(this.initNum);

			}

		},

		this.unlock = function(){
			setTimeout(function(){
				access = true;
			}, 400);
		}

		this.changeCopy = function(pos){

			var c = $('.case-copy'),
				data =  this.data;

			TweenMax.to(c, 0.3, {opacity: 0, y: 48, onComplete: function(){
				(this.target).text(data[pos].copy);
			}});

			TweenMax.to(c, 0.3, {opacity: 1, y: 0, delay: 0.3});


		}

		this.updateBullets = function(pos){

			$(this.caseItems).removeClass('active');
			$(this.caseItems[pos]).addClass('active')

		}

		this.jumpTo = function(pos){

			if ( access ){

				access = false;

				this.updateBullets(pos);
				this.changeCopy(pos);

				TweenMax.to($(this.allSlides[this.initNum]), this.speed, {zIndex: -1, opacity: 0});
				TweenMax.to($(this.allSlides[pos]), this.speed, {zIndex: 12, opacity: 1, delay: this.speed, onComplete: this.unlock(), onCompleteScope: this});

				this.initNum = pos;

			}

		}

	}

	var slider;

	function requestSliderData(){

		var url = '../js/usecases.json',
			request = new XMLHttpRequest(),
			r;

		request.open('GET', url, true);
		request.onload = function(e){
			if (request.readyState === 4){
				if (request.status === 200){
					r = JSON.parse(request.responseText);
					slider = new Slider();
					slider.config(r);
				} else {
					console.error(request.statusText);
				}
			}
		};
		request.onerror = function(e){
			console.error(request.statusText);
		};
		request.send(null);

	}

	requestSliderData();

	function teamInit(data){

		var d = data,
			t = "";

		for ( var i = 0, len = data.length; i < len; i++ ){
			t += '<li class="team-member"><div class="member-image-container"><img src="' + data[i].image + '" alt="' + data[i].name + '" class="member-image"></div><h3 class="subheadline">' + data[i].name + '</h3><div class="caption">' + data[i].title + '</div><p class="copy">' + data[i].bio + '</p></li>'
		}

		$('.team').append(t);

	}

	function requestTeamData(){

		var url = '../js/team.json',
			request = new XMLHttpRequest(),
			r;

		request.open('GET', url, true);
		request.onload = function(e){
			if (request.readyState === 4){
				if (request.status === 200){
					r = JSON.parse(request.responseText);
					teamInit(r);
				} else {
					console.error(request.statusText);
				}
			}
		};
		request.onerror = function(e){
			console.error(request.statusText);
		};
		request.send(null);
	}

	requestTeamData();

	// Smooth Scroll
	$('a[href*="#"]:not([href="#"])').click(function() {

	  	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	  		var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
				scrollTop: target.offset().top
				}, 1000);

				return false;
			}
	    }

	  });

	function getMousePos(){
		// Scrollspeed
		return ch;
	}

	if ( !window.mobilecheck () ){

		var introTrigger = new Waypoint({
			element: document.getElementById('intro'),
			handler: function(direction){

				// console.log('triggered');

				if ( direction === 'up' ){
					$('body').removeClass('menu-light');
					Animation.backgroundChanger('#FFFFFF');
					Animation.reIntro();
					Animation.sidebar(0, 0.1);
					Animation.titleChanger(0);
					wave.start();
				}

			},
			offset: function(){
				return -this.element.clientHeight * 0.1
			}
		});

		// Site Animation
		var pwTriggerDown = new Waypoint({
			element: document.getElementById('problem'),
			handler: function(direction){

				if ( direction === 'down'){
					$('body').addClass('menu-light');
					Animation.backgroundChanger('#252525');
					Animation.sidebar(1, 0.1);
					Animation.titleChanger(1);
					Animation.password();
					wave.stop();
				}
			},
			offset: '80%'
		});

		var pwTriggerUp = new Waypoint({
			element: document.getElementById('problem'),
			handler: function(direction){

				if ( direction === 'up'){
					$('body').addClass('menu-light');
					Animation.passwordReset();
					Animation.backgroundChanger('#252525');
					Animation.sidebar(1, -0.1);
					Animation.titleChanger(1);
				}
			},
			offset: function(){
				return -this.element.clientHeight + window.innerHeight * 0.5;
			}
		});

		var solutionTriggerDown = new Waypoint({
			element: document.getElementById('solution'),
			handler: function(direction){

				if ( direction === 'down' ){
					$('body').removeClass('menu-light');
					Animation.backgroundChanger('#FFFFFF');
					Animation.sidebar(2, 0.1);
					Animation.titleChanger(2);
					Animation.solutionIn();
				}

			},
			offset: '50%'
		});

		var solutionIllustrationDown = new Waypoint({
			element: document.getElementById('solution-illustration'),
			handler: function(direction){

				if ( direction === 'down' ){
					Animation.solutionIllustration();
				}

			},
			offset: '50%'
		});


		var solutionTriggerUp = new Waypoint({
			element: document.getElementById('solution'),
			handler: function(direction){

				if ( direction === 'up' ){
					Animation.backgroundChanger('#FFFFFF');
					Animation.titleChanger(2);
					Animation.sidebar(2, -0.1);
				}

			},
			offset: function(){
				return -this.element.clientHeight + window.innerHeight * 0.5;
			}
		});

		var usecasesTriggerDown = new Waypoint({
			element: document.getElementById('usecases'),
			handler: function(direction){

				if ( direction === 'down' ){
					Animation.backgroundChanger('#F2F2F2');
					Animation.titleChanger(3);
					Animation.sidebar(3, 0.1);
					Animation.usecasesIn();
				}

			},
			offset: '50%'
		});

		var usecasesTriggerUp = new Waypoint({
			element: document.getElementById('usecases'),
			handler: function(direction){

				if ( direction === 'up' ){
					Animation.backgroundChanger('#F2F2F2');
					Animation.titleChanger(3);
					Animation.sidebar(3, -0.1);
				}

			},
			offset: function(){
				return -this.element.clientHeight + window.innerHeight * 0.5;
			}
		});

		var partnerTriggerDown = new Waypoint({
			element: document.getElementById('partner'),
			handler: function(direction){

				if ( direction === 'down' ){
					Animation.backgroundChanger('#FFFFFF');
					Animation.titleChanger(4);
					Animation.partnerIn();
					Animation.sidebar(4, 0.1);
				}

			},
			offset: '50%'
		});

		var partnerTriggerUp = new Waypoint({
			element: document.getElementById('partner'),
			handler: function(direction){

				if ( direction === 'up' ){
					Animation.sidebar(4, -0.1);
				}

			},
			offset: function(){
				return -this.element.clientHeight + 40;
			}
		});

	}

	var Animation = {

		intro: function(){

			var itl = new TimelineMax();
			itl.to('.logo-illustration', 0.8, {opacity: 1})
				.to('.logo', 0.3, {opacity: 1, y: 0})
				.to('.request', 0.3,{opacity: 1, y: 0})
				.to('.hamburger-menu', 0.3,{opacity: 1, y: 0}, '-= 0.3')
				.staggerTo('#intro .js-fadeIn', 0.6, {opacity: 1, y:0}, 0.1, 'sync')
				.to($('.copyright'), 0.3, {opacity: 1, y: 0}, 'sync')
				.fromTo('.meter', 0.3,{ x: '-8px'}, {opacity: 1, rotation: '-90deg', x: '0'}, 'sync')
				.staggerTo('.sidebar-item', 0.5,{opacity: 1, x: '0%'}, 0.1, '-= 0.3')
		},

		reIntro: function(){

			TweenMax.to('#intro', 0.3, {opacity: 1, y: "0px"})

		},

		backgroundChanger: function(bgColor){
			TweenMax.to('.global-background', 0.3, {backgroundColor: bgColor});
		},

		titleChanger: function(num){

			var that = this;

 	       
			TweenMax.to(u, 0.2, {x: '40px', opacity: 0});
			TweenMax.to(l, 0.2, {x: '-40px', opacity: 0});

			setTimeout(function(){
				that.changeCopy(num);
			}, 300);
			
			
			TweenMax.to(u, 0.3, {x: '0', opacity: 1, delay: 0.4});
			TweenMax.to(l, 0.3, {x: '0', opacity: 1, delay: 0.4});

	     
	    },
	    
	    changeCopy: function(num){
			u.text(sections[num]);
			l.text(sections[num]);
	    },

		sidebar: function(sectionNum, direction){
			// Animatie the sidebar depending on the section
			
			var dist = (sectionNum * -16) + "px";
			var next = $('.sidebar-item:eq(' + sectionNum + ') > .sidebar-line');
			var current = $('.sidebar-item:eq(' + sidebarPos + ') > .sidebar-line');

			TweenMax.to('.sidebar', 0.4, {y: dist});
			TweenMax.to(current, 0.3, {width: '50%', backgroundPosition: "0%"});	
			TweenMax.to(next, 0.3, {width: '100%', backgroundPosition: "100%"});

			sidebarPos = sectionNum;

		},

		openMenu: function(){
			var menuAnimation = new TimelineMax({paused:true});
			return menuAnimation.to('.menu-container', 0.8, { opacity: 1, width: '100%', ease: Expo.easeIn })
				.staggerFromTo('.menu-item', 0.4, {opacity: 0}, {opacity: 1}, 0.1, 'items')
				.to('.menu-container .js-fadeIn', 0.3, {opacity: 1, y:0}, 'items');
		},

		closeMenu: function(){
			var menuAnimation = new TimelineMax({paused:true});
			return menuAnimation.staggerFromTo('.menu-item', 0.3, {opacity: 1}, {opacity: 0}, 0.05)
				.to('.menu-container', 0.8, { opacity: 0, width:'0%', ease: Expo.easeOut })
				.to('.menu-container .js-fadeIn', 0.3, {opacity: 0, y: '48px'})
		},


		password: function(){
			var ptl =  new TimelineMax();
			return ptl
				.to('#intro', 0.3, {opacity: 0, y: "-40px"}, 'sync')
				.to('#solution', 0.2, {opacity: 0}, 'sync')
				.to('#problem', 0.3, {opacity: 1}, 'sync')
				.to($('#problem .circle'), 0.6, {strokeDashoffset: 0}, '-=0.3')
				.to('#problem .section-num-label', 0.3, {opacity: 1}, '-=0.2')
				.to($('#problem .headline'), 0.6, {opacity: 1, y: 0}, '-=0.2' )
				.staggerTo($('#problem .js-fadeIn'), 0.6, {opacity: 1, y: 0}, 0.1, '-=0.3');
		},

		passwordReset: function(){
			var ptl =  new TimelineMax();
			return ptl.to('#solution', 0.2, {opacity: 0})
				.to('#problem', 0.3, {opacity: 1});
				
		},

		sonicUnlock: function(){
			var unlockAnimation = new TimelineMax();
			return unlockAnimation.staggerFromTo('.wave', 1.2, {scaleX: 1, scaleY: 1, opacity: 1}, { scaleX: 6, scaleY: 6, opacity: 0}, 0.1)
				.to('.s_laptop-screen .icon-lock', 0.3, {opacity: 0, scaleX: 0.8, scaleY: 0.8}, '-= 1')
				.to('.s_server-light', 0.3, {opacity: 1}, '-= 0.8')
				.to('.s_laptop-screen .circle-big', 0.3, {strokeDashoffset: 0}, '-=0.8')
				.to('.s_laptop-screen .icon-unlocked', 0.3, {opacity: 1}, '-=0.3')

		},

		sonicLock: function() {
			var lockAnimation = new TimelineMax();
			return lockAnimation.to('.s_server-light', 0.3, {opacity: 0})
				.to('.s_laptop-screen .icon-unlocked', 0.3, {opacity: 0}, '-=0.2')
				.to('.s_laptop-screen .circle-big', 0.3, {strokeDashoffset: 302}, '-=0.3')
				.to('.s_laptop-screen .icon-lock', 0.3, {opacity: 1, scaleX: 1, scaleY: 1})
		},

		solutionIn: function(){
			var solutionAnimation = new TimelineMax();
			return solutionAnimation.to('#problem', 0.2, {opacity: 0}, 'sync')
				.to('#solution', 0.3, {opacity: 1}, 'sync')
				.to($('#solution .circle'), 0.3, {strokeDashoffset: 0}, '-=0.3')
				.to('#solution .section-num-label', 0.3, {opacity: 1}, '-=0.3')
				.to('#solution .headline', 0.3, {opacity: 1, y: 0}, '-=0.3')
				.staggerTo('#solution .js-fadeIn', 1.2, {opacity: 1, y: 0}, 0.2,'-=0.3');
		},

		solutionIllustration: function(){
			var solutionTween = new TimelineMax();
			solutionTween.to('.s_phone', 2, {opacity: 1,  x: '-50%', y: '-50%', ease: Expo.easeOut})
				.to('.s_watch', 1, {opacity: 1,  x: '6%', y: '-50%', ease: Expo.easeOut}, '-=2')
				.to('.s_laptop', 1, {opacity: 1,  x: '-116%', y: '-50%', ease: Expo.easeOut}, '-=1.8')
				.to('.s_server', 1, {opacity: 1,  x: '64%', y: '-50%', onComplete: function(){ triggerWave = true } ,ease: Expo.easeOut}, '-=1.6')
				.to('.s_phone .circle-container ', 0.6, {opacity: 1}, '-=1.4')
				.to('.s_watch .circle-container', 0.5, {opacity: 1}, '-=1.2')
		},

		usecasesIn: function(){

			var x,y;

			if ( window.innerWidth < 980 ){
				x = '0', y = '0';
			} else {
				x = '-50%', y = '-50%';
			}

			var usecasesAnimation = new TimelineMax();
			usecasesAnimation.to('#usecases .case-illustration-container.js-fadeIn-center', 0.6, { opacity: 1, y: y, x: x}, 'sync')
				.to($('#usecases .circle'), 0.6, {strokeDashoffset: 0}, 'sync')
				.to('#usecases .section-num-label', 0.3, {opacity: 1}, '-=0.3')
				.to('#usecases .headline', 0.3, {opacity: 1, y: 0}, '-=0.3')
				.staggerTo('#usecases .js-fadeIn', 0.8, {opacity: 1, y: 0}, 0.1, '-=0.3')
		},

		partnerIn: function(){
			var partnerAnimation = new TimelineMax();
			return partnerAnimation.to('#partner .mail-illustration.js-fadeIn', 0.6, { opacity: 1, y: '0'})
				.to($('#partner .circle'), 0.6, {strokeDashoffset: 0}, '-=0.3')
				.to('#partner .section-num-label', 0.3, {opacity: 1}, '-=0.3')
				.staggerTo('#partner .js-fadeIn', 0.8, {opacity: 1, y: 0}, 0.1, '-=0.3');
		}

	}

	function waves(){

		triggerWave = false;

		Animation.sonicUnlock();

		setTimeout(function(){
			Animation.sonicLock();
			triggerWave = true;
		}, 4000);

	};


	$('#solution-illustration').on('mouseover', function(){
		if (triggerWave){
			waves();
		}
	})


	// init controller
	var controller = new ScrollMagic.Controller();

	var problemTween = new TimelineMax();
	problemTween.to('.logo-type', 1, {opacity: 0, x: '-16px'});

	var triggerOffsetScroll = window.innerHeight / 2;

	var problemScene = new ScrollMagic.Scene({ triggerElement: '#problem', duration: (getMousePos)})
					.offset(-triggerOffsetScroll)
					.setTween(problemTween)
					.addTo(controller);

	// Canvas Animation

	function Wave(opt) {
		
			opt = opt || {};

			this.waves = opt.waves || [];
				
			this.phase = 0;
			this.run = false;

			this._rotation = 0;
			this.auto =	function(){if (typeof auto === 'undefined') {auto = true;}};
			
			this.ratio = opt.ratio || window.devicePixelRatio || 1;
			
			this.width =  (opt.width || window.innerWidth || 1280);
			this.width_2 = this.width / 2;
			this.width_4 = this.width / 4;
			
			this.height = (opt.height || window.innerHeight || 720);
			this.height_2 = this.height / 2;
			this.height_3 = this.height / 3;
			
			this.MAX = (this.height_2) - 4;
			
			this.amplitude = opt.amplitude || 0;
			this.speed = opt.speed || 0.02;
			this.frequency = opt.frequency || 2;

			this.angle = 0;
			this.circleProgress = 0;
			this.radius = (opt.ratio || 1) * this.height * 0.4;
			
			this.canvas = document.getElementById('canvas');
			this.canvas.width = this.width;
			this.canvas.height = this.height;

			this.container = opt.container || document.body;
			this.container.appendChild(this.canvas);

			this.ctx = this.canvas.getContext('2d');

			this.backingStoreRatio =  this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio || this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio || this.ctx.backingStorePixelRatio || 1;

			this.gradient = this.ctx.createLinearGradient(0, 0, 0, 2*this.radius);
			this.gradient.addColorStop(0, "#4aa3da");
			this.gradient.addColorStop(1, "#ce3745");

			this.squareSide = Math.sqrt( Math.pow(this.radius * 2, 2) / 2 );



		}

	Wave.prototype._getRadius = function(){

		if (window.mobilecheck()) {
			this.radius = this.width * 0.6;
			this.squareSide = Math.sqrt( Math.pow(this.radius * 2, 2) / 2 );
		} else {
			this.radius = this.height * 0.4;
			this.squareSide = Math.sqrt( Math.pow(this.radius * 2, 2) / 2 );
		}

	}

	Wave.prototype._drawBase = function(){
		this.ctx.strokeStyle = this.gradient;

		this.ctx.beginPath();
		this.ctx.arc(this.width_2, this.height_2, this.radius, 0, Math.PI/180 * this.circleProgress);
		this.ctx.stroke();
	}

	Wave.prototype._drawSquare = function(){

		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.strokeStyle = '#D8D8D8';
		this.ctx.translate(this.width_2, this.height_2);
		this.ctx.rotate( this._rotation * Math.PI/180);
		this.ctx.strokeRect( -this.squareSide / 2, -this.squareSide / 2, this.squareSide, this.squareSide );
		this.ctx.restore();

	}

	Wave.prototype._updateBase = function(){
		this.circleProgress += 8;
	}
	
	Wave.prototype._GATF_cache = {};

	Wave.prototype._globAttFunc = function(x) {
		if (Wave.prototype._GATF_cache[x] == null) {
			Wave.prototype._GATF_cache[x] =	Math.pow(4/(4+Math.pow(x,4)), 4);
		}
		return Wave.prototype._GATF_cache[x];
	}

	Wave.prototype._color = function(opacity){
		opacity = opacity || 1;

		var gradient = this.ctx.createLinearGradient(0,0, this.width, 0);
		 	gradient.addColorStop(0, 'rgba(260,55,69,' + opacity + ')');
			gradient.addColorStop(1, 'rgba(74,163,218,' + opacity + ')');

		return gradient;
	}

	Wave.prototype._xpos = function(i, attenuation, frequency, amplitude){
		// return this.width_2 + i * this.width_4;
		// var att = (this.MAX * amplitude) / attenuation;
		return this.width_2 + this.radius * Math.sin(i);
	}

	Wave.prototype._ypos = function(i, attenuation, frequency, amplitude) {
		var att = (this.MAX * amplitude) / attenuation;
		// return this.height_2 + this._globAttFunc(i) * att * Math.sin(this.frequency * i - this.phase);

		return (this.height_2 + this.radius * Math.cos(i)) + ( this._globAttFunc(i) + att * Math.sin(frequency * i + this.phase));
	
	}

	Wave.prototype._drawLine = function(attenuation, color, frequency, amplitude, thickness){

		this.ctx.moveTo(0,0);
		this.ctx.beginPath();
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = thickness / this.ratio || 1;

		var i = 0;
		while ((i += 0.01) <= Math.PI * 2  ) {

			var y = this._ypos(i, attenuation, frequency, amplitude);
			var x = this._xpos(i, attenuation, frequency, amplitude);

			this.ctx.lineTo(x, y);

		}

		this.ctx.closePath();

		this.ctx.stroke();

	}

	Wave.prototype._clear = function(){
		
		this.ctx.globalCompositeOperation = 'destination-out';
		this.ctx.fillRect(0,0, this.width, this.height);
		this.ctx.globalCompositeOperation = 'source-over';
	}

	Wave.prototype._draw = function() {
		if ( this.run === false ) return;

		this.phase = (this.phase + Math.PI * this.speed) % (2*Math.PI);

		this._clear();

		if (this.circleProgress < 360 ){

			this._updateBase();
			this._drawBase();

		} else {

			// this._drawSquare();

			for ( var i = 0, len = this.waves.length; i < len; i++ ){
				var wave = this.waves[i];

				if ( wave.startAmplitude < wave.amplitude ){
					wave.startAmplitude += 0.001;
				}

				this._drawLine(wave.attenuation, this._color(wave.opacity), wave.frequency, wave.startAmplitude);

			}

			// this._rotation -= 0.08;
		}

		if ( window.requestAnimationFrame ){
			requestAnimationFrame(this._draw.bind(this));
			return;
		}

		setTimeout(this._draw.bind( this ), 20);

	}

	Wave.prototype.resize = function(){

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.width_2 = this.width / 2;
		this.width_4 = this.width / 4;
		this.height_2 = this.height / 2;

		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this._getRadius();

	}

	Wave.prototype.start = function(){
		this.phase = 0;
		this.run = true;
		this._getRadius();
		this._draw();
	}

	Wave.prototype.stop = function(){
		this.run = false;
	}

	var introContainer = document.getElementById('intro');	

	var wave = new Wave({

		frequency: 4, 
		container: introContainer,

		waves: [
			{frequency: 4, startAmplitude: 0, amplitude: 0.04, opacity: 0.4, attenuation: -2},
			{frequency: 3, startAmplitude: 0, amplitude: 0.04, opacity: 1, attenuation: -6},
			{frequency: 4, startAmplitude: 0, amplitude: 0.04, opacity: 0.3, attenuation: 0.4},
			{frequency: 4, startAmplitude: 0, amplitude: 0.04, opacity: 0.2, attenuation: 2},
			{frequency: 4, startAmplitude: 0, amplitude: 0.04, opacity: 1, attenuation: 0.8}
		]

	});
	
	
	window.addEventListener('resize', function(){ wave.resize() }, false);


});