# Create a class "Grader"
class Grader:
   def calcGrade(score):
        if score >= 90:
            return "A"
        elif score >= 80:
            return "B"
        elif score >= 70:
            return "C"
        elif score >= 60: 
            return "D"
        else:
            return "F"

# Ask the students name 
name = input("What is the student's name? ")

# Ask for the assignment name 
assignment = input("What is the assignment name? ")

# Ask for the grade in numbers 
grade = float(input("What is the grade(in numbers)? "))

# Calculate the letter grade based on the numberical input 
letterGrade = Grader.calcGrade(grade)

# Print the grade 
print(f"{name} received an {letterGrade} on {assignment}")