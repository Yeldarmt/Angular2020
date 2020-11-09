import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteBasedAlbumsComponent } from './route-based-albums.component';

describe('RouteBasedAlbumsComponent', () => {
  let component: RouteBasedAlbumsComponent;
  let fixture: ComponentFixture<RouteBasedAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteBasedAlbumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteBasedAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
