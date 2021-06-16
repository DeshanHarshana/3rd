import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmakeComponent } from './postmake.component';

describe('PostmakeComponent', () => {
  let component: PostmakeComponent;
  let fixture: ComponentFixture<PostmakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostmakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostmakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
