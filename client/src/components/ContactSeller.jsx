import { useState } from "react";
import axios from "axios";

const ContactSeller = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/contact/send-mail", {
        sellerEmail: "akshitgupta10032003.ak@gmail.com", // fixed recipient email
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      alert("Message sent successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="p-4 border rounded shadow w-2/4 bg-gray-50 mt-44">
      <h3 className="text-xl font-semibold mb-3">Contact Seller</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          className="p-2 border rounded"
        />
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactSeller;
