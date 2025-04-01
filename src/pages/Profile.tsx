import { useUsers } from "../components/Users/hooks/use-users";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const { currentUser, users, setUsers, setCurrentUser } = useUsers();

  const [formData, setFormData] = useState({
    image: currentUser?.image || "",
    name: currentUser?.name || "",
    email: currentUser?.email || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        image: currentUser.image || "",
      });
    }
  }, [currentUser]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prevState) => ({
            ...prevState,
            image: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) return;

    try {
      const updatedUser = { ...currentUser, ...formData };

      setCurrentUser(updatedUser);
      setUsers(
        users.map((user) => (user.id === currentUser.id ? updatedUser : user))
      );

      await axios.put(
        `http://localhost:3001/users/${currentUser.id}`,
        updatedUser
      );
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mt-6">Profile</h1>
      <div className="flex justify-center items-center mt-6 flex-wrap px-6 py-12">
        <div className="mb-12 md:mb-6 md:w-[67%] lg:w-[50%]">
          <img
            src={formData.image}
            alt="image profile"
            className="w-full rounded-2xl"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-4"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-12">
          <input
            className="w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-2"
            id="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
          />

          <input
            className="w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-2"
            id="name"
            type="text"
            onChange={handleChange}
            value={formData.name}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default Profile;
