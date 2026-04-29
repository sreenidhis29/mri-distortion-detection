export default function UploadBox({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);   // 🔥 MUST PASS FILE
  };

  return (
    <input type="file" onChange={handleChange} />
  );
}