import { Client, Account, ID } from "appwrite";
import systemVariables from "../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(systemVariables.appwrite_Endpoint)
      .setProject(systemVariables.appwrite_Project_ID);
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //some functionality goes here
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite Service Error :: login :: error", error);
    }
  }



  async getCurrentUser() {
    try {
      return await this.account.get()
      
    } catch (error) {
      console.log("Appwrite Service Error :: getCurrentUSer :: error", error)
    }

    return null
  }

  async logout() {
    try {
      await this.account.deleteSessions()
      
    } catch (error) {
      console.log("Appwrite Service Error :: logout :: error", error);
    }
  }


}

const obj_AuthService = new AuthService();

export default obj_AuthService;
