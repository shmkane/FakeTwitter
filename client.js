const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const postsElement = document.querySelector('.posts');
const rate_limit_in_sec = 1;
// ec2-18-118-5-132.us-east-2.compute.amazonaws.com
const API_URL = "http://ec2-18-118-5-132.us-east-2.compute.amazonaws.com:3000";

loading.style.display = '';

listAllPosts();

form.addEventListener('submit', event=> {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    
    const post = {
        name, 
        content
    };

    form.style.display = 'none';
    loading.style.display = '';

    fetch(API_URL + "/posts", {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'content-type' : 'application/json'
        }
    }).then(response => response.json())
    .then(createdPost => {
        console.log(createdPost);

        form.reset();
        form.style.display = 'none';
        loading.style.display = '';

        setTimeout(() => {
            loading.style.display = 'none';
            form.style.display = '';

        }, rate_limit_in_sec * 1000);

        listAllPosts();
    });

});

function listAllPosts () {
    console.log('Loading all posts');
    postsElement.innerHTML = "";

    fetch(API_URL + "/posts")
    .then(res => res.json())
    .then(posts => {
        posts.reverse();
        posts.forEach(post => {
            //The outer shell
            const outerDiv = document.createElement('div');
            outerDiv.classList.add('container', 'alert', 'alert-primary', 'post');

            //Inner options/buttons
            const div = document.createElement('div');
            div.classList.add('d-flex', 'flex-row');

            //Name
            const header = document.createElement('h3');
            header.textContent = post.name;

            //Text
            const contents = document.createElement('p');
            contents.textContent = post.content;

            //Date
            const date = document.createElement('small');
            date.textContent = new Date(post.created).toISOString();
            date.classList.add('text-center', 'p-2');

            //Like button
            const like = document.createElement('button');
            like.classList.add('btn', 'btn-outline-success', 'btn-sm', 'float-left', 'p-2');
            like.textContent = "Like";

            //Delete button
            const del = document.createElement('button');
            del.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'float-right', 'p-2');
            del.textContent = "Delete";

            // On click listener
            del.addEventListener('click', event => {
                console.log('Clicked on delete');
                fetch(API_URL + "/del", {
                    method: 'POST',
                    body: JSON.stringify(post),
                    headers: {
                        'content-type' : 'application/json'
                    }
                }).then(() => {
                    listAllPosts();
                });


            });


            outerDiv.appendChild(header);
            outerDiv.appendChild(contents);
            outerDiv.appendChild(div);
            div.appendChild(like);
            div.appendChild(date);
            div.appendChild(del);

            outerDiv.classList.add('shadow');

            postsElement.appendChild(outerDiv);


        });
        console.log(posts);
        loading.style.display = 'none';

    });
}
