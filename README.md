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
- Reset Password
  - When requested send an email with a link that has token for resetting
    - validate the user if they appear on db
    - encode a token in the link sent to user and check it
    - token valid for 10 mins
    - _put_ request to change the password if token is valid

### Tasks - (Authenticate)

- Get Tasks
  - use user.\_id to filter and get all tasks belonging to a user
  - use workspace.\_id to filter tasks belonging to a workspace for a user
  - Tasks should be matching the organization they are added to _if-provided_ (new)
  - Pagination on card view
  - Filter by fields
  - Limit results
  - _get_ request with some meta data
- Add Task
  - validate user and workspace
  - capture incoming data, only the name is required
  - capture the task organization it belongs to _if-provided_ (new)
  - log task added in log (new)
  - _post_ request with body or files
- Edit Task
  - validate user and workspace
  - update with new data
  - log task edited and who edited in log (new)
  - _put_ request with body

### Organisations (new)

- Create an organization
  - Capture userId for the user that created the organization and only allow them to add other users
  - Capture a list of users in an organization
  - Capture name of organization
  - _post_ request with a body
- Get users
  - Return all the users in an organization
  - _get_ request with body
- Get organizations
  - Get all tasks that match the organization id
  - _get_ request with organization_id in body
- User management
  - Send an invite by passing email _post_ request with email in body
  - Get invites using userId and finding email _get_ request with token (current user) in body
  - Remove user from organizaiton list _post_ request with email in body

### Chat system

- _tbt_

### Security

- Encrypt passwords
- CORS make API public for a select few request methods
- Add helmet headers for additional security
- Stop cross site scripting - XSS
- Prevent NoSql Injections
