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
      location: "10 Carlotta St, Artarmon NSW 2064, Australia";
    }
    return (
      <ICalendarLink event={event}>
        Add to Calendar
      </ICalendarLink>;
    );
  }
}
```

## License

MIT © [josephj](https://github.com/josephj)
