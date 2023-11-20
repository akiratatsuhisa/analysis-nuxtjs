import dayjs from 'dayjs';
import _ from 'lodash';

type localesType = undefined | string | string[];

type dateTimeDataType = undefined | null | string | Date | dayjs.Dayjs;

type dateTimeStyle = undefined | 'full' | 'long' | 'medium' | 'short';

export namespace Format {
  export function dateTime(
    data: dateTimeDataType,
    options: {
      locales: localesType;
      dateStyle?: dateTimeStyle;
      timeStyle?: dateTimeStyle;
      timeZone?: string;
    } = { locales: '' },
  ): string {
    const { locales, dateStyle, timeStyle, timeZone } = options;

    if (
      _.isNil(data) ||
      (_.isString(data) && _.trim(data) === '') ||
      !dayjs(data).isValid()
    ) {
      return '';
    }

    data = dayjs(data).toDate();

    return new Intl.DateTimeFormat(locales, {
      dateStyle,
      timeStyle,
      timeZone,
    }).format(data);
  }

  export function date(
    data: dateTimeDataType,
    options: { locales: localesType; dateStyle?: dateTimeStyle } = {
      locales: '',
    },
  ): string {
    const { locales, dateStyle } = options;

    return dateTime(data, {
      locales: locales,
      dateStyle: dateStyle ?? 'long',
      timeStyle: undefined,
      timeZone: undefined,
    });
  }

  export function number(
    data: unknown,
    options: { locales?: localesType } = {},
  ): string {
    const { locales } = options;

    if (_.isNil(data) || _.trim(String(data)) === '') {
      return '';
    }

    if (_.isNaN(data)) {
      return 'N/a';
    }

    return new Intl.NumberFormat(locales).format(Number(data));
  }

  export function currency(
    data: unknown,
    options: { locales?: localesType; currency?: string } = {},
  ): string {
    const { locales, currency = 'USD' } = options;

    if (_.isNil(data) || _.trim(String(data)) === '') {
      return '';
    }

    if (_.isNaN(data)) {
      return 'N/a';
    }

    return new Intl.NumberFormat(locales, {
      style: 'currency',
      currency,
    }).format(Number(data));
  }
}
