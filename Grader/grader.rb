# Create a class "Grader"
class Grader
    # Create a method to identify the letter grade based on the numberical value provided by the user
    def self.calcGrade(score)
      if score >= 90
        "A"
      elsif score >= 80
        "B"
      elsif score >= 70
        "C"
      elsif score >= 60
        "D"
      else
        "F"
      end
    end
  end
  
  # Ask the student's name => Capture the response (CHOMP IT) and set the value to name
  print "What is the student's name? "
  name = gets.chomp
  
  # Ask for the assignment name => Capture the response (CHOMP IT) and set the value to assignment
  print "What is the assignment name? "
  assignment = gets.chomp
  
  # Ask for the grade in numbers => Capture the response (CHOMP IT) => Set the value to a float to allow for the input to be a decimal => and set the value to grade 
  print "What is the grade (in numbers)? "
  grade = gets.chomp.to_f
  
  # Calculate the letter grade based on the numerical input using the calcGrade method
  letterGrade = Grader.calcGrade(grade)
  
  # Print the grade
  puts "#{name} received an #{letterGrade} on #{assignment}"
  