# Quiz Crafter Application

## Overview

The **Quiz Crafter** is an advanced MERN Stack Web application that allows authenticated users to create, share, and analyze quizzes. This platform supports two types of quizzes at present: **Multiple Choice Questions (MCQ)** and **Poll-Based Quizzes**. Users can customize quiz options, share the quiz link, and analyze quiz performance data. This application is perfect for educators, trainers, and organizations looking to gather feedback or assess knowledge on specific topics.

## Features

### 1. **Multiple Choice Questions (MCQ) Quiz**
- Users can create MCQ-based quizzes with max up to 4 options per question.
- Each option can include:
  - **Text**
  - **Image**
  - **Both Text & Image**
- Time limit can be set for each question.
- Authenticated users can view and analyze detailed quiz statistics, including:
  - Number of attempts.
  - Correct answers per question.
  - Overall quiz performance.

### 2. **Poll-Based Quiz**
- Users can create a poll to collect information on specific topics or interests.
- Polls can consist of single or multiple questions to gather user preferences or opinions.
- Analysis includes detailed insights into poll responses.

### 3. **Sharing and Quiz Access**
- After creating a quiz (MCQ or Poll), users can generate and share a unique URL.
- Participants can attempt the quiz via the shared URL.
- Authenticated users can track and analyze the number of quiz attempts, completion rates, and correctness of answers.

## Key Functionalities
- **Authentication**: Users must log in to create, manage, and analyze their quizzes.
- **Quiz Creation**: Seamless UI to create both MCQ and Poll quizzes, supporting multimedia content and time limits.
- **Quiz Sharing**: A unique shareable URL is generated for every quiz.
- **Quiz Analytics**: Comprehensive data visualization for quizzes, including:
  - Attempt numbers.
  - Correct and incorrect responses.
  - Participant completion rates.

## Technologies Used
- **Frontend**: 
  - React
  - Tailwind CSS for styling and responsive design.
  - Vite as the build tool.
  
- **Backend**: 
  - Node.js and Express for server-side logic.
  - MongoDB for database management (MongoDB Atlas cloud).
  - JWT for secure authentication.
  
- **Other Tools**: 
  - bcrypt for password hashing.
  - CORS, dotenv for configuration.
  - Nodemon for development.

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn package manager

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/varunbalaji167/MERN_QUIZ_APP.git
   cd MERN_QUIZ_APP
   ```

2. **Install dependencies in Split Terminals**:
   ```bash
   #in one terminal
   cd client
   npm install
   # or
   yarn install
   ```
   ```bash
   #in split terminal
   cd server
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the server directory and configure your environment variables, including database connection strings and JWT secrets.
   ```bash
   PORT = 
   MONGO_URL = 
   JWT_SECRET = 
   ```

4. **Run the application**:
   ```bash
   # in client directory
   npm run dev
   ```
   ```bash
   # in server directory
   nodemon server.js
   ```

## API Endpoints

### User Authentication
- **POST** `/auth/signup` - Create a new user account.
- **POST** `/auth/login` - Authenticate user and log in.

### Quiz Management
- **POST** `/quiz/createQuiz` - Create a new quiz (requires authentication).
- **GET** `/quiz/getQuizzes` - Retrieve all quizzes (requires authentication).
- **GET** `/quiz/getQuiz/:quizId` - Retrieve a specific quiz by ID.
- **PATCH** `/quiz/updateQuiz` - Update an existing quiz.
- **DELETE** `/quiz/deleteQuiz/:quizId` - Delete a specific quiz by ID.
- **PATCH** `/quiz/incrementQuizAttempts/:quizId` - Increment the number of attempts for a quiz (requires authentication).

### Poll Management
- **POST** `/poll/createPoll/:quizId` - Create a new poll for a specific quiz (requires authentication).
- **GET** `/poll/getPolls` - Retrieve all polls.
- **GET** `/poll/getPoll/:quizId` - Retrieve a specific poll by quiz ID.
- **PATCH** `/poll/updatePoll/:quizId` - Update an existing poll.

### MCQ Management
- **POST** `/qna/createQna/:quizId` - Create new Q&A for a specific quiz (requires authentication).
- **GET** `/qna/getQnas` - Retrieve all Q&A entries.
- **GET** `/qna/getQna/:quizId` - Retrieve a specific Q&A by quiz ID.
- **PATCH** `/qna/updateQna/:quizId` - Update an existing Q&A.

### Response Management
- **POST** `/response/:quizId` - Submit responses for a specific quiz.
- **GET** `/response/:quizId` - Retrieve responses for a specific quiz by quiz ID.

## Contributing

Contributions are welcome! Please create an issue or submit a pull request for any improvements or bug fixes.

## Contact Me

For any inquiries or feedback, please contact [varunbalaji917@gmail.com](mailto:varunbalaji917@gmail.com).
