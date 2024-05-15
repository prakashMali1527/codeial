
// METHOD to submit comment data for new comment using AJAX
let createComment = function (newCommentForm) {
    $(newCommentForm).submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/comment/create',
            data: $(newCommentForm).serialize(),
            success: function (data) {
                let commentDOM = newCommentDOM(data.data.comment);

                let post_id = data.data.comment.post;

                $(`#post-comments-${post_id}`).prepend(commentDOM);

                deleteComment($(` .delete-comment-button`,commentDOM));

            }, error: function (error) {
                console.log(`Error: ${error.responseText}`);
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
            },error: function(error){
                console.log(`Error: ${error.responseText}`);
            }
        })
    })
}
