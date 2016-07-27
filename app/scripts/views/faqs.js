//Filequestion: views/faqs.js
define(['jquery','underscore','bootstrap'], 
  function($, _, Bootstrap) {
  	console.log('views/faqs loaded');
    define("faqs.data",[ /** no dependencies. **/ ],
        [
            {
                "id": 1,
                "question": "Who is Sonikpass for?",
                "answer": "Sonikpass can be used by any business of any size, educational institutions, government organizations and  any organization that needs to protect its data."
            },
            {
                "id": 2,
                "question": "How is it different from other IAM and access mananswerment products?",
                "answer": "Sonikpass does not use passwords and its mechanism enforces physical proximity, which prevents attacks arising from phishing, remote login's and a host of other threats."
            },
            {
                "id": 3,
                "question": "Does it have Multi Factor Authentication?",
                "answer": "Sonikpass incorporates invisible MFA, where it uses  a combination of multiple data	sources including but not limited to biometrics, location, time and behaviour data without the need for any additional action from the user."
            },
            {
                "id": 4,
                "question": "Will there be integration, deployment and onboarding support?",
                "answer": "We are here to help you in every way possible. We will work with your company individually to provide the best possible implementation of Sonikpass on your existing systems and infrastructure. Our tech support is available  24/7."
            },
            {
                "id": 5,
                "question": "Does it protect users when they are logging in from a public place?",
                "answer": "Absolutely! Sonikpass does not use WiFi or Bluetooth or Cellular to send authentication data, making it very secure to use in any environment."
            },
            {
                "id": 6,
                "question": "Will there be integration, deployment and onboarding support?",
                "answer": "We are here to help you in every way possible. We will work with your company individually to provide the best possible implementation of Sonikpass on your existing systems and infrastructure. Our tech support is available  24/7."
            },
            {
                "id": 7,
                "question": "How do I get started?",
                "answer": "Just email sales@sonikpass.com and tell us</a> a bit about yourself and your company and we'll take care of the rest."
            }
        ]
    );

    require(["faqs.data","text!../templates/faq-accordion.html",'app'],
    	// @fixme - replace using Marionette Collection
        function( Data, templateHtml ){
            $(function(){
                var faqsList = $( "div.accordion" );
                var template = $( templateHtml );

                var list = $.map(
                    Data,
                    function( Data, index ){
                        var faq = template.clone();
                        faq.find("a.trigger" ).attr( "data-target", '#answer-'+Data.id );
                        faq.find("div.collapse" ).attr( "id", 'answer-'+Data.id ).text(Data.answer);
                        faq.find("span.question").text(Data.question);
                        faq.find("span.circle-num-label span").text(Data.id);
                        // Return the raw node.
                        return( faq.get() );
                    }
                );
                // send compiled template data to DOM
                faqsList.append( list );
                // var Content = _.template(content_html);
    			// return Content;
            });
        }
    );

});

