# Reusable Common Components Folder (`src/components/common`)

This directory houses middle-tier, layout-level components shared across multiple routes or features, but which contain some level of application context (such as language configurations, stats, or UI navigation tools).

## Planned Common Components

1. **StreakTracker (`StreakTracker.jsx`)**
   - Renders a floating, high-visibility flame counter.
   - Shows detailed streak breakdowns on hover.

2. **LanguageSelector (`LanguageSelector.jsx`)**
   - Glassmorphic dropdown displaying language flags and target proficiency.
   - Saves selection directly to user settings contexts.

3. **AudioProgress (`AudioProgress.jsx`)**
   - Interactive waveform component for pronunciation tests and audio playback.

4. **SpeechIndicator (`SpeechIndicator.jsx`)**
   - Premium animated pulse ring representing micro-volume changes during speech recognition.

5. **NotificationDropdown (`NotificationDropdown.jsx`)**
   - Popover list showing achievements, friend requests, or study reminders.
