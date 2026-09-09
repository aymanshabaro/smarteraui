import type { FC } from "react";
import * as CalendarDemos from "./calendar.demo";

export default {
    title: "Application components/Calendars",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex h-screen w-full p-4">
                <Story />
            </div>
        ),
    ],
};

export const CalendarExample = () => <CalendarDemos.CalendarExample />;
CalendarExample.storyName = "Calendar example";

export const CalendarMonthView = () => <CalendarDemos.CalendarMonthView />;
CalendarMonthView.storyName = "Calendar month view";

export const CalendarWeekView = () => <CalendarDemos.CalendarWeekView />;
CalendarWeekView.storyName = "Calendar week view";

export const CalendarDayView = () => <CalendarDemos.CalendarDayView />;
CalendarDayView.storyName = "Calendar day view";
