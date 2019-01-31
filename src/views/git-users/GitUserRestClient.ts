// A RestClient to interact with GitUser API resources
import axios from "axios";
import config from "../../config";
import IGitUser from "./GitUser.interface";

export default abstract class GitUserRestClient {
  // Get all configurations
  public static async getGitUsers(): Promise<IGitUser[]> {
    return [
      {
        id: 42,
        name: "MarvinTheDepressedRobot",
        email: "douglas@adams.com",
        token: "hhgttg1979"
      }
    ];
    // return (await axios.get(`${this.api}/git-users`)).data;
  }

  private static api = config.apiEndpoint;
}
