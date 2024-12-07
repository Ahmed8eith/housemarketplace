// src/uploadFile.js
import { put } from "@vercel/blob";
import { getAuth } from "firebase/auth"; // Ensure Firebase Auth is properly initialized in your project

// Function to upload a file to Vercel Blob storage
export async function uploadFile(file) {
  // Get the authenticated user (using Firebase Auth)
  const auth = getAuth();
  const user = auth.currentUser;

  // Check if the user is authenticated
  if (!user) {
    console.error("User is not authenticated");
    alert("You must be logged in to upload files.");
    return;
  }

  // Check file size (2MB limit)
  if (file.size > 2 * 1024 * 1024) {
    console.error("File size exceeds 2MB limit");
    alert("File size must be under 2MB.");
    return;
  }

  // Check file type (only allow image files)
  if (!file.type.startsWith("image/")) {
    console.error("Invalid file type");
    alert("Only image files are allowed.");
    return;
  }

  // If all checks pass, upload the file
  try {
    const { url } = await put(`uploads/${file.name}`, file, { access: 'public' });
    console.log('File uploaded successfully:', url);
    alert('File uploaded successfully! The file URL is: ' + url);
    return url; // Return the URL if needed for further use
  } catch (error) {
    console.error('File upload failed:', error);
    alert('File upload failed. Please try again.');
    throw error; // Optionally rethrow the error if handling it elsewhere
  }
}
