import {makeAutoObservable, runInAction} from "mobx";
import {Activity} from "../models/Activity";
import agent from "../app/api/agent";

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
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  get groupedActivities() {
    return Object.entries(this.activitiesByDate.reduce((acc, next) => {
      const date = next.date;
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

  private setActivity = (activity: Activity) => {
    this.activities.set(activity.id, {
      ...activity,
      date: activity.date.split('T')[0]
    });
  }

  private getActivity = (id: string) => {
    return this.activities.get(id);
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

  createActivity = (activity: Activity) => {
    this.setSubmitting(true);
    return agent.Activities.create(activity).then(_ => {
      runInAction(() => {
        this.activities.set(activity.id, activity)
        this.selectActivity(activity.id);
        this.setSubmitting(false);
      });
    })
  }

  updateActivity = (activity: Activity) => {
    this.setSubmitting(true);
    return agent.Activities.edit(activity).then(_ => {
      runInAction(() => {
        this.activities.set(activity.id, activity)
        this.selectActivity(activity.id);
        this.setSubmitting(false);
      });
    });
  }
}