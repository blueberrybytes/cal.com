import process from "node:process";

import dayjs from "@calcom/dayjs";

import { GOOGLE_HOLIDAY_CALENDARS } from "./constants";

const GOOGLE_API_KEY_PATTERN = /^AIza[0-9A-Za-z_-]{35}$/;

const resolveGoogleApiKey = (rawKey: string): string => {
  if (GOOGLE_API_KEY_PATTERN.test(rawKey)) {
    return rawKey;
  }

  try {
    const decoded = Buffer.from(rawKey.trim(), "base64")
      .toString("utf-8")
      .trim();
    if (decoded && GOOGLE_API_KEY_PATTERN.test(decoded)) {
      return decoded;
    }
  } catch (error) {
    // ignore – fallback to raw key
    console.warn("Failed to decode Google API key:", error);
  }

  return rawKey;
};

let defaultClient: GoogleCalendarClient | null = null;

export class GoogleCalendarClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    const key = apiKey || process.env.GOOGLE_CALENDAR_API_KEY;
    if (!key) {
      throw new Error(
        "GOOGLE_CALENDAR_API_KEY environment variable is not set"
      );
    }
    this.apiKey = resolveGoogleApiKey(key);
  }

  async fetchHolidays(
    countryCode: string,
    year: number
  ): Promise<GoogleCalendarHoliday[]> {
    const calendarConfig = GOOGLE_HOLIDAY_CALENDARS[countryCode];
    if (!calendarConfig) {
      return [];
    }

    const calendarId = encodeURIComponent(calendarConfig.calendarId);

    const timeMin = dayjs(`${year}-01-01`).startOf("day").toISOString();
    const timeMax = dayjs(`${year}-12-31`).endOf("day").toISOString();

    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${this.apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

    const response = await fetch(url);
    const data: GoogleCalendarEventsResponse = await response.json();

    if (data.error) {
      console.error(
        `Google Calendar API error for ${countryCode}:`,
        data.error
      );
      throw new Error(`Google Calendar API error: ${data.error.message}`);
    }

    if (!data.items) {
      return [];
    }

    return data.items.map((event) => {
      const dateStr = event.start.date || event.start.dateTime?.split("T")[0];
      let date = new Date();
      if (dateStr) {
        date = dayjs(dateStr).toDate();
      }

      return {
        id: `${countryCode}_${event.id}`,
        countryCode,
        eventId: event.id,
        name: event.summary,
        date,
        year,
      };
    });
  }
}

export function getGoogleCalendarClient(): GoogleCalendarClient {
  if (!defaultClient) {
    defaultClient = new GoogleCalendarClient();
  }
  return defaultClient;
}

interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    date?: string;
    dateTime?: string;
  };
  end: {
    date?: string;
    dateTime?: string;
  };
}

interface GoogleCalendarEventsResponse {
  items?: GoogleCalendarEvent[];
  error?: {
    code: number;
    message: string;
  };
}

export interface GoogleCalendarHoliday {
  id: string;
  countryCode: string;
  eventId: string;
  name: string;
  date: Date;
  year: number;
}
