import React from 'react';
import 'views/EventBonus/EventBonus.scss';
import EventBonusTable from 'components/EventBonusTable';

function EventBonus() {
  return (
    <section className="event-bonus">
      <h1>Event bonus</h1>
      <EventBonusTable />
    </section>
  );
}

export default EventBonus;
