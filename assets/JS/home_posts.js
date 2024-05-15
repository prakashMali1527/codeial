{
    // METHOD to submit form data for new post using AJAX
    const createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();
            // manually submit form
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data);
                    let newPost = newPostDom(data.data.post);

                    $('#posts-list-container>ul').prepend(newPost);

                    createComment($(' .new-comment-form', newPost));

                    deletePost($(' .delete-post-button', newPost));
                }, error: function (err) {
                    console.log(`Error: ${err.responseText}`);
                }
            });

        })
    }

    // METHOD to create a post in DOM
    const newPostDom = function (post) {
        return $(`
        <li id="post-${post._id}">
            <div class="post">
                <span> ${post.user.name} </span>
                    <a class="delete-post-button" href="/post/destroy/${post._id}">X</a>
                <div> ${post.content} </div>
            </div>
            <div class="post-comments">
                
                    <form action="/comment/create" class="new-comment-form" method="POST">
                        <input name="comment" type="text" placeholder="comment here..." required>
                        
                        <input type="hidden" name="postID"
                        value="${post._id}">

                        <button type="submit" >Comment</button>
                    </form>
                
            </div>
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">

                </ul>
            </div>
            <br>
        </li>
        `);
    }

    // method to delete a post using AJAX
    const deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        })
    }


    createPost();
    
    // add AJAX deletion to all post which are already present on the page
    $(`.delete-post-button`).each(function(){
        deletePost($(this));
    })
}
