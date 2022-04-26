import {Photo, Profile, ProfileValue} from "../models/Profile";
import {makeAutoObservable, reaction , runInAction} from "mobx";
import agent from "../app/api/agent";
import {store} from "./store";

export class ProfileStore {
  profile: Profile | null = null;
  followings: Profile[] = [];
  isLoading = false;
  upLoading = false;
  loading = false;
  loadingFollowing = false;
  activeTab = 0;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.activeTab,
      activeTab => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? 'followers' : 'followings';
          this.getFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    )
  }

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }
    return false;
  }

  loadProfile = async (username: string) => {
    this.isLoading = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => this.profile = profile);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.isLoading = false);
    }
  }

  uploadPhoto = async (file: Blob) => {
    this.upLoading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.upLoading = false);
    }
  }

  setMainPhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id)
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find(x => x.isMain)!.isMain = false;
          this.profile.photos.find(x => x.id == photo.id)!.isMain = true;
          this.profile.image = photo.url;
        }
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.loading = false);
    }
  }
  deletePhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id)
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos = this.profile.photos.filter(x => x.id !== photo.id);
        }
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.loading = false);
    }
  }

  editProfile = async (profile: ProfileValue) => {
    this.loading = true;
    try {
      await agent.Profiles.editProfile(profile)
      store.userStore.setDisplayName(profile.displayName);
      runInAction(() => {
        if (this.profile) {
          this.profile.displayName = profile.displayName;
          this.profile.bio = profile.bio;
        }
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.loading = false);
    }
  }

  updateFollowing = async (username: string, following: boolean) => {
    this.loading = true;
    try {
      await agent.Profiles.updateFollowing(username);
      store.activityStore.updateAttendeeFollowing(username);
      runInAction(() => {
        if (this.profile && this.profile.username !== store.userStore.user?.username && this.profile.username === username) {
          following ? this.profile.followersCount++ : this.profile.followersCount--;
          this.profile.following = !this.profile.following;
        }
        if (this.profile && this.profile.username === store.userStore.user?.username) {
          following ? this.profile.followersCount++ : this.profile.followersCount--;
        }
        this.followings.forEach(profile => {
          if (profile.username === username) {
            profile.following ? profile.followersCount-- : profile.followersCount++;
            profile.following = !profile.following;
          }
        });
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => this.loading = false);
    }
  }

  getFollowings = async (predicate: string) => {
    this.loadingFollowing = true;
    try {
      const followings = await agent.Profiles.getFollowers(this.profile!.username, predicate);
      runInAction(() => {
        this.followings = followings
        this.loadingFollowing = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => this.loadingFollowing = false);
    }
  }

  setActiveTab = (activeTab: number) => this.activeTab = activeTab;
}