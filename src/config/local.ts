interface AppConfig {
  get_entries_url : string ;
  add_entry :  string;
}
export const urlConfig: AppConfig = {
  get_entries_url: "http://localhost:3300/user/allentries",
  add_entry: "http://localhost:3300/user/entry"
}