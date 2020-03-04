export default interface IConfiguration {
  configurationId?: number;
  repoName: string;
  repoOwner: string;
  repoApiLink?: string;
  repoGitLink?: string;
  repoService: string;
  repoFolder?: string;
  srcFolder?: string;
  gitUserId: number;
  botName?: string;
  forkApiLink?: string;
  forkGitLink?: string;
  analysisService: string;
  analysisServiceProjectKey: string;
  maxAmountRequests: number;
}
