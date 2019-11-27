// Utility function
function Util () {};

/* 
	class manipulation functions
*/
Util.hasClass = function(el, className) {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
	var classList = className.split(' ');
 	if (el.classList) el.classList.add(classList[0]);
 	else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
	var classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);	
	else if(Util.hasClass(el, classList[0])) {
		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
		el.className=el.className.replace(reg, ' ');
	}
	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
	if(bool) Util.addClass(el, className);
	else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

/* 
  DOM manipulation
*/
Util.getChildrenByClassName = function(el, className) {
  var children = el.children,
    childrenByClass = [];
  for (var i = 0; i < el.children.length; i++) {
    if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
  }
  return childrenByClass;
};

Util.is = function(elem, selector) {
  if(selector.nodeType){
    return elem === selector;
  }

  var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
    length = qa.length,
    returnArr = [];

  while(length--){
    if(qa[length] === elem){
      return true;
    }
  }

  return false;
};

/* 
	Animate height of an element
*/
Util.setHeight = function(start, to, element, duration, cb) {
	var change = to - start,
	    currentTime = null;

  var animateHeight = function(timestamp){  
    if (!currentTime) currentTime = timestamp;         
    var progress = timestamp - currentTime;
    var val = parseInt((progress/duration)*change + start);
    element.style.height = val+"px";
    if(progress < duration) {
        window.requestAnimationFrame(animateHeight);
    } else {
    	cb();
    }
  };
  
  //set the height of the element before starting animation -> fix bug on Safari
  element.style.height = start+"px";
  window.requestAnimationFrame(animateHeight);
};

/* 
	Smooth Scroll
*/

Util.scrollTo = function(final, duration, cb) {
  var start = window.scrollY || document.documentElement.scrollTop,
      currentTime = null;
      
  var animateScroll = function(timestamp){
  	if (!currentTime) currentTime = timestamp;        
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final-start, duration);
    window.scrollTo(0, val);
    if(progress < duration) {
        window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};

/* 
  Focus utility classes
*/

//Move focus to an element
Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName("body")[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};

/* 
  Misc
*/

Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};

Util.cssSupports = function(property, value) {
  if('CSS' in window) {
    return CSS.supports(property, value);
  } else {
    var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
    return jsProperty in document.body.style;
  }
};

// merge a set of user options into plugin defaults
// https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
Util.extend = function() {
  // Variables
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  // Check if a deep merge
  if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
    deep = arguments[0];
    i++;
  }

  // Merge the object into the extended object
  var merge = function (obj) {
    for ( var prop in obj ) {
      if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
        // If deep merge and property is an object, merge properties
        if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
          extended[prop] = extend( true, extended[prop], obj[prop] );
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for ( ; i < length; i++ ) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;
};

// Check if Reduced Motion is enabled
Util.osHasReducedMotion = function() {
  var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(matchMediaObj) return matchMediaObj.matches;
  return false; // return false if not supported
}; 

/* 
	Polyfills
*/
//Closest() method
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1); 
		return null;
	};
}

//Custom Event() constructor
if ( typeof window.CustomEvent !== "function" ) {

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}

/* 
	Animation curves
*/
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};
// File#: _1_anim-menu-btn
(function() {
	var menuBtns = document.getElementsByClassName('js-anim-menu-btn');
	if( menuBtns.length > 0 ) {
		for(var i = 0; i < menuBtns.length; i++) {(function(i){
			initMenuBtn(menuBtns[i]);
		})(i);}

		function initMenuBtn(btn) {
			btn.addEventListener('click', function(event){	
				event.preventDefault();
				var status = !Util.hasClass(btn, 'anim-menu-btn--state-b');
				Util.toggleClass(btn, 'anim-menu-btn--state-b', status);
				// emit custom event
				var event = new CustomEvent('anim-menu-btn-clicked', {detail: status});
				btn.dispatchEvent(event);
			});
		};
	}
}());
// File#: _1_file-upload
// Usage: codyhouse.co/license
(function() {
  var InputFile = function(element) {
    this.element = element;
    this.input = this.element.getElementsByClassName('file-upload__input')[0];
    this.label = this.element.getElementsByClassName('file-upload__label')[0];
    this.multipleUpload = this.input.hasAttribute('multiple'); // allow for multiple files selection
    
    // this is the label text element -> when user selects a file, it will be changed from the default value to the name of the file 
    this.labelText = this.element.getElementsByClassName('file-upload__text')[0];
    this.initialLabel = this.labelText.textContent;

    initInputFileEvents(this);
  }; 

  function initInputFileEvents(inputFile) {
    // make label focusable
    inputFile.label.setAttribute('tabindex', '0');
    inputFile.input.setAttribute('tabindex', '-1');

    // move focus from input to label -> this is triggered when a file is selected or the file picker modal is closed
    inputFile.input.addEventListener('focusin', function(event){ 
      inputFile.label.focus();
    });

    // press 'Enter' key on label element -> trigger file selection
    inputFile.label.addEventListener('keydown', function(event) {
      if( event.keyCode && event.keyCode == 13 || event.key && event.key.toLowerCase() == 'enter') {inputFile.input.click();}
    });

    // file has been selected -> update label text
    inputFile.input.addEventListener('change', function(event){ 
      updateInputLabelText(inputFile);
    });
  };

  function updateInputLabelText(inputFile) {
    var label = '';
    if(inputFile.input.files && inputFile.input.files.length < 1) { 
      label = inputFile.initialLabel; // no selection -> revert to initial label
    } else if(inputFile.multipleUpload && inputFile.input.files && inputFile.input.files.length > 1) {
      label = inputFile.input.files.length+ ' files'; // multiple selection -> show number of files
    } else {
      label = inputFile.input.value.split('\\').pop(); // single file selection -> show name of the file
    }
    inputFile.labelText.textContent = label;
  };

  //initialize the InputFile objects
  var inputFiles = document.getElementsByClassName('file-upload');
  if( inputFiles.length > 0 ) {
    for( var i = 0; i < inputFiles.length; i++) {
      (function(i){new InputFile(inputFiles[i]);})(i);
    }
  }
}());
// File#: _1_modal-window
// Usage: codyhouse.co/license
(function() {
  var Modal = function(element) {
    this.element = element;
    this.triggers = document.querySelectorAll('[aria-controls="'+this.element.getAttribute('id')+'"]');
    this.firstFocusable = null;
    this.lastFocusable = null;
    this.selectedTrigger = null;
    this.showClass = "modal--is-visible";
    this.initModal();
  };

  Modal.prototype.initModal = function() {
    var self = this;
    //open modal when clicking on trigger buttons
    if ( this.triggers ) {
      for(var i = 0; i < this.triggers.length; i++) {
        this.triggers[i].addEventListener('click', function(event) {
          event.preventDefault();
          self.selectedTrigger = event.target;
          self.showModal();
          self.initModalEvents();
        });
      }
    }

    // listen to the openModal event -> open modal without a trigger button
    this.element.addEventListener('openModal', function(event){
      if(event.detail) self.selectedTrigger = event.detail;
      self.showModal();
      self.initModalEvents();
    });

    // listen to the closeModal event -> close modal without a trigger button
    this.element.addEventListener('closeModal', function(event){
      if(event.detail) self.selectedTrigger = event.detail;
      self.closeModal();
    });
  };

  Modal.prototype.showModal = function() {
    var self = this;
    Util.addClass(this.element, this.showClass);
    this.getFocusableElements();
    this.firstFocusable.focus();
    // wait for the end of transitions before moving focus
    this.element.addEventListener("transitionend", function cb(event) {
      self.firstFocusable.focus();
      self.element.removeEventListener("transitionend", cb);
    });
    this.emitModalEvents('modalIsOpen');
  };

  Modal.prototype.closeModal = function() {
    if(!Util.hasClass(this.element, this.showClass)) return;
    Util.removeClass(this.element, this.showClass);
    this.firstFocusable = null;
    this.lastFocusable = null;
    if(this.selectedTrigger) this.selectedTrigger.focus();
    //remove listeners
    this.cancelModalEvents();
    this.emitModalEvents('modalIsClose');
  };

  Modal.prototype.initModalEvents = function() {
    //add event listeners
    this.element.addEventListener('keydown', this);
    this.element.addEventListener('click', this);
  };

  Modal.prototype.cancelModalEvents = function() {
    //remove event listeners
    this.element.removeEventListener('keydown', this);
    this.element.removeEventListener('click', this);
  };

  Modal.prototype.handleEvent = function (event) {
    switch(event.type) {
      case 'click': {
        this.initClick(event);
      }
      case 'keydown': {
        this.initKeyDown(event);
      }
    }
  };

  Modal.prototype.initKeyDown = function(event) {
    if( event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' ) {
      //trap focus inside modal
      this.trapFocus(event);
    } else if( (event.keyCode && event.keyCode == 13 || event.key && event.key == 'Enter') && event.target.closest('.js-modal__close')) {
      event.preventDefault();
      this.closeModal(); // close modal when pressing Enter on close button
    }	
  };

  Modal.prototype.initClick = function(event) {
    //close modal when clicking on close button or modal bg layer 
    if( !event.target.closest('.js-modal__close') && !Util.hasClass(event.target, 'js-modal') ) return;
    event.preventDefault();
    this.closeModal();
  };

  Modal.prototype.trapFocus = function(event) {
    if( this.firstFocusable == document.activeElement && event.shiftKey) {
      //on Shift+Tab -> focus last focusable element when focus moves out of modal
      event.preventDefault();
      this.lastFocusable.focus();
    }
    if( this.lastFocusable == document.activeElement && !event.shiftKey) {
      //on Tab -> focus first focusable element when focus moves out of modal
      event.preventDefault();
      this.firstFocusable.focus();
    }
  }

  Modal.prototype.getFocusableElements = function() {
    //get all focusable elements inside the modal
    var allFocusable = this.element.querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary');
    this.getFirstVisible(allFocusable);
    this.getLastVisible(allFocusable);
  };

  Modal.prototype.getFirstVisible = function(elements) {
    //get first visible focusable element inside the modal
    for(var i = 0; i < elements.length; i++) {
      if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
        this.firstFocusable = elements[i];
        return true;
      }
    }
  };

  Modal.prototype.getLastVisible = function(elements) {
    //get last visible focusable element inside the modal
    for(var i = elements.length - 1; i >= 0; i--) {
      if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
        this.lastFocusable = elements[i];
        return true;
      }
    }
  };

  Modal.prototype.emitModalEvents = function(eventName) {
    var event = new CustomEvent(eventName, {detail: this.selectedTrigger});
    this.element.dispatchEvent(event);
  };

  //initialize the Modal objects
  var modals = document.getElementsByClassName('js-modal');
  if( modals.length > 0 ) {
    var modalArrays = [];
    for( var i = 0; i < modals.length; i++) {
      (function(i){modalArrays.push(new Modal(modals[i]));})(i);
    }

    window.addEventListener('keydown', function(event){ //close modal window on esc
      if(event.keyCode && event.keyCode == 27 || event.key && event.key.toLowerCase() == 'escape') {
        for( var i = 0; i < modalArrays.length; i++) {
          (function(i){modalArrays[i].closeModal();})(i);
        };
      }
    });
  }
}());
// $(function () {                                      
//     $('.b-secondary-nav.navigation__item a').each(function () {             
//         var location = window.location.href; 
//         var link = this.href;                
//         if(location == link) {               
//             $(this).addClass('navigation__link--active'); 
//         }
//     });
// });	

// $(function () {                                      
//     $('.b-primary-nav.navigation__item a').each(function () {             
//         var location = window.location.href; 
//         var link = this.href;                
//         if(location == link) {               
//             $(this).addClass('navigation__link--active');  
//         }
//     });
// });


// $("body").on("change", "#mark", function() {
//   var name = "";
//   $("#mark option:selected").each(function() {
//       name += $(this).text() + " ";
//   });

//   var id = $("#mark option:selected").val();
  
//   if(id == 0){
//   } else {
//       $("#mark").val(id);
//       getModel();
//   }
  
// }).trigger("change");

// $("body").on("change", "#model", function() {
//   var name = "";
//   $("#model option:selected").each(function() {
//       name += $(this).text() + " ";
//   });

//   var id = $("#model option:selected").val();
  
//   if(id == 0){
      
//   } else {
//       $("#model").val(id);
//       getYear();
//   }
  
// }).trigger("change");

// $("body").on("change", "#year", function() {
//   var name = "";
//   $("#year option:selected").each(function() {
//       name += $(this).text() + " ";
//   });

//   var id = $("#year option:selected").val();
  
//   if(id == 0){
      
//   } else {
//       $("#year").val(id);
//   }
  
// }).trigger("change");


// function getMaker() {
//   var options = "<option value=''>Выберите марку</option>";
//   $.ajax({
//       url: "/api/robasta/",
//       type: "POST",
//       dataType: "json",
//       data: {"func":"GetMakers"},
//       beforeSend : function (){
//       },
//       success: function(data){
//           for (var item in data) { 
//               options += "<option value="+data[item]+">"+data[item]+"</option>";
//           }
//           $("#mark").html(options);
//       },
//       error: function(){
//       }
//   });
// }


// function getModel() {
//   var options = "<option value=''>Выберите модель</option>";
//   var mark = $("#mark").val();
//   $.ajax({
//       url: "/api/robasta/",
//       type: "POST",
//       dataType: "json",
//       data: {
//           "func":"GetModels",
//           "mark":mark
//       },
//       beforeSend : function (){
          
//       },
//       success: function(data){
//           for (var item in data) { 
//               options += "<option value="+data[item]+">"+data[item]+"</option>";
//           }
//           $("#model").html(options);
//       },
//       error: function(){            
//       }
//   });
// }


// function getYear() {
//   var options = "<option value=''>Выберите год</option>";
//   var mark = $("#mark").val();
//   var model = $("#model").val();
//   $.ajax({
//       url: "/api/robasta/",
//       type: "POST",
//       dataType: "json",
//       data: {
//           "func":"GetYears",
//           "mark":mark,
//           "model":model,
//       },
//       beforeSend : function (){
//       },
//       success: function(data){
//           for (var item in data) { 
//               options += "<option value="+data[item]+">"+data[item]+"</option>";
//           }
//           $("#year").html(options);
//       },
//       error: function(){
//       }
//   });
// }


// getMaker();

// function sendFormWidgetCalc()  {
//   var f = $('#WidgetCalcForm').serializeObject();
//   $.ajax({
//       type: "POST",
//       url: "/api/calculation/",
//       dataType: "json",
//       data: {
//           "mark":f.mark,
//           "model":f.model,
//           "year":f.year,
//       },
//       beforeSend : function (){
//           $("#WidgetCalcPlace").append("<div id='bLoader' class='b-loader-wrapper'><div class='b-loader-container'><div class='b-loader-subcontainer'><div class='b-loader'></div></div></div></div>");
//       },
//       success: function(data){
//           setTimeout(function(){
//               if (data.success == true){
//                   $("#WidgetCalcPlace #bLoader").remove();	
//                   $("#WidgetCalcPlace").html("");
//                   $("#WidgetCalcPlace").html(data.html);
//               } else {
//                   $("#WidgetCalcPlace").html("");
//                   $("#WidgetCalcPlace").html(data.html);
//                   $("#WidgetCalcPlace #bLoader").remove();
//               }
//           }, 1000);
//       },
//       error: function(){
//           $("#WidgetCalcPlace #bLoader").remove();
//       }	
//   });    
// };

// function sendFormCalcCallback()  {

// var f = $('#WidgetCalcForm').serializeObject();
// var i = $('#formPageInfo').serializeObject();
  
//    $.ajax({
//       type: "POST",
//       url: "/api/forms/post/buyout/", // Адрес обработчика
//       dataType: "json",
//   data: {
//     "name":f.name,
//     "phone":f.phone,
//     "email":f.email,
//     "mark":f.mark,
//     "model":f.model,
//     "year":f.year,
//     "cash":f.cash,
//     "page_id":i.page_id,
//   },
//   beforeSend : function (){
//     $("#WidgetCalcPlace").append("<div id='bLoader' class='b-loader-wrapper'><div class='b-loader-container'><div class='b-loader-subcontainer'><div class='b-loader'></div></div></div></div>");
//   },
//   success: function(data){
//     setTimeout(function(){
//       console.log(data);
//       if (data.success == true){
//           dataLayer.push({
//           "sub": "Заявка на оценку авто",
//           "event":"sendWidgetCalcForm",
//           "eventAction":"sendWidgetCalcForm"
//           });	
//         $("#WidgetCalcPlace #bLoader").remove();	
//         $("#WidgetCalcPlace").html("");
//         $("#WidgetCalcPlace").html("<div><h3>Заявка на детальную оценку</h3><p>" + data.message + "</p></div>");

//       } else {
//         $("#WidgetCalcPlace #bLoader").remove();
//       }
//     }, 1000);
//   },
//   error: function(){
//     $("#WidgetCalcPlace #bLoader").remove();
//   }	
//   });    
// };


// function sendFormTestdrive() {
// var f = $('#formTestdrive').serializeObject();
// var i = $('#formPageInfo').serializeObject();
//    $.ajax({
//       type: "POST",
//       url:"/api/forms/post/test-drive/",
//       dataType: "json",
//   data: {
//     "name":f.name,
//     "phone":f.phone,
//     "email":f.email,
//     "site": i.pageTitle,
//   },
//   beforeSend : function (){
//     $("#formTestdrivet").append("<div id='bLoader' class='b-loader-wrapper'><div class='b-loader-container'><div class='b-loader-subcontainer'><div class='b-loader'></div></div></div></div>");
//   },
//   success: function(data){
//     setTimeout(function(){
//       if (data.success == true){
//         $("#formTestdrive #bLoader").remove();	
//         $("#formTestdrive").html("");
//         $("#formTestdrive").append("<div class='b-message text-center my-4'>" + data.message + "</div>");
        
//         dataLayer.push({
//           'event':'sendFormTestdrive',
//           'eventAction':'sendFormTestdrive'
//         });

//       } else {
//         $("#formTestdrive #bLoader").remove();
//       }
//     }, 1000);
//   },
//   error: function(){
//     $("#formTestdrive #bLoader").remove();
//   }	
//   });
// return false;
// }

// $.fn.serializeObject = function(){
//   var o = {};
//   var a = this.serializeArray();
//   $.each(a, function() {
//       if (o[this.name] !== undefined) {
//           if (!o[this.name].push) {
//               o[this.name] = [o[this.name]];
//           }
//           o[this.name].push(this.value || '');
//       } else {
//           o[this.name] = this.value || '';
//       }
//   });
//   return o;
// };
var inputPhone = document.querySelector("#tel");

if (inputPhone) {
    window.addEventListener("DOMContentLoaded", function() {
        function setCursorPosition(pos, elem) {
            elem.focus();
            if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
            else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd("character", pos);
                range.moveStart("character", pos);
                range.select();
            }
        }
         
        function mask(event) {
            var matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            if (def.length >= val.length) val = def;
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
            });
            if (event.type == "blur") {
                if (this.value.length == 2) this.value = ""
            } else setCursorPosition(this.value.length, this)
        };
            var input = document.querySelector("#tel");
            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
        });
}
// По клику на кнопку "меню" меняется класс у навигации
var 
    bodyElement = document.querySelector('body');
    menuButton = document.querySelector('.main-header__button');
    menuList = document.querySelector('.main-header__navigation');

    menuButton.addEventListener('click', function(event){
        menuList.classList.toggle('main-header__navigation--show');
        bodyElement.classList.toggle('body__overflow--hidden');
    });

// Скролл

window.addEventListener('scroll', function(e){
    if(bodyElement.classList == 'body__overflow--hidden'){
        return false;
    } else {
        var
        oldScrollPosition = this.oldScroll || 0,
        newScrollPosition = this.scrollY,
        isScrollDown = newScrollPosition > oldScrollPosition;

        
    document.querySelector('.main-header').classList.toggle('main-header--scroll-up', isScrollDown);

    this.oldScroll = newScrollPosition;
    }
});




