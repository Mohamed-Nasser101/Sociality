﻿import {Header} from "semantic-ui-react";
import {useStore} from "../../../stores/store";
import {observer} from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import {Fragment} from "react";

const ActivityList = () => {
  const {groupedActivities} = useStore().activityStore;
  return (
    <>
      {groupedActivities.map(([date, activities]) => (
        <Fragment key={date}>
          <Header sub color='teal'>
            {date}
          </Header>
          {activities.map(activity =>
            <ActivityListItem key={activity.id} activity={activity}/>
          )}
        </Fragment>
      ))}
    </>
  );
}

export default observer(ActivityList);