import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare let Zone: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'ng-zone-test';
  data: any = 'initial value';
  serverUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(
    private httpClient: HttpClient,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  // ngOnInit() {
  //   this.httpClient.get(this.serverUrl).subscribe((response: any) => {
  //     // user does not need to trigger change detection manually
  //     this.data = response.data;
  //   });
  // }

  // ngOnInit() {
  //   setTimeout(() => {
  //     // user does not need to trigger change detection manually
  //     this.data = 'value updated';
  //   });
  // }

  // ngOnInit() {
  //   Promise.resolve(1).then((v) => {
  //     // user does not need to trigger change detection manually
  //     this.data = v;
  //   });
  // }

  ngOnInit() {
    // You know no data will be updated,
    // so you don't want to trigger change detection in this
    // specified operation. Instead, call ngZone.runOutsideAngular()
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // update component data
        // but don't trigger change detection.
        this.data = 'updated value';
      });
    });

    this.ngZone.runOutsideAngular(() => {
      this.ngZone.run(() => {
        this.httpClient.get(this.serverUrl).subscribe((response: any) => {
          console.log(response);
          // user does not need to trigger change detection manually
          this.data = { ...response };
          this.cdr.markForCheck();
        });
      });

      // this.data = { h: 'hello' };
      setTimeout(() => {
        this.data = { h: 'hello' };
        this.cdr.detectChanges();
      }, 500);
    });

    Promise.resolve(1).then((v) => {
      // user does not need to trigger change detection manually
      this.data = v;
    });
  }
}
