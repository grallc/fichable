$(function () {

  var $image = $('#image');
  var options = {
        aspectRatio: 16 / 9
      };

  // Initialiser le cropper
  $image.on().cropper();


  // Options puor les toggles
  $('.docs-toggles').on('change', 'input', function () {
    console.log('dezzdzdz')
    var $this = $(this);
    var name = $this.attr('name');
    var type = $this.prop('type');
    
    if (type === 'radio') {
      options[name] = $this.val();
    }
    // mise a jour de la taille du canvas
    $image.cropper('destroy').cropper(options);
  });


  // Methods
  $('.docs-buttons').on('click', '[data-method]', function () {
    var $this = $(this);
    var data = $this.data();
    var result;   

    if ($image.data('cropper') && data.method) {
      data = $.extend({}, data); // Clone a new one          

      result = $image.cropper(data.method, data.option, data.secondOption);       
      
      if (data.method === 'getCroppedCanvas') {
        // affiche le modal
        $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
      }             
    }
  });



  // Import image with blob url
  var $inputImage = $('#inputImage');
  var URL = window.URL;
  var blobURL;

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file; 
            
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          blobURL = URL.createObjectURL(file);
          $image.one('built.cropper', function () {

            // Revoke when load complete
            URL.revokeObjectURL(blobURL);
          }).cropper('reset').cropper('replace', blobURL);
          $inputImage.val('');
        } else {
          window.alert('Please choose an image file.');
        }
      
    });
  } else {
    $inputImage.prop('disabled', true).parent().addClass('disabled');
  }
});
