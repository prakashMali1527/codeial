// function to show notification on creating,deleting post,comments

function showNoty(message,type){
    new Noty({
    theme: 'relax',
    text: message,
    type: type,
    layout: 'topRight',
    timeout: 1500
    }).show();
}