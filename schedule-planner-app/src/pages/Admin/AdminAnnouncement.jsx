import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import NavbarAdmin from '../../components/NavbarAdmin';

const AdminAnnouncement = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/announcements');
      setAnnouncements(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:4000/api/announcements/${editId}`, { title, content, expiresAt });
        alert('Announcement updated successfully!');
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:4000/api/announcements/create', { title, content, expiresAt });
        alert('Announcement created successfully!');
      }
      setTitle('');
      setContent('');
      setExpiresAt('');
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      alert('Failed to create/update announcement.');
    }
  };

  const handleEdit = (announcement) => {
    setTitle(announcement.title);
    setContent(announcement.content);
    setExpiresAt(new Date(announcement.expiresAt).toISOString().split('T')[0]); // Format date to yyyy-MM-dd
    setIsEditing(true);
    setEditId(announcement._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/announcements/${id}`);
      alert('Announcement deleted successfully!');
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      alert('Failed to delete announcement.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <NavbarAdmin />
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Update Announcement' : 'Create Announcement'}</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiresAt">
                Expires At
              </label>
              <input
                type="date"
                id="expiresAt"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {isEditing ? 'Update Announcement' : 'Create Announcement'}
            </button>
          </form>
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Announcements</h2>
            {announcements.map((announcement) => (
              <div key={announcement._id} className="bg-white p-4 mb-4 border rounded-lg shadow-md">
                <h3 className="text-xl font-bold">{announcement.title}</h3>
                <p className="mb-2">{announcement.content}</p>
                <p className="text-sm text-gray-500 mb-2">Expires at: {new Date(announcement.expiresAt).toLocaleDateString()}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncement;