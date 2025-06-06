import React, { useState, useEffect } from "react"; // <<-- YOU MISSED useEffect here!
import { useAuth } from "../../context/AuthContext.jsx";
import CustomNavbar from "../../componenets/CustomNavbar.jsx";
import { useNavigate } from "react-router-dom";

const CreateUrl = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [userUrls, setUserUrls] = useState([]);

  const fetchUserUrls = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/urls", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch URLs");
      }

      setUserUrls(data); // Should be an array of URLs
    } catch (err) {
      console.error("Failed to fetch user URLs:", err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserUrls();
    }
  }, [user]);

  if (!user) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!longUrl) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ longUrl, customAlias }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to shorten URL");
      }

      setShortUrl(data.shortUrl);
      setLongUrl(""); // Clear input
      setCustomAlias(""); // Clear input
      await fetchUserUrls(); // Refresh list after creating new URL
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <CustomNavbar />

      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-3xl font-bold mb-4">Shorten Your URL</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow-md rounded-lg w-96"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Enter Long URL:</label>
            <input
              type="url"
              placeholder="https://example.com"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Custom Alias (Optional):
            </label>
            <input
              type="text"
              placeholder="custom-alias"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            <p>Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* ✅ Show user's URLs */}
        {userUrls.length > 0 && (
          <div className="mt-10 w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">Your URLs</h2>

            {/* Top 5 URLs */}
            <div className="space-y-2 mb-6">
              {userUrls.slice(0, 5).map((url, index) => (
                <div key={index} className="bg-white p-4 rounded shadow">
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {url.shortUrl}
                  </a>
                  <p className="text-sm text-gray-500">{url.longUrl}</p>
                </div>
              ))}
            </div>

            {/* Rest of the URLs Scrollable */}
            {userUrls.length > 5 && (
              <div className="max-h-64 overflow-y-auto space-y-2">
                {userUrls.slice(5).map((url, index) => (
                  <div key={index} className="bg-white p-4 rounded shadow">
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {url.shortUrl}
                    </a>
                    <p className="text-sm text-gray-500">{url.longUrl}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateUrl;
