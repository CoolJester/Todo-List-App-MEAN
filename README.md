# Todo-List-App-MEAN

My final course project. I was tasked to create a Todo list app (task management app). The application will allow users to register, login, and create tasks which have a due date.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Backend Specs

### Users & Authentication

- Authenticate using jwt token
  - Token's expire in 30 days and have userId payloads
  - Add middleware for authentication
- User Registration
  - Once registered send back token with userId payload valid for 30 days
  - Hash the passwords
  - _post_ request to create user
- User Login
  - Login using email and password
  - Check email if available in db, check password against hashed pass
  - When successful send back a token with userId payload valid for 30 days
  - _post_ request to login
- User Logout
  - return a reset token to null
  - _post_ request with user data to logout
- User Delete Profile
  - Validate info (email and confirmation)
  - _delete_ request to remove the user and all data (tasks, workspaces) related to the user
- Reset Password
  - When requested send an email with a link that has token for resetting
    - validate the user if they appear on db
    - encode a token in the link sent to user and check it
    - token valid for 10 mins
    - _put_ request to change the password if token is valid
- Change Password
  - When requested while logged in
    - validate if current, new, confimed password's are valid (server side and client side)
    - update the password via a _put_ request

### Workspaces - (Authenticate)

- Create Workspace
  - create for the logged in user
  - post request with some user info
- Search Workspace
  - retrive data related to what the user searched
  - _get_ request with body to filter
- Share Workspace
  - create a shareable link with a token that has workspace.\_id as a payload and creation meta data
  - validate token then send tasks data as responce
  - _get_ request to server _responce_ shareable link

### Tasks - (Authenticate)

- Get Tasks
  - use user.\_id to filter and get all tasks belonging to a user
  - use workspace.\_id to filter tasks belonging to a workspace for a user
  - Pagination on card view
  - Filter by fields
  - Limit results
  - _get_ request with some meta data
- Add Task
  - validate user and workspace
  - capture incoming data, only the name is required
  - _post_ request with body or files
- Edit Task
  - validate user and workspace
  - update with new data
  - _put_ request with body
- Upload Files
  - validate user, workspace and task
  - upload images/pdf's for a specific task
  - Store files on the server filesystem
- Share Task
  - create a shareable link with a token that has task.\_id as a payload and creation meta data
  - validate token then send tasks data as responce
  - _get_ request to server _responce_ shareable link

### Security

- Encrypt passwords
- CORS make API public for a select few request methods
- Add helmet headers for additional security
- Stop cross site scripting - XSS
- Prevent NoSql Injections
