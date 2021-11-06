/**
 * @class ICalLink
 */

import * as React from "react";
import {
  ICalEvent,
  buildUrl,
  downloadBlob,
  isIOSSafari,
  isIOSChrome
} from "./utils";

interface Props {
  className: string;
  href: string;
  event: ICalEvent;
  filename: string;
  rawContent: string;
  isCrappyIE: boolean;
  isSupported: () => boolean;
}

export default class ICalLink extends React.Component<Props> {
  isCrappyIE: boolean;
  // FIXME - iOS Chrome doesn't support adding to iCal at the moment.
  // https://bugs.chromium.org/p/chromium/issues/detail?id=666211
  public static isSupported = () => !isIOSChrome();
  public static defaultProps: Partial<Props> = {
    filename: "download.ics",
    href: "#add-to-calendar",
    rawContent: ""
  };
  constructor(props: any) {
    super(props);

    this.isCrappyIE = !!(
      typeof window !== "undefined" &&
      window.navigator.msSaveOrOpenBlob &&
      window.Blob
    );
  }
  handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    const { event, filename, rawContent } = this.props;
    const url: string = buildUrl(event, isIOSSafari(), rawContent);
    const blob: Blob = new Blob([url], {
      type: "text/calendar;charset=utf-8"
    });

    // IE
    if (this.isCrappyIE) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
      return;
    }

    // Safari
    if (isIOSSafari()) {
      window.open(url, "_blank");
      return;
    }

    // Desktop
    downloadBlob(blob, filename);
  };
  render() {
    const { children, href, className } = this.props;

    return (
      <a onClick={this.handleClick} {...{ href, className }}>
        {children}
      </a>
    );
  }
}
