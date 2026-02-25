import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MultilingualContent {
    hindi: string;
    gujarati: string;
    english: string;
}
export interface UserProfile {
    preferredLanguage: string;
    isPremium: boolean;
}
export interface Story {
    title: MultilingualContent;
    content: MultilingualContent;
    summary: MultilingualContent;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addStory(story: Story): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getStories(): Promise<Array<Story>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateUserProfile(preferredLanguage: string, isPremium: boolean): Promise<void>;
}
