import { observer } from 'mobx-react-lite';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
const ActivityFilters = () => {
  const { activityStore: { predicate, setPredicate, predicateCondition } } = useStore();
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item onClick={() => setPredicate('condition', 'all')} active={predicateCondition === 'all'} content='All Activities' />
        <Menu.Item onClick={() => setPredicate('condition', 'going')} active={predicateCondition === 'going'} content="I'm going" />
        <Menu.Item onClick={() => setPredicate('condition', 'host')} active={predicateCondition === 'host'} content="I'm hosting" />
      </Menu>
      <Header />
      <Calendar
        onChange={(date: Date) => setPredicate('startDate', date)}
        value={predicate.get('startDate') || new Date()}
      />
    </>
  )
}

export default observer(ActivityFilters);