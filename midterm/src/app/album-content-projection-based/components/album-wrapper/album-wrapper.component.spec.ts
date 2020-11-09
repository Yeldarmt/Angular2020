import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumWrapperComponent } from './album-wrapper.component';

describe('AlbumWrapperComponent', () => {
  let component: AlbumWrapperComponent;
  let fixture: ComponentFixture<AlbumWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
