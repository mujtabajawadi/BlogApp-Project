const systemVariables = {
  appwrite_BUCKET_ID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwrite_Endpoint: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
  appwrite_Project_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwrite_DATABASE_ID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwrite_COLLECTION_ID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
};


export default systemVariables;
