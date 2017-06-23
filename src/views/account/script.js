window.onload = function() {
  // If values are not blank, restore them to the fields
  var usernameForm = sessionStorage.getItem('usernameForm');
  if (usernameForm !== null) $('#username').val(name);

  var emailForm = sessionStorage.getItem('emailForm');
  if (emailForm !== null) $('#inputEmail').val(emailForm);
}

// Before refreshing the page, save the form data to sessionStorage
window.onbeforeunload = function() {
  sessionStorage.setItem("usernameForm", $('#inputName').val());
  sessionStorage.setItem("emailForm", $('#email').val());
}
