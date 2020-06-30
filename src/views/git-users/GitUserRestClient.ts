// A RestClient to interact with GitUser API resources
import axios from "axios";
import config from "../../config";
import IGitUser from "./GitUser.interface";

export default abstract class GitUserRestClient {
  // Get all git users
  public static async getGitUsers(): Promise<IGitUser[]> {
    return (await axios.get(`${this.api}/git-users`)).data;
  }

  // Get git user by ID
  public static async getGitUserById(id: string): Promise<IGitUser> {
    return (await axios.get(`${this.api}/git-users/${id}`)).data;
  }

  // Create new git user
  public static async createGitUser(gitUser: IGitUser): Promise<any> {
    return (await axios.post(`${this.api}/git-users`, gitUser)).data;
  }

  // Update existing git user
  public static async updateGitUser(gitUser: IGitUser): Promise<any> {
    return (await axios.put(
      `${this.api}/git-users/${gitUser.gitUserId}`,
      gitUser
    )).data;
  }

  // Delete existing git user
  public static async deleteGitUser(id: number): Promise<any> {
    return (await axios.delete(`${this.api}/git-users/${id}`)).data;
  }

  private static api = config.apiEndpoint;
}
