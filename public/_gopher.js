//  This file is served via token-parsing middleware to swap out the tokens below

// Globals
var Cookies  = window.Cookies;
var _ = window._;
var NProgress = window.NProgress;
var gopherBaseUrl = '{{ gopherBaseUrl }}';
  
function displayError(err) {
  $('#error').removeClass('hide').append("<p>Error: " + err + "</p>");
  console.log(err);
}

function displaySuccess(message) {
  $('#success').removeClass('hide').append(message);
}

function getLoginCookie() {
  return Cookies.get('gopherToken') ? true : false;
}

function fetchSettings(cb) {
  
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": gopherBaseUrl + "api/v1/extensions/self/data/",
    "method": "GET",
    "headers": {
      "authorization": "Bearer " + Cookies.get('gopherToken'),
      "cache-control": "no-cache",
    }
  }
    
  NProgress.start();
  $.ajax(settings).done(function (response) {
    NProgress.done();
    cb(null, response.data);

  }).fail(function(err) {
    NProgress.done();
    cb(err, null)
  });
}
  
  
function populateSettingsForm(formElement, formItemSelector, settings) {
  var form = $(formElement);

  if (!settings) return;

  _.forEach(form.find(formItemSelector), function (settingsField) {
    switch (settingsField.type) {
      case 'checkbox':
        settingsField.checked = (settings[settingsField.id] == true);
        break;
      case 'radio':
        if (settingsField.value === settings[settingsField.name]) {
          settingsField.checked = true;
        }
        break;
      default:
        settingsField.value = settings[settingsField.id] || '';
    }
  });
}

function submitSettingsForm(formElement, formItemSelector) {
  var formData = {};

  _.forEach($(formElement).find(formItemSelector), function (settingsField) {
    switch (settingsField.type) {
      case 'checkbox':
        formData[settingsField.id] = settingsField.checked ? 1 : 0;
        break;
      case 'radio':
        if (settingsField.checked) formData[settingsField.name] = settingsField.value;
        break;
      default:
        formData[settingsField.id] = settingsField.value;
    }
  });

  saveSettings(formData);
}

function saveSettings(settings, cb) {
  NProgress.start();

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": gopherBaseUrl + "api/v1/extensions/self/data/",
    "method": "POST",
    "headers": {
      "authorization": "Bearer " + Cookies.get('gopherToken'),
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
    "processData": false,
    "data": JSON.stringify(settings)
  }
  
  NProgress.start();
  $.ajax(settings).done(function (response) {
      NProgress.done();
      displaySuccess('Settings saved!');
      if(cb) cb(null, response);
  }).catch(function (err) {
      NProgress.done();
      displayError('<p>Sorry, there was an error saving your options. Please try <a class="alert-link" href="/connectGopher">logging in again</a>. If this continues to be a problem please <a class="alert-link" href="http://help.followupthen.com/contact">contact us</a>.</p> (' + err.responseText + ')')
      if(cb) cb(err.responseText);
  });
  
}

//https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
function getUrlParameter(sParam) {
   var sPageURL = decodeURIComponent(window.location.search.substring(1)),
     sURLVariables = sPageURL.split('&'),
     sParameterName,
     i;

   for (i = 0; i<sURLVariables.length; i++) {
     sParameterName = sURLVariables[i].split('=');
     if (sParameterName[0] === sParam) {
       return sParameterName[1] === undefined ? true : sParameterName[1];
     }
   }
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}