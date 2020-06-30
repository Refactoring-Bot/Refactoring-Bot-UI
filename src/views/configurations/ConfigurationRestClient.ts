// A RestClient to interact with Configuration API resources
import axios from "axios";
import config from "../../config";
import IConfiguration from "./Configuration.interface";

export default abstract class ConfigurationRestClient {
  // Get all configurations
  public static async getConfigurations(): Promise<IConfiguration[]> {
      return (await axios.get(`${this.api}/configurations`)).data;
  }

  // Get configuration by ID
  public static async getConfigurationById(
    id: string
  ): Promise<IConfiguration> {
    return (await axios.get(`${this.api}/configurations/${id}`)).data;
  }

  // Create new configuration
  public static async createConfiguration(
    configuration: IConfiguration
  ): Promise<any> {
      return (await axios.post(`${this.api}/configurations`, configuration
      )).data;
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
