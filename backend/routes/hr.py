"""
routes/hr.py
------------
API routes for HR admins.
"""

from flask import Blueprint, request, jsonify, session
from models import db, Employee, CandidateProfile, Transfer, User

hr_bp = Blueprint(
    'hr',
    __name__,
    url_prefix='/api/hr'
)


def hr_required():
    return 'user_id' in session and session.get('role') == 'HR'


@hr_bp.route('/dashboard', methods=['GET'])
def hr_dashboard():
    """
    GET /api/hr/dashboard
    Returns basic HR dashboard info.
    """

    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({
        "user": {
            "id": session['user_id'],
            "name": session.get('name'),
            "email": session.get('email'),
            "role": session.get('role')
        }
    }), 200


@hr_bp.route('/user', methods=['GET'])
def get_hr_user():
    """
    GET /api/hr/user
    Returns a user with role = 'hr' (first match).
    """
    user = User.query.filter_by(role='hr').first()
    if not user:
        return jsonify({"error": "No HR user found"}), 404
    return jsonify({
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }), 200


@hr_bp.route('/create-employee', methods=['POST'])
def create_employee():
    """
    POST /api/hr/create-employee
    Converts selected candidate into employee.
    """

    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json

    candidate = CandidateProfile.query.get(data.get('candidate_id'))
    if not candidate:
        return jsonify({"error": "Candidate not found"}), 404

    employee = Employee(
        user_id=candidate.user_id,
        employee_code=data['employee_code'],
        department=data['department'],
        designation=data['designation'],
        pay_grade=data['pay_grade'],
        date_of_joining=data['date_of_joining'],
        status='active'
    )

    db.session.add(employee)
    db.session.commit()

    return jsonify({
        "message": "Employee created successfully",
        "employee_id": employee.id
    }), 201


@hr_bp.route('/transfer', methods=['POST'])
def transfer_employee():
    """
    POST /api/hr/transfer
    Handles employee transfer.
    """

    if not hr_required():
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json

    employee = Employee.query.get(data.get('employee_id'))
    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    transfer = Transfer(
        employee_id=employee.id,
        from_department=employee.department,
        from_location=data.get('from_location'),
        to_department=data['to_department'],
        to_location=data.get('to_location'),
        effective_date=data['effective_date'],
        order_number=data.get('order_number'),
        reason=data.get('reason')
    )

    db.session.add(transfer)

    employee.department = data['to_department']

    db.session.commit()

    return jsonify({
        "message": "Employee transferred successfully",
        "employee_id": employee.id
    }), 200
