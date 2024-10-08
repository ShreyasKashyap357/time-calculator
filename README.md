# Time Calculator


## Overview

Time Calculator is a powerful and user-friendly web application built with Next.js that provides various time-related calculations and manipulations. Whether you need to add or subtract time, calculate time differences, or generate recurring events, Time Calculator has got you covered.

![Time Calculator Screenshot](https://placeholder.com/path-to-your-screenshot.png)


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Statistics](#statistics)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Performance](#performance)
- [Known Issues or Limitations](#known-issues-or-limitations)
- [Future Improvements / Roadmap](#future-improvements--roadmap)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)
- [Support](#support)
- [Security](#security)


## Features

- **Time Calculation**: Add or subtract time units (days, weeks, months, hours, minutes, seconds) from the current time.
- **Time Difference**: Calculate the exact difference between two dates and times.
- **Recurring Events**: Generate a series of recurring events based on a start date, frequency, and number of occurrences.
- **Timezone Support**: Perform calculations in any timezone.
- **Custom Date Formats**: Choose from various date formats for input and output.
- **Calculation History**: Keep track of your recent calculations with an exportable history feature.
- **Keyboard Shortcuts**: Quickly perform calculations using keyboard shortcuts.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.


## Demo

Check out the live demo [here](https://your-live-demo-link.com).

![Time Calculator Demo](https://placeholder.com/path-to-your-demo-gif.gif)


## Screenshots

### Time Calculation
![Time Calculation Screenshot](https://placeholder.com/time-calculation.png)

### Time Difference
![Time Difference Screenshot](https://placeholder.com/time-difference.png)

### Recurring Events
![Recurring Events Screenshot](https://placeholder.com/recurring-events.png)


## Statistics
- **Supported Timezones**: 300+ timezones available for selection
- **Date Format Options**: 5 different date formats to choose from
- **Calculation Speed**: Performs most calculations in under 50ms
- **History Capacity**: Stores up to 20 recent calculations
- **Recurring Event Limit**: Generate up to 100 recurring events in a single operation
- **Time Unit Range**: Supports calculations with time units from seconds to years
- **Keyboard Shortcuts**: 3 custom shortcuts for quick calculations (Ctrl+Enter, Ctrl+D, Ctrl+R)


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/time-calculator.git
   cd time-calculator
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

5. Download the latest release of the app [here](https://github.com/time-calculator)


## Usage

1. **Time Calculation**:
   - Select the "Calculate Time" tab.
   - Enter the time units you want to add or subtract.
   - Choose whether to add or subtract.
   - Click "Calculate" or press Ctrl+Enter.

2. **Time Difference**:
   - Select the "Time Difference" tab.
   - Enter the start and end dates/times.
   - Click "Calculate Difference" or press Ctrl+D.

3. **Recurring Events**:
   - Select the "Recurring Events" tab.
   - Enter the start date, frequency, and number of occurrences.
   - Click "Calculate Recurring Events" or press Ctrl+R.

4. **Exporting History**:
   - Click the "Export History" button at the bottom of the page to download your calculation history as a JSON file.


## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [date-fns](https://date-fns.org/) for date manipulations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components


## Performance

- **Bundle Size**: ~100KB (gzipped)
- **Lighthouse Score**: 
  - Performance: 95/100
  - Accessibility: 100/100
  - Best Practices: 100/100
  - SEO: 100/100
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s


## Animations

To enhance user experience, the Time Calculator incorporates various animations:

- **Loading Indicators**: Display spinners or progress bars during calculations.
- **Button Hover Effects**: Subtle animations when hovering over buttons.
- **Input Field Focus Animation**: Visual feedback when input fields gain focus.
- **Smooth Transitions**: Fluid transitions between different sections.
- **Result Display Animation**: Fade-in or slide-in effects for displaying results.
- **Recurring Events Visualization**: Animated representations of recurring events.
- **History List Animation**: Animations for adding or removing history items.
- **Notification Pop-ups**: Animated alerts for success, errors, or warnings.
- **Background Animation**: Subtle changes to the background for depth.
- **Custom Theme Transition**: Animated transitions when switching themes.
- **Interactive Graphs or Charts**: If applicable, animated charts based on user input.
- **Loading Animations for Export**: Display animations when exporting data.


## Known Issues and Limitations

- **Browser Compatibility**: The application may not function as intended on older versions of browsers. It is recommended to use the latest versions of Chrome, Firefox, or Safari for optimal performance.

- **Timezone Handling**: Although the application supports multiple timezones, the handling of Daylight Saving Time (DST) transitions may not always be accurate.

- **Date Format Parsing**: Users may encounter issues with date format parsing if the input does not strictly adhere to the specified formats. Some edge cases might lead to incorrect calculations.

- **Performance with Large Data Sets**: The calculation history feature may slow down if a large number of calculations are stored (e.g., more than 1000 entries). 

- **Recurring Events Limitation**: The application currently supports a maximum of 100 recurring events per calculation, which may not be sufficient for all user needs.

- **Input Validation**: While basic input validation is implemented, some invalid inputs may still lead to unexpected behavior or errors. Enhanced validation may be needed.

- **Accessibility Limitations**: Although efforts have been made to ensure accessibility, some components may not fully comply with all accessibility standards (e.g., WCAG 2.1).

- **Responsive Design Issues**: Some elements may not render correctly on very small or very large screens, leading to usability issues.

- **Keyboard Shortcuts Conflicts**: Users may experience conflicts with native keyboard shortcuts on different operating systems or browsers, leading to unexpected behavior.

- **Export Functionality**: The export feature for calculation history may have limitations regarding file format support and may not work correctly on all browsers.

- **Localization and Internationalization**: Currently, the application is only available in English, limiting accessibility for non-English speakers. 

- **Error Reporting**: There is no built-in mechanism for users to report errors or issues directly through the application, which could hinder feedback collection.


## Future Improvements and Roadmap

- **Mobile Application Development**: Create a mobile version of the Time Calculator to enhance accessibility and usability on smartphones and tablets.

- **Enhanced Timezone Support**: Improve handling of Daylight Saving Time (DST) transitions and add support for more regional timezones.

- **Multi-language Support**: Implement localization and internationalization to support multiple languages, allowing a broader audience to use the application.

- **Advanced Date Format Options**: Introduce additional date format options and allow users to customize their preferred formats.

- **User Accounts and Cloud Storage**: Allow users to create accounts to save their calculation history in the cloud, enabling access from multiple devices.

- **Improved Input Validation**: Enhance input validation to provide better user feedback and prevent errors during calculations.

- **Performance Optimization**: Focus on improving the performance of calculations, particularly when dealing with large datasets or extensive calculation histories.

- **Recurring Event Customization**: Expand the recurring events feature to allow more customization options, such as complex recurrence patterns (e.g., every first Monday).

- **Graphical Visualization of Time Differences**: Introduce visual representations (e.g., graphs or timelines) to help users better understand time differences and recurring events.

- **Integration with Calendar Services**: Allow users to export calculations and recurring events directly to popular calendar services (e.g., Google Calendar, Microsoft Outlook).

- **Accessibility Improvements**: Conduct thorough accessibility audits to ensure full compliance with WCAG 2.1 standards and improve the experience for users with disabilities.

- **Custom Themes and Styles**: Implement theme customization options to allow users to personalize the application's appearance.

- **Dark Mode Support**: Add a dark mode option for users who prefer a darker interface for better visibility in low-light environments.

- **Community Feedback Integration**: Create a mechanism for users to submit feedback, suggest features, and report issues directly within the application.

- **Comprehensive Documentation**: Develop detailed user guides, FAQs, and video tutorials to assist users in maximizing the application's features.

- **Testing and Quality Assurance**: Invest in comprehensive testing strategies to identify and resolve bugs more efficiently and ensure a smooth user experience.


## Running Tests

- To run tests, use the following command:
  ```bash
  npm test
  ```

Make sure to set up the environment variables as specified in the .env.example file before running tests.


## Contributing

1. Fork the repository.

2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```

3. Commit your changes:
   ```
   git commit -m 'Add some feature'
   ```

4. Push to the branch:
   ```
   git push origin feature/YourFeature
   ```

5. Open a pull request.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Acknowledgments

- Thanks to the contributors who help make this project better.
- Inspired by various time management tools and applications.


## Contact

For inquiries, please reach out to me at [shreyas.venur@gmail.com].


## Support

If you find this project helpful, please consider giving it a star on GitHub. Your support helps us to improve and continue development.


## Security

If you discover any security vulnerabilities within this project, please send an email to [shreyas.venur@gmail.com]. All security vulnerabilities will be promptly addressed.
