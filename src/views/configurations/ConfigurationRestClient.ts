// A RestClient to interact with Configuration API resources
import axios from "axios";
import config from "../../config";
import IConfiguration from "./Configuration.interface";

export default abstract class ConfigurationRestClient {
  // Get all configurations
  public static async getConfigurations(): Promise<IConfiguration[]> {
    return [
      {
        configurationId: 10,
        repoName: "Bot-Playground",
        repoOwner: "MarvinWyrich",
        repoApiLink: "https://api.github.com/repos/MarvinWyrich/Bot-Playground",
        repoGitLink: "https://github.com/MarvinWyrich/Bot-Playground.git",
        repoService: "github",
        repoFolder: "C:\\BotForks\\10",
        srcFolder: "C:\\BotForks\\10\\src",
        gitUserId: 42,
        forkApiLink: "https://api.github.com/repos/Samantha-Bo/Bot-Playground",
        forkGitLink: "https://github.com/Samantha-Bo/Bot-Playground.git",
        analysisService: "sonarqube",
        analysisServiceProjectKey: "Bot-Playground:Bot-Playground",
        maxAmountRequests: 5
      }
    ];
    // return (await axios.get(`${this.api}/configurations`)).data;
  }

  // Get configuration by ID
  public static async getConfigurationById(
    id: string
  ): Promise<IConfiguration> {
    return {
      configurationId: 10,
      repoName: "Bot-Playground",
      repoOwner: "MarvinWyrich",
      repoApiLink: "https://api.github.com/repos/MarvinWyrich/Bot-Playground",
      repoGitLink: "https://github.com/MarvinWyrich/Bot-Playground.git",
      repoService: "github",
      repoFolder: "C:\\BotForks\\10",
      srcFolder: "C:\\BotForks\\10\\src",
      gitUserId: 42,
      forkApiLink: "https://api.github.com/repos/Samantha-Bo/Bot-Playground",
      forkGitLink: "https://github.com/Samantha-Bo/Bot-Playground.git",
      analysisService: "sonarqube",
      analysisServiceProjectKey: "Bot-Playground:Bot-Playground",
      maxAmountRequests: 5
    };
    // return (await axios.get(`${this.api}/configurations/${id}`)).data;
  }

  // Create new configuration
  public static async createConfiguration(
    configuration: IConfiguration
  ): Promise<any> {
    return (await axios.post(`${this.api}/configurations`, configuration)).data;
  }

  // Update existing configuration
  public static async updateConfiguration(
    configuration: IConfiguration
  ): Promise<any> {
    return (await axios.put(
      `${this.api}/configurations/${configuration.configurationId}`,
      configuration
    )).data;
  }

  // Delete existing configuration
  public static async deleteConfiguration(id: number): Promise<any> {
    return (await axios.delete(`${this.api}/configurations/${id}`)).data;
  }

  private static api = config.apiEndpoint;
}
