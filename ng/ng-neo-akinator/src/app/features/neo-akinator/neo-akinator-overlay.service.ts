/**
 * オーバーレイサービス.
 *
 * created on 2020/05/30
 * @author Taro Suzuki
 */

import { Injectable } from '@angular/core';

import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';

import { MatSpinner } from '@angular/material/progress-spinner';


@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  overlayRef: any;

  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay
        .position().global().centerHorizontally().centerVertically()
    });
  }

  attach(): void {
    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(new ComponentPortal(MatSpinner));
    }
  }

  detach(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
