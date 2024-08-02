# Sugbo Eats Web Dashboard

The Sugbo Eats Web Dashboard is a management tool designed to simplify the process of handling restaurant reservations made through the Sugbo Eats mobile app. Built using ReactJS and Firebase, the dashboard allows administrators to manage reservations efficiently.

## Features

- **Retrieve Reservations**: View a comprehensive list of all reservations made through the mobile app.
- **Check-In**: Mark reservations as checked-in once customers arrive at the restaurant.
- **Undo Check-In**: Reverse check-ins if needed.
- **Delete Reservations**: Remove reservations from the list as necessary.
- **Real-Time Updates**: Automatically update reservation data using Firebase.

## Technologies Used

- **ReactJS**: The primary library used for building the user interface.
- **Firebase**: Utilized for data storage and real-time updates.
- **Material-UI**: A UI component library used for styling the dashboard.

## Screenshots

![Sugbo Eats Dashboard Screenshot](https://github.com/ivanovich18/sugbo-eats-dashboard/assets/88656474/43529fe0-983d-4f75-a0b0-fc91647cd582)

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ivanovich18/sugbo-eats-dashboard.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd sugbo-eats-dashboard
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up Firebase:**

   - Create a new project on the [Firebase Console](https://console.firebase.google.com/).
   - Add a web app to your Firebase project.
   - Retrieve your Firebase configuration settings from the console.
   - Create a `.env` file in the root directory and add your Firebase credentials:

     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

5. **Start the development server:**

    ```bash
    npm start
    ```

   - Open [http://localhost:3000](http://localhost:3000) to view the dashboard in your browser.

## Usage

1. **Retrieve Reservations:**

   - Log in to the dashboard to view all current reservations.

2. **Manage Reservations:**

   - Check-in customers, undo check-ins, or delete reservations as needed.

## Members

- Ronilo Jose Cabag
- Miles Dagle
- Aldrin Felices
- John Kevin Genon
- Ivan Suralta
- Rovic Tecson

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
