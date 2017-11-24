$(document).ready(function(){
var url = "http://google.com";
        var text = "Some text to share";
        $("#share").jsSocials({
        	url: url,
            text: text,
    		showCount: false,
            shareIn: "popup",

            shares: ["email", "twitter", "facebook","googleplus", "linkedin", "pinterest", "stumbleupon", "whatsapp"]
        });
 })