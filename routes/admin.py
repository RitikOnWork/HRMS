"""
routes/admin.py
---------------
Routes for recruitment admins.
"""

from flask import Blueprint, request, jsonify, render_template, session, redirect
from models import db, Job, Application, User

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')



@admin_bp.route('/job/<int:job_id>/applications')
def view_applications(job_id):
    """
    Show all candidates who applied for a given job.
    Only for admin.
    """

    # security check
    if 'user_id' not in session or session.get('role') != 'admin':
        return redirect('/auth/login')

    # get applications for this job
    applications = (
        db.session.query(Application, User)
        .join(User, Application.candidate_id == User.id)
        .filter(Application.job_id == job_id)
        .all()
    )

    return render_template(
        'admin/applications.html',
        applications=applications,
        job_id=job_id
    )


@admin_bp.route('/select-candidate/<int:application_id>', methods=['POST'])
def select_candidate_admin(application_id):
    """
    Marks an application as SELECTED.
    """

    if 'user_id' not in session or session.get('role') != 'admin':
        return redirect('/auth/login')

    application = Application.query.get(application_id)

    if application:
        application.status = 'shortlisted'
        db.session.commit()

    return redirect(request.referrer)



@admin_bp.route('/dashboard')
def admin_dashboard():
    """
    Recruitment admin dashboard
    """
    if 'user_id' not in session or session.get('role') != 'admin':
        return redirect('/auth/login')
    
    jobs = Job.query.all() 

    return render_template(
        'admin/dashboard.html',
        user=session,
        jobs=jobs
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


'''

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

    '''