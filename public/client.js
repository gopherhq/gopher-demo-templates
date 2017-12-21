// client-side js
// add other scripts at the bottom of index.html

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

$(function() {
  
  //keep on http to avoid https errors while on staging
  if (document.location.href.indexOf('https') === 0) {
    document.location.href = 'http://' + document.location.hostname + document.location.pathname;  
  }
  
  // must be logged in to be on settings
  if ( document.location.href.indexOf('settings') === '-1' &&  !getCookie('gopherToken')) {
     document.location.href = "/auth";
  }
  
});
