import { Grid, List, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Loading from "../../../app/layout/Loading";
import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import IF from "../../../app/common/IF";
import ActivityItemPlaceholder from "./ActivityItemPlaceholder";


const ActivityDashboard = () => {
  const { activityStore: { initialLoading, loadActivities, pagination, setPagingParams } } = useStore();
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false))
  }

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return (
    <Grid>
      <Grid.Column width='10'>
        <IF when={initialLoading && !loadingNext}>
          <ActivityItemPlaceholder />
          <ActivityItemPlaceholder />
        </IF>
        <IF when={!initialLoading || loadingNext}>
          <InfiniteScroll
            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
            pageStart={0} initialLoad={false} loadMore={handleGetNext}>
            <ActivityList />
          </InfiniteScroll>
        </IF>
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );

}

export default observer(ActivityDashboard);