import React, { Component } from "react";

import ICalLink from "react-icalendar-link";

export default class App extends Component {
  render() {
    const style = { fontSize: "12px", padding: "5px" };
    const event = {
      title: "--- TITLE ---",
      description:
        ">>> DESCRIPTION <<<\\n Today is a huge day. \\n Tomorrow will be a huge day too!\\n",
      startTime: "2018-10-07T10:30:00+10:00",
      endTime: "2018-10-07T12:00:00+10:00",
      location: "4/7 Herbert St, St Leonards, NSW 2065"
    };

    return (
      <div>
        <ICalLink event={event} style={style}>
          Today is a huge day!
        </ICalLink>
      </div>
    );
  }
}
