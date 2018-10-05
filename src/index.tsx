/**
 * @class ICalLink
 * https://bugs.chromium.org/p/chromium/issues/detail?id=666211
 */

import * as React from "react";
import { ICalEvent, buildUrl, downloadBlob } from "./utils";

interface Props {
  href: string;
  event: ICalEvent;
  filename: string;
  isCrappyIE: boolean;
}

export default class ICalLink extends React.Component<Props> {
  isCrappyIE: boolean;
  public static defaultProps: Partial<Props> = {
    filename: "download.ics",
    href: "#add-to-calendar"
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

    const { event, filename } = this.props;
    const url: string = buildUrl(event);
    const blob: object = new Blob([url], {
      type: "text/calendar;charset=utf-8"
    });

    if (this.isCrappyIE) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
      return;
    }

    downloadBlob(blob, filename);
  };
  render() {
    const { children, ...otherProps } = this.props;

    return (
      <a onClick={this.handleClick} {...otherProps}>
        {children}
      </a>
    );
  }
}
