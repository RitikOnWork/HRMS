"""
routes/auth.py
--------------
Authentication APIs using Flask sessions.
"""

from flask import Blueprint, request, jsonify, session
from werkzeug.security import check_password_hash, generate_password_hash
from models import db, User

auth_bp = Blueprint(
    'auth',
    __name__,
    url_prefix='/api/auth'
)


# ---------------------------
# Login
# ---------------------------
@auth_bp.route('/login', methods=['POST'])
def login():
    """
    POST /api/auth/login
    Authenticates user and creates session.
    """

    data = request.json

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Create session
    session.clear()
    session['user_id'] = user.id
    session['role'] = user.role
    session['name'] = user.name
    session['email'] = user.email

    return jsonify({
        "message": "Login successful",
        "role": user.role
    }), 200


# ---------------------------
# Signup (Candidate only)
# ---------------------------
@auth_bp.route('/signup', methods=['POST'])
def signup():
    """
    POST /api/auth/signup
    Creates candidate user and logs them in.
    """

    data = request.json

    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')

    if not all([name, email, phone, password]):
        return jsonify({"error": "All fields are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    password_hash = generate_password_hash(password)

    user = User(
        role='candidate',
        name=name,
        email=email,
        phone=phone,
        password_hash=password_hash
    )

    db.session.add(user)
    db.session.commit()

    # Auto-login
    session.clear()
    session['user_id'] = user.id
    session['role'] = user.role
    session['name'] = user.name
    session['email'] = user.email

    return jsonify({
        "message": "Signup successful",
        "role": user.role
    }), 201


# ---------------------------
# Logout
# ---------------------------
@auth_bp.route('/logout', methods=['POST'])
def logout():
    """
    POST /api/auth/logout
    Clears session.
    """

    session.clear()
    return jsonify({"message": "Logged out"}), 200


# ---------------------------
# Get Current User (Very Important)
# ---------------------------
@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    """
    GET /api/auth/me
    Returns logged-in user info.
    """

    if 'user_id' not in session:
        return jsonify({"authenticated": False}), 401

    return jsonify({
        "authenticated": True,
        "user": {
            "id": session['user_id'],
            "role": session['role'],
            "name": session['name'],
            "email": session['email']
        }
    }), 200
