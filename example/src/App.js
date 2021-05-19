import React, { Component } from "react";

import ICalLink from "react-icalendar-link";

export default class App extends Component {
  render () {
    const style = { fontSize: "12px", padding: "5px" };
    const event = {
      title: "--- TITLE ---",
      description:
        ">>> DESCRIPTION <<<\\n Today is a huge day. \\n Tomorrow will be a huge day too!\\n",
      startTime: "2021-05-09T10:30:00+10:00",
      endTime: "2021-05-09T12:00:00+10:00",
      location: "10 Carlotta St Artarmon NSW 2064",
      attendees: [
        "Joseph Chiang <josephj6802@gmail.com>",
        "TC Wang <tingchun0113@gmail.com>"
      ],
    };
    const rawContent = `ATTENDEE;CN="Cyrus Daboo";CUTYPE=INDIVIDUAL;PARTSTAT=ACCEPTED:mailto:cyrus@example.com
ATTENDEE;CN="Wilfredo Sanchez Vega";CUTYPE=INDIVIDUAL;PARTSTAT=NEEDS-ACTION;ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:wilfredo@example.com
ATTENDEE;CN="Bernard Desruisseaux";CUTYPE=INDIVIDUAL;PARTSTAT=NEEDS-ACTION;ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:bernard@example.net
ATTENDEE;CN="Mike Douglass";CUTYPE=INDIVIDUAL;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:mike@example.org`;

    return (
      <div>
        <div>Supported = {ICalLink.isSupported().toString()}</div>
        <ICalLink event={event} style={style} rawContent={rawContent}>
          Today is a huge day!
        </ICalLink>
      </div>
    );
  }
}
