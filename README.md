## ngZone

เครื่องมือสำหรับจัดการ changeDetectiong ในส่วนของ Asynchonous เช่น เมื่อต้องการกำหนดการอัพเดตหน้าเว็บแบบชัวร์ ๆ สามารถกำหนดได้ 2 รูปแบบหลักๆ คือ auto และ manual

```typescript
//html
{{ data }}


//typescript
data:any = "inital value"

constructor(private cdr: ChangeDetectionRef){}

ngOnInit(){
  //Auto
  this.ngZone.run(() => {
    setTimeout(() => {
      this.data = "test"
    },0)
  }

  //Manual
  this.ngZone.runOutsideAngular(() => {
    setTimeout(() => {
      this.data = "test"
      this.cdr.detectChanges();
    },0)
  });
}
```
