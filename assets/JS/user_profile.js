let updateForm = $('#update-form');
updateForm.css('display', 'none');

let formShown = false;

$('#update-button').click(function (e) {
    if(!formShown){
        updateForm.css('display', 'block');
    }
    else {
        updateForm.css('display', 'none');
    }
    formShown = (!formShown);
})