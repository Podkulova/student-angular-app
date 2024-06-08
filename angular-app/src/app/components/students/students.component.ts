import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  students : Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(students => { 
      this.students = students
    });
  } 

  delete(student: Student): void {
    this.students = this.students.filter(s => s !== student);
    this.studentService.deleteStudent(student).subscribe();
  }

  add(name: string, email: string, username: string): void {
    // Removing white characters from the data
    name = name.trim();
    email = email.trim();
    username = username.trim();
    
    // Cease execution when fields are empty
    if (!name || !email || !username) {
      return;
    }
    
    // Cease execution when e-mail address does not contain "@"
    if (email.indexOf('@') < 1) {
      return;
    }
    
    // Upload data to server and update local table
    this.studentService.addStudent({ name, email, username } as Student)
      .subscribe(student=> {
        this.students.push(student);
      });
  }  

}
