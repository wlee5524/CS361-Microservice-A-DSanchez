# CS361-Microservice-A-DSanchez

Version 1.0 of Microservice A for David Sanchez's Brainlog Application

The purpose of this microservice is to connect to the database (MongoDB), receive the data from the entry form in David's application in JSON format, validate if the user has already submitted an entry for the day (we only want one entry per day), then submit the data as a JSON object to MongoDB or return a message if it can not submit the entry. 

Sending data to MongoDB and receving data from the front-end entry form is done using Express. Data is handled by the JournalEntry.js, entry.js, db.js, and server.js files within the microservice. There are console.log messages throughout the server.js file to see if the data is being received and processed. Testing can be done by a user submitting their own entries once they setup the correct listening ports. 

How to set up the microservice:
1. Download the frontend folder for David's Brainlog application.
2. Configure the vite.config.js file to that the '/entry' targets 'http://localhost:5000' (This port was arbitrarily decided upon).
3. Create a backend directory and copy the "entries-microservice" and all of its contents into the backend directory.
4. In the .env file within the "entries-microservice" folder, paste in the the correct MongoDB connection string for David's application on the line, MONGODB_CONNECT_STRING=''
5. Open two terminals, one in the frontend directory and one in the "entries-microservice" directory, and run "npm install" to install all relevant packages and dependencies.
6. In the terminal for "entries-microservice", run "node server.js" to get the Express server running. You will see the message "Server running on http://localhost:5000
MongoDB connected", if the server is running correctly.
7. In the terminal for the frontend directory, run "npm run dev". If it is running correctly, you will receive a http://localhost link that will direct you to David's Brainlog application.
8. Login and use the form to test entries. When you submit forms, you should receive messages in the "entries-microservice" terminal that look similar to these:

Received data: {
  wellbeing: 70,
  emotions: [ 'sadness', 'anger', 'surprise' ],
  sleep: '100',
  journal: 'wfweda',
  _u_ID: '67a83357f95db21aed85e3f9'
}
Saving new entry: {
  wellbeing: 70,
  emotions: [ 'sadness', 'anger', 'surprise' ],
  sleep: '100',
  journal: 'wfweda',
  _u_ID: '67a83357f95db21aed85e3f9',
  _id: new ObjectId('67bbbc6e4cde117640f9b5d2'),
  createdAt: 2025-02-24T00:25:18.100Z
}
Entry successfully logged for user: 67a83357f95db21aed85e3f9

Received data: {
  wellbeing: 70,
  emotions: [ 'sadness', 'anger', 'surprise' ],
  sleep: '100',
  journal: 'wfweda',
  _u_ID: '67a83357f95db21aed85e3f9'
}
User 67a83357f95db21aed85e3f9 has already submitted an entry today.

![Screenshot 2025-02-23 170400](https://github.com/user-attachments/assets/100b9c89-c20f-413d-9d14-70f714247067)





