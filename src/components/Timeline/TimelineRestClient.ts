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

    private static api = config.apiEndpoint;
}
