// A RestClient to interact with GitUser API resources
import axios from "axios";
import { config } from "../../config";

export default abstract class GitUserRestClient {
  // Get all configurations
  public static async getGitUsers(): Promise<any[]> {
    return (await axios.get(`${this.api}/git-users`)).data;
  }

  private static api = config.apiEndpoint;
}
