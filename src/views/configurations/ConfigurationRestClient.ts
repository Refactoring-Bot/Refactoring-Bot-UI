// A RestClient to interact with Scenario API resources
import axios from "axios";
import { config } from "../../config";

export abstract class ConfigurationRestClient {
  // Get all configurations
  public static async getConfigurations(): Promise<any[]> {
    return (await axios.get(`${this.api}/configurations`)).data;
  }

  private static api = config.apiEndpoint;
}
