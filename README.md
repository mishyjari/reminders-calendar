# Reminder Calendar

A simple calendar view for managing reminders

### Usage

- The calendar will load to the current month. Months can be toggled using the arrows next to the month name
- Clicking the '+' in a day container will open a form for creating a new reminder. This form can be escaped one of four ways: (a) clicking the same button the form was opened with, (b) using the red 'x' in the top left of the form, (c) pressing the 'escape' key, or (d) using the submit/save/delete button.
- Reminder text is required and maxed at 30 characters
- The color selector will choose the color the reminder will be rendered in
- User can choose the time to display and the date the reminder will appear in (default is current time on the date that was clicked)
- Once a reminder is rendered, clicking it will open up the form to edit or delete the reminder. It can also be re-assigned to a different date here.
- Reminder overflow is accessed by scrolling within the day container

### Architecture and Features
#### React application with Redux state management
- Calendar component renders Title and month toggle buttons
##### Calendar
- Selected month held in store defaults to current month. Calendar component accesses the selected month from state and creates an array of Moment objects for each day within that month. It then prepends and appends that array so that the month is squared off (Sunday-Saturday)
- Renders a Day component for each element within that array of days
##### Day
- Day component sets className based on whether the day is within the current month and if it is the current day, to allow for easy styling
- Heading renders the date number and the 'new reminder' button.
- Makes use of a custom hook to toggle the New Reminder form
- Creates a UL element for displaying reminders. Will access all reminders in store and render a ReminderPreview component for any mathing the selected date. Sorted by date using JS' sort method
- Overflow will result in scrolling withing the Day component (todo: ability to expand Day component or have a 'show all' component of sorts)
##### ReminderPreview
- Each is an LI element for a reminder
- Narrow windows (e.g., mobile) will render only the time, details can be viewed by opening the edit form (todo: make a view reminder element)
- Clicking on the preview will allow for editting or deleting. Clicking will store 'selected reminder' in Redux store and render the form with its data.
##### ReminderForm
- Form is controlled using local state in a class component
- If a reminder id was passed in, it will render as as an edit form, else will render as a new reminder form
- Reminder text input is required and limited to 30 characters
- Remaining characted count updates on change and turns red when maxed
- Time defaults to current time, date to the date from the Day component clicked reminder can be (re)assigned to any date with this input
- Color uses the browser's color picker, which stores the color in local state as a hex string
- If form is an edit form, delete button will render (todo: confirmation dialogue for delete)
- Form can be exited using the close button in the form, the new reminder button in the Day component or by pressing the escape key

### Redux actions/reducers
- Prev/Next Month - toggles the month selected in store (called 'calendar'). Actually just a date object, but sufficient using moment's query methods
- Create reminder - Appends a new reminder to the array of reminders in store
- Delete reminder - Splices the remider (by id) out of reminders array in store
- Select reminder - Reminder object used to render edit form with correct data
- Unselect reminder - Used to clear selected reminder from store after update or form exit
- Update reminder - Splices out reminder to be updated and replaces it with new instance
