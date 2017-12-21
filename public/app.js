
$(function() {
  var Cookies = window.Cookies;  
  
  //populate settings
  fetchSettings(function(err, settings) {
    console.log('Gopher Settings: ', settings);
    if(err) {
      console.log('Error fetching settings', err || settings);
      Cookies.remove('gopherToken');
      return displayError("Sorry, Gopher had trouble logging in. Please refresh the page to login again.");
    }
        
    $('.settings-form').removeClass('hide');
    populateSettingsForm('.settings-form', '.fut-setting', settings);
  });
  
  //  if they now just logged in
  if (getUrlParameter('welcome')) {
        
   displaySuccess('This Gopher Extension has been installed on your account and is ready for use');
    $('#welcome').removeClass('hide');
    
    // silently save gopherToken to API so it arrives with future webhooks
    saveSettings({
      "gopher_token": Cookies.get('gopherToken')
    }).error(function(err) {
      displayError("We could not save your login token to Gopher. Some of your email actions may not work properly. Please contact the developer");
    })

  }

  // handle form submission
	$('.settings-form').submit(function() {
		submitSettingsForm(this, '.fut-setting');
		return false;
	});

});