
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