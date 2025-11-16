export async function handleUpload(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
    body: formData,
    method: "POST",
    signal: AbortSignal.timeout(30000),
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Upload failed");
  }
  const url = data.secure_url;
  return url;
}

export const uploadWithRetry = async (file: File) => {
  for (let i = 0; i < 3; i++) {
    try {
      const result = await handleUpload(file); // your function

      return result;
    } catch (err) {
      if (i === 2) {
        alert("Upload failed after 3 tries");
      } else {
        await new Promise((r) => setTimeout(r, 2000)); // wait 2s
      }
    }
  }
};
