import systemVariables from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class DB_Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(systemVariables.appwrite_Endpoint)
      .setProject(systemVariables.appwrite_Project_ID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId, author }) {
    try {
      return await this.databases.createDocument(
        systemVariables.appwrite_DATABASE_ID,
        systemVariables.appwrite_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          author
        }
      );
    } catch (error) {
      console.log("Appwrite Service Error :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        systemVariables.appwrite_DATABASE_ID,
        systemVariables.appwrite_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service Error :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        systemVariables.appwrite_DATABASE_ID,
        systemVariables.appwrite_COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service Error :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        systemVariables.appwrite_DATABASE_ID,
        systemVariables.appwrite_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service Error :: getPost :: error", error);
      return false;
    }
  }

  async getAllActivePosts(userId) {
    try {
      return await this.databases.listDocuments(
        systemVariables.appwrite_DATABASE_ID,
        systemVariables.appwrite_COLLECTION_ID,
        [Query.equal("status", "active"), Query.notEqual("userId", userId)]
      );
    } catch (error) {
      console.log(
        "Appwrite Service Error :: getAllActivePosts :: error",
        error
      );
      return false;
    }
  }

  async getUserPosts(userId) {
    try {
      return await this.databases.listDocuments(
        systemVariables.appwrite_DATABASE_ID,
        systemVariables.appwrite_COLLECTION_ID,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log("Appwrite Service Error :: getUserPosts :: error", error);
      return false;
    }
  }

  //File Services

  async createFile(file) {
    try {
      return await this.storage.createFile(
        systemVariables.appwrite_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service Error :: createFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(systemVariables.appwrite_BUCKET_ID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Service Error :: deleteFile :: error", error);
      return false;
    }
  }

  getFileView(fileId) {
    return this.storage.getFileView(systemVariables.appwrite_BUCKET_ID, fileId);
  }
}

const obj_DB_Service = new DB_Service();
export default obj_DB_Service;
