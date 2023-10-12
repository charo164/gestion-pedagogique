import { Component } from '@angular/core';
import { AuthService } from '@app/data/services/auth.service';
import {
  faAddressCard,
  faBook,
  faCalendar,
  faCalendarCheck,
  faCalendarDays,
  faChalkboardTeacher,
  faGraduationCap,
  faHome,
  faLandmark,
  faSchool
} from '@fortawesome/free-solid-svg-icons';

const links = {
  rp: [
    { label: 'My Dashboard', path: '/rp', icon: faHome },
    { label: 'School Year', path: '/rp/school-year', icon: faCalendar },
    { label: 'Teacher', path: '/rp/teacher', icon: faChalkboardTeacher },
    { label: 'Classroom', path: '/rp/classroom', icon: faLandmark },
    { label: 'Inscription', path: '/rp/inscription', icon: faAddressCard },
    { label: 'Classes', path: '/rp/classe', icon: faSchool },
    { label: 'Students', path: '/rp/student', icon: faGraduationCap },
    { label: 'Modules', path: '/rp/module', icon: faBook },
    {
      label: 'Scheduled Courses',
      path: '/rp/scheduled-course',
      icon: faCalendarCheck,
    },
    {
      label: 'Sessions Courses',
      path: '/rp/session-course',
      icon: faCalendarDays,
    },
  ],
};

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  links: (typeof links)['rp'] = [];

  constructor(private authService: AuthService) {
    const role = this.authService.user?.roles[0] as keyof typeof links;
    this.links = links[role];
  }
}
