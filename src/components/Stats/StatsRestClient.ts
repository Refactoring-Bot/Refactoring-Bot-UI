// A RestClient to interact with Configuration API resources
import axios from "axios";
import config from "../../config";

export default abstract class StatsRestClient {
    // Get amount of open Pull Requests by configuration ID
    public static async getAmountOpenPullRequest(
       configId: bigint
    ): Promise<any> {
        return (await axios.get(`${this.api}/configurations/${configId}/openPullRequests`)).data;
    }

    private static api = config.apiEndpoint;
}
