# Chatbot with History and Document Retrieval

This project implements a sophisticated chatbot that maintains chat history, processes user queries with context, retrieves relevant information from a vector database, and generates responses using a language model. The chatbot leverages Langchain, OpenAI, Supabase, and Upstash Redis for robust performance.

## Features

- **Chat History Management**: Keeps track of user queries and responses to maintain context across sessions.
- **Query Enhancement**: Enhances user queries based on chat history for more accurate information retrieval.
- **Document Retrieval**: Uses a vector database to find relevant documents based on user queries.
- **Response Generation**: Generates responses using OpenAI's GPT-3.5-turbo model, based on retrieved documents and enhanced queries.
- **File Upload**: Custom file upload component to allow users to upload documents for reference.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Usage](#usage)
4. [Components](#components)
5. [Contributing](#contributing)
6. [License](#license)

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- PostgreSQL database
- Supabase account
- OpenAI API key
- Upstash Redis account

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/yourrepository.git
    cd yourrepository
    ```

2. **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root of the project and add the following:

    ```env
    DATABASE_URL=your_postgresql_database_url
    OPENAI_API_KEY=your_openai_api_key
    SUPABASE_URL=your_supabase_url
    SUPABASE_ANON_KEY=your_supabase_anon_key
    UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
    UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
    ```

4. **Run database migrations**:

    ```bash
    npx prisma migrate dev
    ```

5. **Start the development server**:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Configuration

Configure your models and services in the following files:

- **Prisma Schema**: `prisma/schema.prisma`
- **Supabase Vector Database**: `utils/SupabaseClient.ts`
- **Chat History Management**: `utils/ChatHistory.ts`
- **Custom File Upload Component**: `components/FileUpload.tsx`

## Usage

### Chatbot Interaction

1. **File Upload**: Users can upload documents which will be used for reference by the chatbot.
2. **User Query**: The user inputs a query which is enhanced using the chat history.
3. **Document Retrieval**: The enhanced query is used to search the vector database for relevant documents.
4. **Response Generation**: The retrieved documents and the enhanced query are fed into the language model to generate a response.

### Components

- **FileUpload Component**: Custom component to handle file uploads.
- **BottomInput Component**: User input field integrated with the file upload functionality.
- **ChatHistory.ts**: Manages the chat history using Upstash Redis.
- **SupabaseClient.ts**: Interacts with Supabase to store and retrieve documents.
- **Rag.ts**: Implementation of the Retrieval-Augmented Generation process.

## Contributing

We welcome contributions to improve the project. Here are the steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
