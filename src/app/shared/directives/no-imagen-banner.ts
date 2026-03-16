import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNoImagenBanner]',
})
export class NoImagenBanner {

  private nodoDOM: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  @HostListener('error') 
  onError(): void {
    this.renderer.setAttribute(this.nodoDOM.nativeElement, 'src', 'assets/img/no-banner-c.jpg');
  }

}
