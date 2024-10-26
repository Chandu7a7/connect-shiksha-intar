

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>

  <h1>connect-shiksha Website</h1>

  <p>This project is part of the Connect Shiksha internship program. The Connect Shiksha website is a platform designed to facilitate educational services and resources, built using the MERN stack (MongoDB, Express.js, React.js, Node.js).</p>


  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#about-the-project">About the Project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#technologies-used">Technologies Used</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#license">License</a></li>
  </ul>
  
   
    <h2 id="project-overview">Project Overview</h2>
    <p>The Connect Shiksha website aims to provide a user-friendly interface for students and educators to access educational resources, manage their profiles, and interact with various services offered by Connect Shiksha. The project emphasizes seamless user experience and efficient data management.</p>


  <h2 id="features">Features</h2>
  <ul>
    <li><strong>User Authentication:</strong> Secure login/signup functionality.</li>
    <li><strong>Booking Management:</strong> Create, view, and manage travel bookings.</li>
    <li><strong>Responsive Design:</strong> Works on both desktop and mobile devices.</li>
    <li><strong>Real-time Updates:</strong> Reflects real-time changes in travel details.</li>
    <li><strong>Admin Panel:</strong> Allows administrators to manage bookings and users.</li>
  </ul>

  <h2 id="technologies-used">Technologies Used</h2>
  <ul>
    <li><strong>Frontend:</strong> React.js, Tailwind</li>
    <li><strong>Backend:</strong> Node.js, Express.js</li>
    <li><strong>Database:</strong> MongoDB</li>
    <li><strong>Other:</strong> GitHub for version control, Postman for API testing</li>
  </ul>

  <h2 id="installation">Installation</h2>
  <p>To set up the project locally:</p>
  <ol>
    <li><strong>Clone the repository:</strong>
      <pre><code>git clone https://github.com/Chandu7a7/parul-travel.git
cd parul-travel</code></pre>
    </li>
    <li><strong>Install Dependencies:</strong> Navigate to the frontend and backend directories and install the required packages.
      <pre><code># In the root directory
npm install

# Move to client (React) directory
cd client
npm install</code></pre>
    </li>
    <li><strong>Environment Variables:</strong> Create a <code>.env</code> file in the root directory with the following:
      <pre><code>MONGODB_URI=&lt;Your MongoDB Connection String&gt;
JWT_SECRET=&lt;Your JWT Secret&gt;</code></pre>
    </li>
    <li><strong>Run the Application:</strong>
      <pre><code># Start backend server
npm run dev

# In a separate terminal, start frontend
cd client
npm start</code></pre>
    </li>
  </ol>

  <h2 id="usage">Usage</h2>
  <ul>
    <li><strong>Access the Web Application:</strong> Visit <a href="http://localhost:3000">http://localhost:3000</a> to view the frontend.</li>
    <li><strong>Admin and User Authentication:</strong> Use separate logins for users and admins to access different functionalities.</li>
    <li><strong>Manage Bookings:</strong> Users can create and view bookings, while admins can manage all bookings and user details.</li>
  </ul>

  <h2 id="project-structure">Project Structure</h2>
  <pre><code>parul-travel/
├── client/             # Frontend React application
│   ├── public/         
│   └── src/            # React components, hooks, etc.
├── server/             # Backend application
│   ├── config/         # Database configurations
│   ├── controllers/    # API business logic
│   ├── models/         # MongoDB models
│   ├── routes/         # Express routes
│   └── utils/          # Utility functions
└── README.md</code></pre>

  <h2 id="license">License</h2>
  <p>This project is licensed under the MIT License.</p>

</body>
</html>

