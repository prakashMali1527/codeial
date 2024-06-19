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
                    toggleLike();

                    deletePost($(' .delete-post-button', newPost));
                    
                    showNoty(data.message,'success');

                }, error: function (err) {
                    console.log(`Error: ${err.responseText}`);
                    
                    showNoty('Cannot create post!','error');
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
            <div class="post-likes">
                <p><span class="likes-count">${post.likes.length}</span> Likes</p>
                <a class="like-btn" href="like/toggle/?id=${post._id}&type=Post">
                like button
                </a>
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
                    
                    showNoty(data.message,'success');

                }, error: function (error) {
                    console.log(error.responseText);

                    showNoty('Cannot delete post!','error');
                }
            });
        })
    }


    createPost();
    
    // add AJAX deletion to all post which are already present on the page
    $(`.delete-post-button`).each(function(){
        deletePost($(this));
    })


    function toggleLike(){
        $('.post-likes .like-btn').each(function(){
            $(this).click((e)=>{
                e.preventDefault();
                let saveClickLikes = this;
                $.ajax({
                    type: 'get',
                    url: $(this).prop('href'),
                    success: function(data){
                        console.log(data);
                        countLike(data.deleted);
                    }, error: function(error){
                        console.log(error);
                    }
                });
                function countLike(deleted){
                    
                    let likesCount =  $(saveClickLikes).siblings().children('.likes-count').text();
    
            
                    likesCount = parseInt(likesCount);
            
                    if(deleted){
                      likesCount -= 1;
                    }else {
                      likesCount += 1;
                    }
            
                    $(saveClickLikes).siblings().children('.likes-count').text(likesCount);
                }
            });
        });
    }

}

toggleLike();
