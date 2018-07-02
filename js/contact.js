//////CONTACT FORM VALIDATION
jQuery(document).ready(function ($) {
	
	//if submit button is clicked
	$('#submit').click(function (event) {		
		
		//Get the data from all the fields
		var name = $('input[name=name]');
		var email = $('input[name=email]');
		var regx = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/i;
		var comment = $('textarea[name=comment]');
		var returnError = false;
		
		//Simple validation to make sure user entered something
		//Add your own error checking here with JS, but also do some error checking with PHP.
		//If error found, add hightlight class to the text field
		if (name.val()=='') {
			name.addClass('error');
			returnError = true;
		} else name.removeClass('error');
		
		if (email.val()=='') {
			email.addClass('error');
			returnError = true;
		} else email.removeClass('error');		
		
		if(!regx.test(email.val())){
          email.addClass('error');
          returnError = true;
		} else email.removeClass('error');
		
		
		if (comment.val()=='') {
			comment.addClass('error');
			returnError = true;
		} else comment.removeClass('error');
		
		// Highlight all error fields, then quit.
		if(returnError == true){
			return false;	
		}
		
		//organize the data
		
		//var data = 'name=' + name.val() + '&email=' + email.val() + '&comment='  + encodeURIComponent(comment.val());
		var formData='[{"name"'+':'+'"'+name.val()+'","email":'+'"'+email.val()+'",'+'"comment":'+'"'+comment.val()+'"'+'}]';

		//disabled all the text fields
		$('.text').attr('disabled','true');
		
		//show the loading sign
		$('.loading').show();
		
		//start the ajax
		$.ajax({
			//this is the php file that processes the data and sends email
			url: "https://sokt.io/bFwrBqKN9CEjQ4zdn9zt/personal-testwebhook",	
			async: true,
			crossDomain: true,
			//POST method is used
			method: "POST",
			headers: {"content-type": "application/json","authkey": "ETtusAAR983dzdajYybT"},
			processData: false,
			//pass the data			
			data: formData,		
			
			//Do not cache the page
			cache: false,
			
			//success
			success: function (response) {				
				//if contact.php returned 1/true (send mail success)
				console.log(response);
				//alert(response);
				/*if (html==1) {*/
				
					//show the success message
					$('.done').fadeIn(1000);
					
					$("#contactform").find('input[type=text],input[type=email], textarea').val("");
					
					
				//if contact.php returned 0/false (send mail failed)
				/*} else alert('Sorry, unexpected error. Please try again later.');	*/			
			}		
		});
		
		//cancel the submit button default behaviours
		event.preventDefault();
		return false;
	});	
});	
