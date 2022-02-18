# react-icalendar-link

> Ability to create link for downloading ics file

[![NPM](https://img.shields.io/npm/v/react-icalendar-link.svg)](https://www.npmjs.com/package/react-icalendar-link) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-icalendar-link
```

## Usage

```jsx
import React from "react";
import ICalendarLink from "react-icalendar-link";

class App extends React.Component {
  render() {
    const event = {
      title: "My Title",
      description: "My Description",
      startTime: "2018-10-07T10:30:00+10:00",
      endTime: "2018-10-07T12:00:00+10:00",
      location: "10 Carlotta St, Artarmon NSW 2064, Australia",
      attendees: [
        "Hello World <hello@world.com>",
        "Hey <hey@test.com>",
      ]
    }
    return (
      <ICalendarLink event={event}>
        Add to Calendar
      </ICalendarLink>
    );
  }
}
```

### Using a Different File Name

By default, the file name that a user downloads is `download.ics`. You can specify a different file name using the `filename` prop.

```jsx
<ICalLink filename="blahblah.ics" {...{ event }} />
```

### Using Raw Content

Currently it provides very few fields. You can provide the raw content for the extra fields instead.

```jsx
import React from "react";
import ICalendarLink from "react-icalendar-link";

class App extends React.Component {
  render() {
    const event = {
      title: "My Title",
      description: "My Description",
      startTime: "2018-10-07T10:30:00+10:00",
      location: "10 Carlotta St, Artarmon NSW 2064, Australia",
    }
    const rawContent = `ATTENDEE;CN="Cyrus Daboo";CUTYPE=INDIVIDUAL;PARTSTAT=ACCEPTED:mailto:cyrus@example.com
ATTENDEE;CN="Wilfredo Sanchez Vega";CUTYPE=INDIVIDUAL;PARTSTAT=NEEDS-ACTION;ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:wilfredo@example.com
ATTENDEE;CN="Bernard Desruisseaux";CUTYPE=INDIVIDUAL;PARTSTAT=NEEDS-ACTION;ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:bernard@example.net
ATTENDEE;CN="Mike Douglass";CUTYPE=INDIVIDUAL;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:mike@example.org`;

    return (
      <ICalendarLink event={event} rawContent={rawContent}>
        Add to Calendar
      </ICalendarLink>
    );
  }
}
```

## License

MIT © [josephj](https://github.com/josephj)
