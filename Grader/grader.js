// Import the readline node
const readline = require("readline");

// Create a class grader
class Grader {
  // Define the parameters of the constructor
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Create the variables to hold the values for name, assignment, and set grade to 0 to start (NEEDS TO BE AVAILABLE TO BE OVERWRITTEN )
    this.name = "";
    this.assignment = "";
    this.grade = 0;
  }

  // Create a method to ask for the name of the student
  askName() {
    return new Promise((resolve) => {
      // Call the readline to ask the question, capture the response and pass it to the method
      this.rl.question("What is the student name? ", (name) => {
        // Set the response equal to the global name variable
        this.name = name;
        // Return the promise
        resolve();
      });
    });
  }

  //   Create a method to ask for the assignment name
  askAssignment() {

    // CAll the  readline to ask what the assignment name is
    return new Promise((resolve) => {

      // Capture the assignment name, and pass the response to the method
      this.rl.question("What is the assignment name? ", (assignment) => {

        // Set the response equal to the goal assignment variable
        this.assignment = assignment;

        // Return the promise value 
        resolve();
      });
    });
  }

//   Create a method to ask for the numerical grade and get the letter grade from the letterGrade method 
  askGrade() {

    // call the readline to start the methods within to get the letterGrade 
    return new Promise((resolve) => {
        
        // Ask what the numerical grade is and parse the value to ensure that it is an actual number 
      this.rl.question(
        "What is the numerical grade? ",
        (grade) => {
            
            // Take the user response => Parse the data to an numberical answer from an string => set the value the global grade (OVERWRITE HERE)
          this.grade = parseFloat(grade);

        //   Complete the promise 
          resolve();
        }
      );
    });
  }

//   Create a method to take in a variable (GLOBAL GRADE AUTOMATICALLY GOES HERE) and an if statement to find the letter grade 
  letterGrade() {

    // Create a variable to hold the letter grade when it is matched. This should go from lowest to highest... if you start top down it will continue to go lower and pull an F grade 
    let letterGrade;
    if (this.grade >= 90) {
      letterGrade = "A";
    } else if (this.grade >= 80) {
      letterGrade = "B";
    } else if (this.grade >= 70) {
      letterGrade = "C";
    } else if (this.grade >= 60) {
      letterGrade = "D";
    } else {
      letterGrade = "F";
    }

    // Return the letter grade to the method call 
    return letterGrade;
  }

//  Create a method to call the previously created method (MUST AWAIT HERE TO AVOID INCORRECT DATA!!!)
  async gradeAssignment() {

    // Call the method to ask for the user name 
    await this.askName();

    // Call the method to ask for the assignment name 
    await this.askAssignment();

    // Call the method to ask for the user grade (NUMERICAL)
    await this.askGrade();

    // Create a varaible to hold the letter grade => Call the letterGrade method 
    const letterGrade = this.letterGrade();

    // In the terminal, print the response based on the user input 
    console.log(
      `${this.name}'s grade for ${this.assignment} is ${letterGrade}`
    );

    // CLOSE THE READLINE()
    this.rl.close();
  }
}

// Create an instance of the Grader to request the required data 
const grader = new Grader();

// Create an instance of the grade Assignment to take the data from the grader and get the letter grade
grader.gradeAssignment();