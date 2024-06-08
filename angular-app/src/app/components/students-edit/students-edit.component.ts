import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';



@Component({
  selector: 'app-students-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './students-edit.component.html',
  styleUrl: './students-edit.component.css'
})
export class StudentEditComponent implements OnInit {
  student: Student =   {} as Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    // Obtaining the value of the "id" parameter and converting it to a number
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus

    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id !== null) {
      this.studentService.getStudent(id)
      .subscribe(student => this.student = student);
    } else {
      console.log("Id is null.");
    }
  }

  goBack(): void {
   this.location.back();
  }

  save(): void {
    // Saves the data and redirects to the previous view
    this.studentService.updateStudent(this.student)
      .subscribe(() => this.goBack());
  }
}