// Create dynamic express server
const express = require('express');
const cors = require('cors');
// Create monk connection to MongoDB
const monk = require('monk');
// Filter for bad words
const Filter = require('bad-words');
// Rate limiter so someone can't just spam 
const rateLimit = require('express-rate-limit');
const rate_limit_in_sec = 1;


const app = express();

// Connection to DB
const db = monk('localhost/posts');
const posts = db.get('posts'); // Collection
const filter = new Filter();


// Use Cors Middleware
app.use(cors());
// Use JSON body parser middleware
app.use(express.json());



// Add GET / route
app.get('/', (req, res) => {
    res.json({
        message: 'Hey! Not much to `get` here!'
    });
});

function isValidPost(post) {
    return post.name && post.name.toString().trim() !== '' &&
    post.content && post.content.toString().trim() !== '';
}


// Get request for posts
app.get('/posts', (req, res) => {
    posts
    .find()
    .then(allPosts => {
        res.json(allPosts);
    });
});

// post request to remove one post
app.post('/del', (req, res) => {
    console.log(req.body);
    console.log("Hit end point");
    posts.remove({
        "_id": req.body._id
    }).then(result => {
        res.json(result);
    });;
});

app.use(rateLimit({
    windowMs: rate_limit_in_sec * 1000, // 30 seconds
    max: 1 // 1 request per the 30 seconds
  }));


// Add POST 
app.post('/posts', (req, res) => {
    // Validate name and content 
    if(isValidPost(req.body)) {
        // Put into db

        const post = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        };
        console.log(post);



        // Insert into db and then serve back to client
        posts.insert(post)
        .then(createdPost => {
            res.json(createdPost);
        });

    }else{
        // Send error
        res.status(422);
        res.json({
            message: 'You must type in a name and some content!'
        });
    }
});

// Start listening now that we have express app
app.listen(3000, () => {
    console.log('Listening port 3000');
});