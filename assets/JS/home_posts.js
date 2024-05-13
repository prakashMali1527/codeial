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
                    <a id="delete-post-button" href="/post/destroy/${post._id}">X</a>
                <div> ${post.content} </div>
            </div>
            <div class="post-comments">
                
                    <form action="/comment/create" class="new-comment-form" method="POST">
                        <input name="comment" type="text" placeholder="comment here..." required>
                        <!-- Try input type="hidden" passes hidden data-->
                        <button type="text" name="postID" value="${post._id}">comment</button>
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

    createPost();
}
