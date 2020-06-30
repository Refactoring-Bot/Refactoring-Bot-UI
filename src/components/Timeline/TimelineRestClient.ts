// A RestClient to interact with GitHub Event API resources
import axios from "axios";
import config from "../../config";

export default abstract class TimelineRestClient {
    // Get events by GitUserID
    public static async getUserEvents(
        gitUserId: bigint
    ): Promise<any> {
        return (await axios.get(`${this.api}/git-users/${gitUserId}/events`)).data;
    }

    // Get events by configID
    public static async getConfigEvents(
        configId: bigint
    ): Promise<any> {
        return (await axios.get(`${this.api}/configurations/${configId}/events`)).data;
    }

    private static api = config.apiEndpoint;
}
