
// --- my commments ---
// https://www.tutorialspoint.com/nodejs/nodejs_express_framework.html
// homework: test-driven-todo-api 
//           https://github.com/den-materials/test-driven-todo-api
// uses Mocha js test framework 
// uses Chai assertion library (lets you know code is correct) for node.js since Mocha does not include it
// require express and other modules
// NOTE: compact way of writing several variables instead reapeating var...;
var express = require('express'), 
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
// This is a node.js middleware for handling JSON, Raw, Text and URL encoded form data.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  // res.send('hello world');
  // link to html page
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.

  - req = Request Object − The request object represents the HTTP request and 
 has properties for the request query string, parameters, body, HTTP 
 headers, and so on.

 - res = Response Object − The response object represents the HTTP response 
 that an Express app sends when it gets an HTTP request.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
  res.json({ todos: todos }); 
  // res.json(todos);
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var newTodo = req.body;
    //check for current entries
    if (todos.length > 0) {
        newTodo._id = todos[todos.length - 1]._id + 1;
      } else {
        // if no entries, set id to 1
        newTodo._id = 1;
      }
      // update todos with new todo
      todos.push(newTodo);
      res.json(newTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
  var todoId = parseInt(req.params.id);
  // filters by id
  var foundTodo = todos.filter(function (todo) {
        return todo._id == todoId;
      })[0];

   res.json(foundTodo);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */    
   var todoId = Number(req.params.id);

    if(!req.body.task || !req.body.description) {
      res.send('fill out task and description');

    } else
   
      req.body.id = todoId;
      var newTodo = todos.find(function(todos) {
      return todos._id === Number(req.params.id);

    });

    newTodo.task = req.body.task;

    newTodo.description = req.body.description;
    // console.log(newTodo);
    res.json(newTodo);
  
   // console.log('req.params' + JSON.stringify(req.params));
   // console.log('req.body' + req.body);

});

   // }


app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.s
   */
   var todoId = Number(req.params.id);
   var deleteTodo = todos.splice( (todoId - 1), 1);
   
   // console.log(deleteTodo);

   res.json(deleteTodo);

});



/**********
 * SERVER *
 **********/

// listen on port 3000
// const port = process.env.PORT || 3000; // incase want to use const
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
