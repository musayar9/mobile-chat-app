import { Client, Databases } from "react-native-appwrite";

if (!process.env.EXPO_PUBLIC_APPWRITE_APP_ID || !process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID)  {
  throw new Error("EXPO_PUBLIC_APPWRITE_APP_ID is not set");
}
const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_APP_ID,
  platform: "com.sayarmusa.modernchatvideo",
  db: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  col:{
  chatrooms:process.env.EXPO_PUBLIC_APPWRITE_CHATROOMS_COLLECTION_ID,
  messages:process.env.EXPO_PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID
  }
};


const client = new Client()
    .setEndpoint(appWriteConfig.endpoint)
    .setProject(appWriteConfig.projectId)
    .setPlatform(appWriteConfig.platform);
    
    
    
    
const db = new Databases(client);

export {db, appWriteConfig, client}