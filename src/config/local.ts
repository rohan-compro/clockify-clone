interface AppConfig {
  getEntriesUrl : string ;
  addEntry :  string;
}
export const urlConfig: AppConfig = {
  getEntriesUrl: "http://localhost:3300/user/allentries",
  addEntry: "http://localhost:3300/user/entry"
}