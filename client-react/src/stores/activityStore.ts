import {makeAutoObservable, runInAction} from "mobx";
import {Activity, ActivityFormValues} from "../models/Activity";
import agent from "../app/api/agent";
import {format} from 'date-fns';
import {store} from "./store";
import {Profile} from "../models/Profile";

export default class ActivityStore {
  activities = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  submitting = false;
  initialLoading = false;

  constructor() {
    makeAutoObservable(this)
  }

  get activitiesByDate() {
    return Array.from(this.activities.values())
      .sort((a, b) => a.date!.getTime() - b.date!.getTime());
  }

  get groupedActivities() {
    return Object.entries(this.activitiesByDate.reduce((acc, next) => {
      const date = format(next.date!, 'dd MMM yyyy');
      acc[date] = acc[date] ? [...acc[date], next] : [next];
      return acc;
    }, {} as { [key: string]: Activity[] }));
  }

  loadActivities = async () => {
    this.setLoading(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach(activity => this.setActivity(activity));
      this.setLoading(false);
    } catch (error) {
      console.log(error)
      this.setLoading(false);
    }
  }

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (!activity) {
      this.setLoading(true);
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        this.setLoading(false);
      } catch (error) {
        console.log(error)
        this.setLoading(false);
      }
    }
    this.selectActivity(id);
    return activity;
  }


  deleteActivity = (id: string) => {
    this.activities.delete(id);
  }

  setLoading = (state: boolean) => {
    this.initialLoading = state;
  }

  selectActivity = (id?: string) => {
    this.selectedActivity = id ? this.activities.get(id) : undefined;
  }

  setSubmitting = (state: boolean) => {
    this.submitting = state;
  }

  createActivity = (activity: ActivityFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    this.setSubmitting(true);
    return agent.Activities.create(activity).then(_ => {
      const newActivity = new Activity(activity);
      newActivity.hostUsername = user!.username;
      newActivity.attendees = [attendee];
      this.setActivity(newActivity);
      this.selectActivity(activity.id);
      this.setSubmitting(false);
    })
  }

  updateActivity = (activity: ActivityFormValues) => {
    this.setSubmitting(true);
    return agent.Activities.edit(activity).then(_ => {
      runInAction(() => {
        if (activity.id) {
          const updatedActivity = {...this.getActivity(activity.id), ...activity}
          this.activities.set(activity.id, updatedActivity as Activity)
          this.selectActivity(activity.id);
        }
        this.setSubmitting(false);
      });
    });
  }

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.setSubmitting(true);
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(a => a.username !== user?.username);
          this.selectedActivity.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }
        this.activities.set(this.selectedActivity!.id, this.selectedActivity!);
      });
    } catch (error) {
      console.log(error)
    } finally {
      this.setSubmitting(false);
    }
  }

  toggleCancelActivity = async () => {
    this.setSubmitting(true);
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.selectedActivity!.isCancelled = !this.selectedActivity!.isCancelled;
        this.activities.set(this.selectedActivity!.id, this.selectedActivity!)
      });
    } catch (error) {
      console.log(error)
    } finally {
      this.setSubmitting(false);
    }
  }

  private setActivity = (activity: Activity) => {
    const user = store.userStore.user;
    if (user) {
      activity.isHost = activity.hostUsername === user.username;
      activity.isGoing = activity.attendees!.some(a => a.username === user.username);
    }
    this.activities.set(activity.id, {
      ...activity,
      date: new Date(activity.date!),
      host: activity.attendees?.find(a => a.username === activity.hostUsername)
    });
  }

  private getActivity = (id: string) => {
    return this.activities.get(id);
  }
}
