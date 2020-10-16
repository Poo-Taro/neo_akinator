import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-neo-akinator';

  constructor(private electronService: ElectronService) { }

  public playPingPong() {
    if(this.electronService.isElectronApp) {
        const pong: string = this.electronService.ipcRenderer.sendSync('ping');
        console.log(pong);
    }
  }

}
