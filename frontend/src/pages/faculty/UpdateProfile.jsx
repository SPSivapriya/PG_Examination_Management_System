import React, { useState, useEffect } from 'react';
import axios from 'axios';

const defaultProfile = {
  facultyId: '',
  employeeId: '',
  name: '',
  email: '',
  course: '',
  courseCode: '',
  position: '',
  contactInfo: { email: '', phone: '' },
  areasOfExpertise: [''],
  classesHandled: [{ subject: '', semester: '', section: '', year: '' }],
  dob: '',
  dateOfJoining: '',
  department: '',
  gender: '',
  profilePicUrl: '',
  isActive: true,
  scaleOfPay: '',
  presentPay: '',
  natureOfAppointment: ''
};

const UpdateProfile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const loggedInFaculty = localStorage.getItem('loggedInFaculty');
    if (loggedInFaculty) {
      const faculty = JSON.parse(loggedInFaculty);
      if (faculty.facultyId) {
        // Fetch from backend
        axios.get(`/api/faculty/${faculty.facultyId}`)
          .then(res => {
            setProfile({ ...defaultProfile, ...res.data });
            setFetching(false);
          })
          .catch(() => {
            setProfile(prev => ({ ...prev, ...faculty }));
            setFetching(false);
          });
      } else {
        setProfile(prev => ({ ...prev, ...faculty }));
        setFetching(false);
      }
    } else {
      setFetching(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('contactInfo.')) {
      const key = name.split('.')[1];
      setProfile({ ...profile, contactInfo: { ...profile.contactInfo, [key]: value } });
    } else if (type === 'checkbox') {
      setProfile({ ...profile, [name]: checked });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleArrayChange = (idx, value) => {
    const arr = [...profile.areasOfExpertise];
    arr[idx] = value;
    setProfile({ ...profile, areasOfExpertise: arr });
  };

  const addExpertise = () => setProfile({ ...profile, areasOfExpertise: [...profile.areasOfExpertise, ''] });
  const removeExpertise = (idx) => setProfile({ ...profile, areasOfExpertise: profile.areasOfExpertise.filter((_, i) => i !== idx) });

  const handleClassChange = (idx, field, value) => {
    const arr = [...profile.classesHandled];
    arr[idx][field] = value;
    setProfile({ ...profile, classesHandled: arr });
  };
  const addClass = () => setProfile({ ...profile, classesHandled: [...profile.classesHandled, { subject: '', semester: '', section: '', year: '' }] });
  const removeClass = (idx) => setProfile({ ...profile, classesHandled: profile.classesHandled.filter((_, i) => i !== idx) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post('/api/faculty/update-profile', profile);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center mt-12">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block font-medium">Faculty ID</label><input name="facultyId" value={profile.facultyId} onChange={handleChange} className="input" required /></div>
        <div><label className="block font-medium">Employee ID</label><input name="employeeId" value={profile.employeeId} onChange={handleChange} className="input" /></div>
        <div><label className="block font-medium">Name</label><input name="name" value={profile.name} onChange={handleChange} className="input" required /></div>
        <div><label className="block font-medium">Email</label><input name="email" value={profile.email} onChange={handleChange} className="input" required /></div>
        <div><label className="block font-medium">Course(s)</label><input name="course" value={profile.course} onChange={handleChange} className="input" /></div>
        <div><label className="block font-medium">Course Code</label><input name="courseCode" value={profile.courseCode} onChange={handleChange} className="input" /></div>
        <div><label className="block font-medium">Position</label><input name="position" value={profile.position} onChange={handleChange} className="input" /></div>
        <div><label className="block font-medium">Contact Email</label><input name="contactInfo.email" value={profile.contactInfo.email} onChange={handleChange} className="input" /></div>
        <div><label className="block font-medium">Contact Phone</label><input name="contactInfo.phone" value={profile.contactInfo.phone} onChange={handleChange} className="input" /></div>
        <div>
          <label className="block font-medium">Areas of Expertise</label>
          {profile.areasOfExpertise.map((exp, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <input value={exp} onChange={e => handleArrayChange(idx, e.target.value)} className="input flex-1" />
              <button type="button" onClick={() => removeExpertise(idx)} className="ml-2 text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addExpertise} className="text-blue-600 mt-1">Add Expertise</button>
        </div>
        <div>
          <label className="block font-medium">Classes Handled</label>
          {profile.classesHandled.map((cls, idx) => (
            <div key={idx} className="flex flex-wrap gap-2 mb-2">
              <input placeholder="Subject" value={cls.subject} onChange={e => handleClassChange(idx, 'subject', e.target.value)} className="input w-24" />
              <input placeholder="Semester" value={cls.semester} onChange={e => handleClassChange(idx, 'semester', e.target.value)} className="input w-24" />
              <input placeholder="Section" value={cls.section} onChange={e => handleClassChange(idx, 'section', e.target.value)} className="input w-24" />
              <input placeholder="Year" value={cls.year} onChange={e => handleClassChange(idx, 'year', e.target.value)} className="input w-24" />
              <button type="button" onClick={() => removeClass(idx)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addClass} className="text-blue-600 mt-1">Add Class</button>
        </div>
        <div><label className="block font-medium">Date of Birth</label><input name="dob" type="date" value={profile.dob ? profile.dob.substring(0, 10) : ''} onChange={handleChange} className="input" /></div>
        <div><label className="block font-medium">Date of Joining</label><input name="dateOfJoining" type="date" value={profile.dateOfJoining ? profile.dateOfJoining.substring(0, 10) : ''} onChange={handleChange} className="input" /></div>
        <div><label className="block font-medium">Department</label><input name="department" value={profile.department} onChange={handleChange} className="input" /></div>
        <div><label className="block font-medium">Gender</label>
          <select name="gender" value={profile.gender} onChange={handleChange} className="input">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div><label className="block font-medium">Profile Pic URL</label><input name="profilePicUrl" value={profile.profilePicUrl} onChange={handleChange} className="input" /></div>
        <div><label className="block font-medium">Is Active</label><input name="isActive" type="checkbox" checked={profile.isActive} onChange={handleChange} /></div>
        <div><label className="block font-medium">Scale of Pay</label><input name="scaleOfPay" value={profile.scaleOfPay} onChange={handleChange} className="input" /></div>
        <div><label className="block font-medium">Present Pay</label><input name="presentPay" type="number" value={profile.presentPay} onChange={handleChange} className="input" /></div>
        <div><label className="block font-medium">Nature of Appointment</label><input name="natureOfAppointment" value={profile.natureOfAppointment} onChange={handleChange} className="input" /></div>
        {error && <div className="text-red-500 font-medium">{error}</div>}
        {success && <div className="text-green-600 font-medium">{success}</div>}
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile; 