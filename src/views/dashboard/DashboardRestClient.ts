// A RestClient to interact with Refactoring-Bot API resources
import axios from "axios";
import config from "../../config";

export default abstract class DashboardRestClient {

    public static async refactorWithAnalysisService(configId: number): Promise<any> {
        return (await axios.post(`${this.api}/configurations/${configId}/refactorWithAnalysisService`)).data;
    }

    private static api = config.apiEndpoint;
}
