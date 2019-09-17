(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function checkDevice() {
	var isMobile = void 0;
	if (window.innerWidth > 768) {
		isMobile = 3;
	} else {
		isMobile = 1.5;
	}
	$('.makeup--container__content--slick').slick({
		adaptiveHeight: true,
		arrows: true,
		draggable: true,
		slidesToShow: isMobile,
		infinite: false
	});
}
checkDevice();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfODBjOTkyMDEuanMiXSwibmFtZXMiOlsiY2hlY2tEZXZpY2UiLCJpc01vYmlsZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCIkIiwic2xpY2siLCJhZGFwdGl2ZUhlaWdodCIsImFycm93cyIsImRyYWdnYWJsZSIsInNsaWRlc1RvU2hvdyIsImluZmluaXRlIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxTQUFTQSxXQUFULEdBQXVCO0FBQ3RCLEtBQUlDLFdBQVcsS0FBSyxDQUFwQjtBQUNBLEtBQUlDLE9BQU9DLFVBQVAsR0FBb0IsR0FBeEIsRUFBNkI7QUFDNUJGLGFBQVcsQ0FBWDtBQUNBLEVBRkQsTUFFTztBQUNOQSxhQUFXLEdBQVg7QUFDQTtBQUNERyxHQUFFLG9DQUFGLEVBQXdDQyxLQUF4QyxDQUE4QztBQUM3Q0Msa0JBQWdCLElBRDZCO0FBRTdDQyxVQUFRLElBRnFDO0FBRzdDQyxhQUFXLElBSGtDO0FBSTdDQyxnQkFBY1IsUUFKK0I7QUFLN0NTLFlBQVU7QUFMbUMsRUFBOUM7QUFPQTtBQUNEViIsImZpbGUiOiJmYWtlXzgwYzk5MjAxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBjaGVja0RldmljZSgpIHtcblx0dmFyIGlzTW9iaWxlID0gdm9pZCAwO1xuXHRpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcblx0XHRpc01vYmlsZSA9IDM7XG5cdH0gZWxzZSB7XG5cdFx0aXNNb2JpbGUgPSAxLjU7XG5cdH1cblx0JCgnLm1ha2V1cC0tY29udGFpbmVyX19jb250ZW50LS1zbGljaycpLnNsaWNrKHtcblx0XHRhZGFwdGl2ZUhlaWdodDogdHJ1ZSxcblx0XHRhcnJvd3M6IHRydWUsXG5cdFx0ZHJhZ2dhYmxlOiB0cnVlLFxuXHRcdHNsaWRlc1RvU2hvdzogaXNNb2JpbGUsXG5cdFx0aW5maW5pdGU6IGZhbHNlXG5cdH0pO1xufVxuY2hlY2tEZXZpY2UoKTsiXX0=
},{}]},{},[1])