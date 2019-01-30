// A RestClient to interact with Configuration API resources
import axios from "axios";
import { config } from "../../config";

export default abstract class ConfigurationRestClient {
  // Get all configurations
  public static async getConfigurations(): Promise<any[]> {
    return [
      {
        configurationId: 10,
        repoName: "Bot-Playground",
        repoOwner: "MarvinWyrich",
        repoApiLink: "https://api.github.com/repos/MarvinWyrich/Bot-Playground",
        repoGitLink: "https://github.com/MarvinWyrich/Bot-Playground.git",
        repoService: "github",
        repoFolder: "C:\\Users\\Marvin\\Documents\\BotForks\\10",
        srcFolder: "C:\\Users\\Marvin\\Documents\\BotForks\\10\\src",
        botName: "Samantha-Bo",
        botEmail: "johnpatrick.elishah@plutofox.com",
        botToken: "59a299108225cdd3592567799bdcd5192e1dcdad",
        forkApiLink: "https://api.github.com/repos/Samantha-Bo/Bot-Playground",
        forkGitLink: "https://github.com/Samantha-Bo/Bot-Playground.git",
        analysisService: "sonarqube",
        analysisServiceProjectKey: "Bot-Playground:Bot-Playground",
        maxAmountRequests: 5
      }
    ];
    // return (await axios.get(`${this.api}/configurations`)).data;
  }

  private static api = config.apiEndpoint;
}
