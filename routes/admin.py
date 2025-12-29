"""
routes/admin.py
---------------
Routes for recruitment admins.
"""

from flask import Blueprint, request, jsonify, render_template, session, redirect
from models import db, Job, Application

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')



@admin_bp.route('/dashboard')
def admin_dashboard():
    """
    Recruitment admin dashboard
    """
    if 'user_id' not in session or session.get('role') != 'admin':
        return redirect('/auth/login')

    return render_template(
        'admin/dashboard.html',
        user=session
    )





@admin_bp.route('/ui/create-job')
def create_job_ui():
    return render_template('admin/create_job.html')



@admin_bp.route('/create-job', methods=['POST'])
def create_job():
    """
    POST /admin/create-job

    Creates a new job posting.
    """
    data = request.json

    job = Job(
        title=data['title'],
        department=data['department'],
        location=data.get('location'),
        vacancies=data.get('vacancies', 1),
        eligibility_rules=data.get('eligibility_rules'),
        status='open',
        created_by=data['created_by']
    )

    db.session.add(job)
    db.session.commit()

    return jsonify({"message": "Job created"})


@admin_bp.route('/select', methods=['POST'])
def select_candidate():
    """
    POST /admin/select

    Marks an application as selected.
    """
    data = request.json

    application = Application.query.get(data['application_id'])

    if not application:
        return jsonify({"error": "Application not found"}), 404

    application.status = 'selected'
    db.session.commit()

    return jsonify({"message": "Candidate selected"})
