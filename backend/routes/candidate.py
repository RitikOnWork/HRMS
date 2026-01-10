"""
routes/candidate.py
-------------------
API routes accessible by candidates.
"""

from flask import Blueprint, request, jsonify, session
from models import db, Application, Job

candidate_bp = Blueprint(
    'candidate',
    __name__,
    url_prefix='/api/candidate'
)


def candidate_required():
    return 'user_id' in session and session.get('role') == 'candidate'


@candidate_bp.route('/jobs', methods=['GET'])
def list_jobs():
    """
    GET /api/candidate/jobs
    Fetch all open jobs with optional filters.
    """

    if not candidate_required():
        return jsonify({"error": "Unauthorized"}), 401

    department = request.args.get('department')
    location = request.args.get('location')

    query = Job.query.filter_by(status='open')

    if department:
        query = query.filter(Job.department.ilike(f"%{department}%"))

    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    jobs = query.all()

    job_list = [
        {
            "id": job.id,
            "title": job.title,
            "department": job.department,
            "location": job.location,
            "vacancies": job.vacancies
        }
        for job in jobs
    ]

    return jsonify(job_list), 200


@candidate_bp.route('/dashboard', methods=['GET'])
def candidate_dashboard():
    """
    GET /api/candidate/dashboard
    Returns candidate basic info.
    """

    if not candidate_required():
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({
        "user": {
            "id": session['user_id'],
            "name": session.get('name'),
            "email": session.get('email'),
            "role": session.get('role')
        }
    }), 200


@candidate_bp.route('/apply', methods=['POST'])
def apply_job():
    """
    POST /api/candidate/apply
    Candidate applies for a job.
    """

    if not candidate_required():
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    job_id = data.get('job_id')

    if not job_id:
        return jsonify({"error": "job_id is required"}), 400

    application = Application(
        candidate_id=session['user_id'],
        job_id=job_id,
        status='applied'
    )

    db.session.add(application)
    db.session.commit()

    return jsonify({"message": "Application submitted"}), 201
