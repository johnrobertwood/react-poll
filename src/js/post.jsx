post: function(url, data) {
	$.ajax({
		url: url,
		type: "POST",
		data: JSON.stringify(data),
		contentType: "application/json",
    success: function(data) {
    	this.props.onPollSubmit(data);
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
	})	
},