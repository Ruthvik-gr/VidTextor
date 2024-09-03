# VidTextor

VidTextor is a React application that allows users to add, update, and delete text boxes on top of a video. The text boxes are draggable, resizable, and synchronized with the video playback, making it a powerful tool for annotating videos.

## Features

- **Add Text Box**: Add multiple text boxes on top of the video.
- **Draggable and Resizable**: Each text box can be dragged and resized within the video container.
- **Update Position and Size**: The position and size of each text box can be updated and saved.
- **Delete Text Box**: Text boxes can be removed with a single click.
- **Sync with Video Playback**: Text boxes can appear or disappear at specified times during video playback.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A state management tool for managing the application's state.
- **React-RND**: A React component used for drag-and-drop and resizing functionality.
- **UUID**: A library to generate unique IDs for text boxes.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v12 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ruthvik-gr/VidTextor.git
   cd VidTextor
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.



### Usage

1. **Adding a Text Box**:
   - Click the "Add Text" button in the configuration panel to add a new text box on the video.

2. **Moving and Resizing**:
   - Drag the text box to move it around the video.
   - Resize the text box by dragging its corners.

3. **Deleting a Text Box**:
   - Hover over the text box to reveal the delete button. Click "X" to remove the text box.

4. **Syncing with Video Playback**:
   - The text boxes will automatically appear and disappear based on the video's current playback time. Adjust the timing logic in the code if needed.

### Customization

- **Video Source**: Replace the video source in `Home.jsx` with your desired video file.



### Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

