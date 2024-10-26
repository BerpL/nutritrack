import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nutritrack';

  ngOnInit() {
    this.applyTheme(); 
  }

  applyTheme() {
    const theme = localStorage.getItem('theme') || 'winter';
    document.body.classList.remove('winter', 'night');
    document.body.classList.add(theme);
  }
}
