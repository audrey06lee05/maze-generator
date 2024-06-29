
# 🧩 Maze Generator
🧑🏻‍💻 Author: Audrey Lee <br/>
✨ This is a maze generator that generates a random maze everytime the button is pushed. <br/>
🧱 Further details about how the maze generator was produced is captured below!
<br/>

## 🗣️ Languages & Algorithms
* HTML
* JS
* CSS
* Recursive Division
* Breadth-First Search (BFS)

## 🔧 How to Set Up the Files
1. Download the code as a zip file on Github using the code button
2. Open the zip file in your local drive
3. You will see 3 files (.js, .html, .css)
4. Right click the .html file and choose a web browser to use it <br/>

💁🏻 You may view the source code using any code editors like VSCode.

## ⛑️ Explanation of How the Maze Generator was Made
#### 1️⃣ Canvas Setup and Initialization
I retrieve the canvas element from the DOM and set its drawing context to 2D. I also set the canvas dimensions to 600x600 pixels, ensuring I have a proper area for drawing the maze.

#### 2️⃣ Cell Representation and Methods
I define a Cell object to represent each cell in the maze, including properties for its type, position, visited status for BFS, and parent reference. Methods for each cell allow setting its position, getting its color, and finding its neighbors within the maze grid.

#### 3️⃣ Maze Representation and Initialization
The Maze object contains a 2D array of Cell objects and tracks the start and end points. I initialize the maze by filling it with cells, adding walls around the perimeter, and creating empty spaces inside.

#### 4️⃣ Recursive Division Algorithm for Maze Generation
I use the recursive division algorithm to generate the maze. This involves dividing the maze into sections, adding walls with random passages, and recursively applying this process to create a solvable maze.

#### 5️⃣ Maze Rendering
The render method draws the maze on the canvas. It clears any previous content, calculates cell dimensions, and iterates through each cell to draw it based on its type and color.

#### 6️⃣ Method to Get All Empty Slots in the Maze
I define a method to find and collect all empty cells in the maze. This is used to determine potential positions for the start and end points.

#### 7️⃣ Method to Initialize Start and End Points
I initialize the start and end points of the maze by selecting empty cells and marking them appropriately. This ensures the maze has a designated entry and exit.

#### 8️⃣ Method to Check if the Maze is Solvable Using BFS
I use Breadth-First Search (BFS) to check if there is a valid path from the start to the end point. This involves exploring neighboring cells and ensuring the path is not blocked by walls.

#### 9️⃣ Event Listener for the "Generate" Button and Generator Function
I set up an event listener for the "Generate" button. The generator function creates a new maze, initializes its contents, ensures it is solvable, and renders it on the canvas. The button click triggers this process, allowing users to generate new mazes dynamically.

## 💡 Reflection
This project is the most complex algorithmic-related endeavor I've ever undertaken and it definitely required a lot of research and investigation. I faced significant challenges in finding the right method to randomly draw the maze walls while ensuring the maze remained solvable. Although I had learned about breadth-first search conceptually, it took considerable effort to implement it effectively. One of the biggest takeaways from this experience was learning a new algorithm—recursive division. This method greatly streamlined the process by efficiently dividing the maze, saving substantial time compared to accessing it pixel by pixel.


