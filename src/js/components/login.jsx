import React from "react";
let facebookLoginWindow
export default class Login extends React.Component {
	
	render() {
		return <div className="sp-login">
					<button className="btn btn-primary" onClick={()=>this.login()}>Login with Facebook</button>
				</div>
	}
	login(){
		var fbUrl = "/auth/facebook"
		var popupWidth=500;
	    var popupHeight=400;
	    var xPosition=(window.innerWidth-popupWidth)/2;
	    var yPosition=(window.innerHeight-popupHeight)/2;
		facebookLoginWindow=window.open(fbUrl, "facebookLoginWindow","location=1,scrollbars=1,"+"width="+popupWidth+",height="+popupHeight+","+"left="+xPosition+",top="+yPosition);
		if (window.focus) {
	        facebookLoginWindow.focus();
	    }
		var pollTimer   =   window.setInterval(function() { 
                try {
                    
                    if (facebookLoginWindow.document.URL.indexOf('close') != -1) {
                        window.clearInterval(pollTimer);
                        var url =   facebookLoginWindow.document.URL;
                        facebookLoginWindow.close();
                        window.location.href="/"
                    }
                } catch(e) {
                }
       }, 100);
	}
	

}
