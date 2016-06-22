var React = require('react');

var Login = React.createClass({

	componentDidMount: function() {
	  window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '136653380075831',
	      cookie     : true,  // enable cookies to allow the server to access
	                        // the session
	      xfbml      : true,  // parse social plugins on this page
	      version    : 'v2.1' // use version 2.1
	    });

	    // Now that we've initialized the JavaScript SDK, we call
	    // FB.getLoginStatus().  This function gets the state of the
	    // person visiting this page and can return one of three states to
	    // the callback you provide.  They can be:
	    //
	    // 1. Logged into your app ('connected')
	    // 2. Logged into Facebook, but not your app ('not_authorized')
	    // 3. Not logged into Facebook and can't tell if they are logged into
	    //    your app or not.
	    //
	    // These three cases are handled in the callback function.
	    FB.getLoginStatus(function(response) {
	      this.statusChangeCallback(response);
	    }.bind(this));
	  }.bind(this);

	  // Load the SDK asynchronously
	  (function(d, s, id) {
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) return;
	    js = d.createElement(s); js.id = id;
	    js.src = "//connect.facebook.net/en_US/sdk.js";
	    fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));
	},

  render: function() {
    return (
    	<div>
	    	<div>
		    	<h1>Login</h1>
		      <ul>
		        <li><a href="/">Home</a></li>
		        <li><a href="#/login">Login</a></li>
		      </ul>
	      </div>
	  		<div 
	  		   className="fb-login-button" 
	  		   data-max-rows="1" 
	  		   data-size="xlarge" 
	  		   data-show-faces="false" 
	  		   data-auto-logout-link="true"
	  		   >
	  		</div>
  		</div>
    )
  }  
})

module.exports = Login