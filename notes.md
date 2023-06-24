# Sites Similiar to what we want

## Monday.com

> Software that's mainly used for managing projects but we can use it also for task's

Features on the site

- Add a Workspace (Group Tasks)
  Tasks are put inside a workspaces and grouped in there for an individual user

- Display Data
- Card format for the tasks
- Table format for the tasks
- Calendar format with plots for the dates related to the tasks
- List tasks in a list format with stats
- A summary for the status of tasks for that week

- Fields for Tasks
  - Task Name
  - Additional/Update Notes for Task
  - Status
  - Date
  - Files

- Manage Tasks
  - Add new a task
  - Share a task
  - Delete a task
  - Edit a task
    - Change the name of the task
    - Change the status of the task
    - Change the date of the task
  - Add a file to task (image, pdf, etc)

- Filtering
  - Search
  - Name (A-Z, 0-1)
  - Status (Done, Busy with it, Stuck, etc)
  - Date (Today, Tommorrow, Next Week)
  - Sort

- User Account Management
  - Login
  - Logout
  - Forgot password
  - Update password
  - Delete Profile

# NOTES ON API FUNCTIONALITY

## Users & Authentication

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

## Workspaces - (Authenticate)

- Create Workspace
  - create for the logged in user
  - post request with some user info
- Search Workspace
  - retrive data related to what the user searched
  - _get_ request with body to filter
- Share Workspace
  - create a shareable link with a token that has workspace._id as a payload and creation meta data
  - validate token then send tasks data as responce
  - _get_ request to server *responce* shareable link

## Tasks - (Authenticate)

- Get Tasks
  - use user._id to filter and get all tasks belonging to a user
  - use workspace._id to filter tasks belonging to a workspace for a user
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
  - create a shareable link with a token that has task._id as a payload and creation meta data
  - validate token then send tasks data as responce  
  - _get_ request to server *responce* shareable link

## Security

- Encrypt passwords
- CORS make API public for a select few request methods
- Add helmet headers for additional security
- Stop cross site scripting - XSS
- Prevent NoSql Injections
