function toggleLike(toggler){
    $(toggler).click((e)=>{
        let self = toggler;
        e.preventDefault();
        $.ajax({
            type: 'get',
            url: $(self).prop('href'),
            success: function(data){
                countLike(data.deleted);
            }, error: function(error){
                console.log(error);
            }
        });
        function countLike(deleted){
            
            let likesCount =  $(self).siblings().children('.likes-count').text();

            likesCount = parseInt(likesCount);
    
            if(deleted){
                likesCount -= 1;
            }else {
                likesCount += 1;
            }
    
            $(self).siblings().children('.likes-count').text(likesCount);
        }
    });
}
    
// add toggle like to already present like button on home page
$('.post-likes .like-btn').each(function(){
    toggleLike(this);
});
$('.comment-likes .like-btn').each(function(){
    toggleLike(this);
});


