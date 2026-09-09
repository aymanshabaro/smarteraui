import type { FC } from "react";
import * as Demos from "./date-pickers.demo";

export default {
    title: "Application components/Date pickers",
    decorators: [
        (Story: FC) => (
            <div className="bg-tertiary flex min-h-screen items-start justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const DatePickerExample = () => <Demos.DatePickerExample />;
DatePickerExample.storyName = "Date picker example";

export const DatePicker = () => <Demos.DatePicker />;
DatePicker.storyName = "Date picker";

export const DateTimePicker = () => <Demos.DateTimePicker />;
DateTimePicker.storyName = "Date time picker";

export const DateRangePickerWithPresets = () => <Demos.DateRangePickerWithPresets />;
DateRangePickerWithPresets.storyName = "Date range picker with presets";

export const Calendar = () => <Demos.Calendar />;
Calendar.storyName = "Calendar";

export const CalendarCard = () => <Demos.CalendarCard />;
CalendarCard.storyName = "Calendar card";

export const RangeCalendar = () => <Demos.RangeCalendar />;
RangeCalendar.storyName = "Range calendar";

export const RangeCalendarCard = () => <Demos.RangeCalendarCard />;
RangeCalendarCard.storyName = "Range calendar card";
