FastAPI + React E-Commerce Website
A full-stack e-commerce web application built with FastAPI (Python) for the backend and React for the frontend. This project demonstrates a modern, production-style architecture for building online store applications with features like product listings, user authentication, shopping cart, and order management.
Repository: 
github.com/burhanali-b/fastapi-react-ecommerce

Features
•	Browse and search products by category
•	User authentication (Sign up / Login) with JWT
•	Add to cart and manage cart items
•	Order placement and order history
•	User profile management
•	Admin panel for managing products/orders (if applicable)
•	Responsive UI built with React
Tech Stack
Backend
•	FastAPI
•	Python 3.x
•	SQLAlchemy (ORM)
•	PostgreSQL / SQLite (Database)
•	Pydantic (Data validation)
•	JWT Authentication
Frontend
•	React.js
•	Axios (API requests)
•	React Router
•	CSS / Tailwind / Bootstrap (whichever you used)
Project Structure
fastapi-react-ecommerce/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── main.py
│   │   └── database.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── ...
└── README.md
Installation & Setup
Prerequisites
•	Python 3.9+
•	Node.js 16+
•	npm or yarn
•	PostgreSQL (optional, if not using SQLite)
1. Clone the repository
git clone https://github.com/burhanali-b/fastapi-react-ecommerce.git
cd fastapi-react-ecommerce
2. Backend Setup
cd backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Create a .env file in the backend folder:
DATABASE_URL=your_database_connection_string
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
Run the FastAPI server:
uvicorn app.main:app --reload
The backend will be available at http://127.0.0.1:8000
API docs: http://127.0.0.1:8000/docs
3. Frontend Setup
cd frontend
npm install
npm start
The frontend will be available at http://localhost:3000
API Documentation
FastAPI automatically generates interactive API documentation:
•	Swagger UI: http://127.0.0.1:8000/docs
•	ReDoc: http://127.0.0.1:8000/redoc
Screenshots
(Add screenshots of your app here)
Contributing
Contributions are welcome! Feel free to fork this repository, open issues, or submit pull requests.
•	Fork the project
•	Create your feature branch (git checkout -b feature/AmazingFeature)
•	Commit your changes (git commit -m 'Add some AmazingFeature')
•	Push to the branch (git push origin feature/AmazingFeature)
•	Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.
Author
Burhan Ali
github.com/burhanali-b
