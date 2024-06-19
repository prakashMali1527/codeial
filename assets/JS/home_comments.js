
// METHOD to submit comment data for new comment using AJAX
let createComment = function (newCommentForm) {
    $(newCommentForm).submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/comment/create',
            data: $(newCommentForm).serialize(),
            success: function (data) {
                let newComment = newCommentDOM(data.data.comment);

                let post_id = data.data.comment.post;

                $(`#post-comments-${post_id}`).prepend(newComment);

                // call toggle like event listener for this new comment
                toggleLike($(' .comment-likes .like-btn', newComment));

                deleteComment($(` .delete-comment-button`,newComment));

                showNoty(data.message,'success');

            }, error: function (error) {
                console.log(`Error: ${error.responseText}`);

                showNoty('Error creating comment!','error');
            }
        })
    })
}

// METHOD to create a comment in DOM
let newCommentDOM = function (comment) {
    return $(`
    <li id="comment-${comment._id}">
        <a class="delete-comment-button" href="/comment/destroy/${comment._id}">x</a>
    
        <p> ${comment.content}</p>
        <small> ${comment.user.name} </small>
        <div class="comment-likes">
                <p><span class="likes-count">${comment.likes.length}</span> Likes</p>
                <a class="like-btn" href="like/toggle/?id=${comment._id}&type=Comment">
                like button
                </a>
        </div>
    </li>   
    `);
}

// method to delete a comment using AJAX

let deleteComment = function(deleteLink){
    $(deleteLink).click(function(e){
        console.log('comment deleted');
        e.preventDefault();

        $.ajax({    
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                $(`#comment-${data.data.comment_id}`).remove();

                showNoty(data.message,'success');

            },error: function(error){
                console.log(`Error: ${error.responseText}`);

                showNoty('Cannot delete comment!','error');
            }
        })
    })
}

// add AJAX comment create to all post which are already present on the page
$(`.new-comment-form`).each(function(){
    createComment($(this));
})

// add AJAX comment deletion to all comment which are already present on the page
$('.delete-comment-button').each(function(){
    deleteComment($(this));
})
