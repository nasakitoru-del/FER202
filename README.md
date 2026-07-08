# FER202 - React Application

This project is a modern web application built with React and Vite. It serves as a comprehensive frontend lab setup, integrating various essential libraries for building scalable and robust user interfaces.

## 🚀 Technologies Used

- **Framework & Build Tool:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & React Redux
- **Styling:** [Bootstrap 5](https://getbootstrap.com/), [React Bootstrap](https://react-bootstrap.github.io/), & Sass
- **Form Handling & Validation:** [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Authentication:** [Google OAuth](https://github.com/MomenSherif/react-oauth) (`@react-oauth/google`)

## 📦 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory (if you haven't already).
2. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration
1. Copy the `.env.example` file to a new file named `.env` if required by the project setup.
2. Fill in any necessary environment variables such as API endpoints or your Google OAuth Client ID.

### Running the Application

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified in your terminal).

### Building for Production

To create a production-ready build:

```bash
npm run build
```
The compiled assets will be generated in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## 🛠 Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the app for production.
- `npm run lint`: Runs ESLint to check for code quality and style issues.
- `npm run preview`: Locally previews the production build.
