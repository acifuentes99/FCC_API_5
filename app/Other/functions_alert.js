(function () {
   //var subbtn = document.querySelector('#sub_btn');
   var subbtn = document.querySelector('#bt');
   var apiUrl = '/size';

   subbtn.addEventListener('click', function () {
      ajaxFunctions.ajaxRequest('GET', apiUrl, alertSize_);
   }, false);

    function alertSize(){
      ajaxFunctions.ajaxRequest('GET', apiUrl, alertSize_);
    }

   function alertSize_ (data) {
      //var clicksObject = JSON.parse(data);
      alert(data);
   }

})();
